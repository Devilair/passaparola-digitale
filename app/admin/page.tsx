'use client';
import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Ban, CheckCircle, XCircle, User, Star, Flag, Bell } from 'lucide-react';

interface AdminStats {
  pendingReviews: number;
  pendingReports: number;
  suspendedUsers: number;
  unverifiedProfessionals: number;
}

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  professional: {
    name: string;
  };
}

interface Report {
  id: string;
  type: string;
  description: string;
  reporter: {
    name: string;
  };
}

interface SuspendedUser {
  id: string;
  name: string;
  email: string;
  suspendedAt: string;
  suspendReason?: string;
}

interface AdminData {
  pendingReviews: Review[];
  pendingReports: Report[];
  suspendedUsers: SuspendedUser[];
  stats: AdminStats;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<AdminData>({
    pendingReviews: [],
    pendingReports: [],
    suspendedUsers: [],
    stats: {
      pendingReviews: 0,
      pendingReports: 0,
      suspendedUsers: 0,
      unverifiedProfessionals: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [actionReason, setActionReason] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin');
      if (!res.ok) throw new Error('Failed to fetch');
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, id: string, requireReason: boolean = false) => {
    if (requireReason) {
      setPendingAction({ type: action, id });
      setShowReasonModal(true);
      return;
    }

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action, 
          id, 
          reason: actionReason 
        })
      });

      if (!res.ok) throw new Error('Action failed');

      setActionReason('');
      setShowReasonModal(false);
      setPendingAction(null);
      fetchData();
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };

  const confirmAction = async () => {
    if (pendingAction) {
      await handleAction(pendingAction.type, pendingAction.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pannello di Amministrazione</h1>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-500" />
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Recensioni in Attesa"
            value={data.stats.pendingReviews}
            icon={Star}
            color="bg-blue-500"
          />
          <StatCard
            title="Segnalazioni"
            value={data.stats.pendingReports}
            icon={Flag}
            color="bg-yellow-500"
          />
          <StatCard
            title="Utenti Sospesi"
            value={data.stats.suspendedUsers}
            icon={Ban}
            color="bg-red-500"
          />
          <StatCard
            title="Professionisti non Verificati"
            value={data.stats.unverifiedProfessionals}
            icon={Shield}
            color="bg-green-500"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex space-x-1 p-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Shield },
              { id: 'reviews', label: 'Recensioni', icon: Star },
              { id: 'reports', label: 'Segnalazioni', icon: Flag },
              { id: 'users', label: 'Utenti', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {data.pendingReviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{review.title}</h3>
                        <p className="text-gray-600 mt-1">{review.content}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{review.rating}/5</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">
                            Per: {review.professional.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAction('approveReview', review.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAction('rejectReview', review.id, true)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {data.pendingReviews.length === 0 && (
                  <p className="text-center text-gray-500">Nessuna recensione in attesa</p>
                )}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                {data.pendingReports.map((report) => (
                  <div key={report.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          Segnalazione: {report.type.replace('_', ' ')}
                        </h3>
                        <p className="text-gray-600 mt-1">{report.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Segnalato da: {report.reporter.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAction('resolveReport', report.id, true)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Gestisci
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {data.pendingReports.length === 0 && (
                  <p className="text-center text-gray-500">Nessuna segnalazione in attesa</p>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                {data.suspendedUsers.map((user) => (
                  <div key={user.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="text-sm text-gray-500 mt-2">
                          Sospeso il: {new Date(user.suspendedAt).toLocaleDateString()}
                          {user.suspendReason && (
                            <p className="text-red-500 mt-1">
                              Motivo: {user.suspendReason}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAction('unsuspendUser', user.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Riattiva
                      </button>
                    </div>
                  </div>
                ))}
                {data.suspendedUsers.length === 0 && (
                  <p className="text-center text-gray-500">Nessun utente sospeso</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal per la ragione dell'azione */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <h3 className="text-lg font-semibold mb-4">Inserisci il motivo</h3>
            <textarea
              className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              placeholder="Inserisci il motivo dell'azione..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowReasonModal(false);
                  setPendingAction(null);
                  setActionReason('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annulla
              </button>
              <button
                onClick={confirmAction}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}