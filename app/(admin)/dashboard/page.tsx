'use client';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Shield, Star, Eye, MessageSquare, FileText, Bell, ChevronDown } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Dati di esempio per i grafici
  const visitsData = {
    labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    datasets: [
      {
        label: 'Visite al profilo',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const stats = {
    views: 1248,
    viewsChange: '+12.5%',
    rating: 4.8,
    totalReviews: 156,
    responseRate: '95%',
    verificationLevel: 'Gold'
  };

  const recentReviews = [
    {
      id: 1,
      author: 'Marco R.',
      rating: 5,
      date: '28/01/2024',
      comment: 'Ottimo professionista, molto preparato',
      status: 'pending'
    },
    {
      id: 2,
      author: 'Laura B.',
      rating: 4,
      date: '27/01/2024',
      comment: 'Servizio professionale e puntuale',
      status: 'responded'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'review',
      message: 'Nuova recensione da Marco R.',
      time: '2 ore fa'
    },
    {
      id: 2,
      type: 'verification',
      message: 'Verifica documenti completata',
      time: '1 giorno fa'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Aggiorna Profilo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Visualizzazioni Profilo
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {stats.views}
                </p>
              </div>
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
            <p className="mt-1 text-sm text-green-600">{stats.viewsChange}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Rating Medio
                </p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.rating}
                  </p>
                  <Star className="ml-2 h-5 w-5 text-yellow-400" />
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {stats.totalReviews} recensioni
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tasso di Risposta
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {stats.responseRate}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Livello Verifica
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {stats.verificationLevel}
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Andamento Visualizzazioni</h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="7d">Ultimi 7 giorni</option>
                <option value="30d">Ultimi 30 giorni</option>
                <option value="90d">Ultimi 90 giorni</option>
              </select>
            </div>
            <div className="h-80">
              <Line data={visitsData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Notifiche</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {notification.type === 'review' ? (
                    <Star className="h-6 w-6 text-yellow-400" />
                  ) : (
                    <Bell className="h-6 w-6 text-blue-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Recensioni Recenti</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentReviews.map((review) => (
                <div key={review.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{review.author}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {review.comment}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{review.date}</p>
                    </div>
                    <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                      Rispondi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}