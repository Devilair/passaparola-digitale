import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pendingReviews = await prisma.review.findMany({
    where: { moderationState: 'PENDING' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      professional: {
        select: {
          id: true,
          name: true,
          profession: true
        }
      },
      flags: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const pendingReports = await prisma.report.findMany({
    where: { status: 'PENDING' },
    include: {
      reporter: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      professional: {
        select: {
          id: true,
          name: true,
          profession: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const suspendedUsers = await prisma.user.findMany({
    where: { isSuspended: true },
    select: {
      id: true,
      name: true,
      email: true,
      suspendedAt: true,
      suspendReason: true
    },
    orderBy: {
      suspendedAt: 'desc'
    }
  });

  const stats = await prisma.$transaction([
    prisma.review.count({ where: { moderationState: 'PENDING' } }),
    prisma.report.count({ where: { status: 'PENDING' } }),
    prisma.user.count({ where: { isSuspended: true } }),
    prisma.professional.count({ where: { verified: false, claimed: true } })
  ]);

  return NextResponse.json({
    pendingReviews,
    pendingReports,
    suspendedUsers,
    stats: {
      pendingReviews: stats[0],
      pendingReports: stats[1],
      suspendedUsers: stats[2],
      unverifiedProfessionals: stats[3]
    }
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, id, reason } = await req.json();

  try {
    switch (action) {
      case 'approveReview':
        await prisma.$transaction([
          prisma.review.update({
            where: { id },
            data: {
              moderationState: 'APPROVED',
              moderatedAt: new Date(),
              moderatedBy: session.user.id,
              moderatorNotes: reason || 'Approved by moderator'
            }
          }),
          // Aggiorna le statistiche del professionista
          prisma.review.findUnique({
            where: { id },
            select: { professionalId: true, rating: true }
          }).then((review) => {
            if (review) {
              return prisma.professional.update({
                where: { id: review.professionalId },
                data: {
                  reviewCount: { increment: 1 },
                  rating: {
                    // Ricalcola la media
                    set: prisma.review.aggregate({
                      where: {
                        professionalId: review.professionalId,
                        moderationState: 'APPROVED'
                      },
                      _avg: { rating: true }
                    }).then((agg) => agg._avg.rating || 0)
                  }
                }
              });
            }
          })
        ]);
        break;

      case 'rejectReview':
        await prisma.review.update({
          where: { id },
          data: {
            moderationState: 'REJECTED',
            moderatedAt: new Date(),
            moderatedBy: session.user.id,
            moderatorNotes: reason || 'Rejected by moderator'
          }
        });
        break;

      case 'resolveReport':
        await prisma.report.update({
          where: { id },
          data: {
            status: 'RESOLVED',
            resolvedAt: new Date(),
            resolvedBy: session.user.id,
            resolution: reason || 'Resolved by admin'
          }
        });
        break;

      case 'suspendUser':
        await prisma.user.update({
          where: { id },
          data: {
            isSuspended: true,
            suspendedAt: new Date(),
            suspendReason: reason || 'Suspended by admin'
          }
        });
        break;

      case 'unsuspendUser':
        await prisma.user.update({
          where: { id },
          data: {
            isSuspended: false,
            suspendedAt: null,
            suspendReason: null
          }
        });
        break;

      case 'verifyProfessional':
        await prisma.professional.update({
          where: { id },
          data: {
            verified: true
          }
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin action error:', error);
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    );
  }
}