'use client';
import { useState } from 'react';
import { Search, MapPin, Star, Shield, TrendingUp, Award, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const cities = ['Milano', 'Roma', 'Torino', 'Firenze', 'Napoli', 'Bologna'];

  const featuredCategories = [
    {
      id: 'trending',
      title: "Professionisti del Momento",
      icon: TrendingUp,
      description: "I più richiesti questa settimana",
      image: "/api/placeholder/400/300",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 'verified',
      title: "Top Verificati",
      icon: Shield,
      description: "Professionisti con verifica approfondita",
      image: "/api/placeholder/400/300",
      color: "from-green-500 to-green-600"
    },
    {
      id: 'new',
      title: "Nuovi Arrivati",
      icon: Clock,
      description: "Gli ultimi professionisti iscritti",
      image: "/api/placeholder/400/300",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 'popular',
      title: "I Più Popolari",
      icon: Users,
      description: "Con il maggior numero di recensioni",
      image: "/api/placeholder/400/300",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const professionalCategories = [
    {
      name: "Avvocati",
      count: 1250,
      icon: "⚖️",
      popular: ["Civile", "Penale", "Lavoro", "Famiglia"]
    },
    {
      name: "Commercialisti",
      count: 850,
      icon: "📊",
      popular: ["Fiscale", "Societario", "Consulenza", "Bilanci"]
    },
    {
      name: "Notai",
      count: 320,
      icon: "📜",
      popular: ["Atti", "Successioni", "Mutui", "Società"]
    },
    {
      name: "Ingegneri",
      count: 980,
      icon: "🏗️",
      popular: ["Civile", "Informatico", "Energetico", "Ambientale"]
    }
  ];

  const topRated = [
    {
      id: 1,
      name: "Studio Legale Rossi",
      profession: "Avvocato",
      specialization: "Diritto Civile",
      rating: 4.9,
      reviews: 189,
      image: "/api/placeholder/400/300",
      city: "Milano",
      verified: true
    },
    {
      id: 2,
      name: "Dott. Bianchi",
      profession: "Commercialista",
      specialization: "Consulenza Fiscale",
      rating: 4.8,
      reviews: 156,
      image: "/api/placeholder/400/300",
      city: "Roma",
      verified: true
    },
    {
      id: 3,
      name: "Studio Notarile Verdi",
      profession: "Notaio",
      specialization: "Atti e Successioni",
      rating: 4.9,
      reviews: 134,
      image: "/api/placeholder/400/300",
      city: "Torino",
      verified: true
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementare la ricerca
    window.location.href = `/cerca?q=${searchQuery}&city=${selectedCity}`;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Trova il <span className="text-blue-600">professionista</span> giusto
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Scopri migliaia di professionisti verificati, leggi le recensioni e trova
            l'esperto più adatto alle tue esigenze
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-xl p-2">
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Di quale professionista hai bisogno?"
                  className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:w-1/3 relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" />
                <select
                  className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-gray-50"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Tutte le città</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cerca
              </button>
            </div>
          </form>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {professionalCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/categoria/${cat.name.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Scopri i professionisti in evidenza
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.id}`}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-95 transition-opacity`} />
                <div className="relative p-6 text-white">
                  <category.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="opacity-90 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Esplora per categoria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {professionalCategories.map((category) => (
              <div key={category.name} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-500 mb-4">{category.count}+ professionisti</p>
                <div className="space-y-2">
                  {category.popular.map((spec) => (
                    <Link
                      key={spec}
                      href={`/categoria/${category.name.toLowerCase()}/${spec.toLowerCase()}`}
                      className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {spec}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Professionals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            I più votati questa settimana
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRated.map((professional) => (
              <Link
                key={professional.id}
                href={`/professionista/${professional.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full h-full object-cover"
                  />
                  {professional.verified && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Verificato
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{professional.name}</h3>
                      <p className="text-gray-600">{professional.profession}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="ml-1 font-bold">{professional.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({professional.reviews})
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{professional.specialization}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {professional.city}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sei un professionista?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti a migliaia di professionisti e raggiungi nuovi clienti
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Registrati ora
          </Link>
        </div>
      </section>
    </main>
  );
}