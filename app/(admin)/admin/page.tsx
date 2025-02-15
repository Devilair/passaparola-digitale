'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totals: {
      professionals: 2584,
      pendingReviews: 45,
      reportedReviews: 12,
      activeSubscriptions: 876,
      monthlyRevenue: 15780
    },
    recentActivity: [
      {
        id: 1,
        type: 'review',
        content: 'Nuova recensione da moderare per Avv. Marco Rossi',
        time: '5 minuti fa'
      },
      {
        id: 2,
        type: 'subscription',
        content: 'Nuovo abbonamento Premium attivato',
        time: '15 minuti fa'
      },
      {
        id: 3,
        type: 'verification',
        content: 'Richiesta verifica profilo in attesa',
        time: '1 ora fa'
      }
    ]
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Professionisti</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totals.professionals}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recensioni da moderare</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totals.pendingReviews}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Segnalazioni</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totals.reportedReviews}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ricavi mensili</p>
              <p className="text-2xl font-semibold text-gray-900">€{stats.totals.monthlyRevenue}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Attività Recenti</h2>
        </div>
        <div className="divide-y">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center">
                <span className="flex-shrink-0">
                  {activity.type === 'review' && <MessageSquare className="w-5 h-5 text-blue-500" />}
                  {activity.type === 'subscription' && <DollarSign className="w-5 h-5 text-green-500" />}
                  {activity.type === 'verification' && <Users className="w-5 h-5 text-yellow-500" />}
                </span>
                <div className="ml-4">
                  <p className="text-sm text-gray-900">{activity.content}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}