'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  PlusCircle,
  Star,
  Shield,
  BarChart,
  LogOut
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    {
      group: "Professionisti",
      items: [
        { name: "Lista Professionisti", href: "/admin/professionisti", icon: Users },
        { name: "Aggiungi Professionista", href: "/admin/professionisti/nuovo", icon: PlusCircle },
        { name: "Richieste Verifica", href: "/admin/professionisti/verifiche", icon: Shield },
      ]
    },
    {
      group: "Recensioni",
      items: [
        { name: "Moderazione", href: "/admin/recensioni", icon: MessageSquare },
        { name: "Segnalazioni", href: "/admin/recensioni/segnalazioni", icon: Star },
      ]
    },
    {
      group: "Abbonamenti",
      items: [
        { name: "Gestione Piani", href: "/admin/abbonamenti", icon: CreditCard },
        { name: "Pagamenti", href: "/admin/abbonamenti/pagamenti", icon: CreditCard },
      ]
    },
    {
      group: "Analytics",
      items: [
        { name: "Dashboard", href: "/admin/analytics", icon: BarChart },
      ]
    },
    {
      group: "Impostazioni",
      items: [
        { name: "Configurazione", href: "/admin/impostazioni", icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b">
            <Link href="/admin" className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            </Link>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            {menuItems.map((group, idx) => (
              <div key={idx} className="mb-6">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {group.group}
                </h2>
                <ul className="space-y-2">
                  {group.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                            isActive 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Logout button at bottom */}
          <div className="border-t p-4">
            <Link
              href="/admin/logout"
              className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300 ease-in-out`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}