import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    // Validazione base
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    // Verifica email esistente
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email già registrata' },
        { status: 400 }
      );
    }

    // Hash della password
    const hashedPassword = await hash(password, 12);

    // Crea l'utente
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role as any,
      },
    });

    // Se l'utente è un professionista, crea anche il profilo professionale
    if (role === 'PROFESSIONAL') {
      await prisma.professional.create({
        data: {
          userId: user.id,
          profession: '',
          specializations: [],
          experience: 0,
          city: '',
          verified: false
        }
      });
    }

    return NextResponse.json(
      { message: 'Utente registrato con successo' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      { message: 'Si è verificato un errore durante la registrazione' },
      { status: 500 }
    );
  }
}