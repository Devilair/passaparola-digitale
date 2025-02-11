'use client';

import { useState } from 'react';
import { Search, MapPin, Star, Shield, TrendingUp, Award, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const cities = ['Milano', 'Roma', 'Torino', 'Firenze', 'Napoli', 'Bologna'];

  const categories = [
    {
      id: 'avvocati',
      name: 'Avvocati',
      icon: '⚖️',
      count: 1250,
      description: 'Consulenza legale e rappresentanza in tribunale'
    },
    {
      id: 'commercialisti',
      name: 'Commercialisti',
      icon: '📊',
      count: 850,
      description: 'Consulenza fiscale e tributaria'
    },
    {
      id: 'notai',
      name: 'Notai',
      icon: '📜',
      count: 320,
      description: 'Atti e certificazioni ufficiali'
    },
    {
      id: 'ingegneri',
      name: 'Ingegneri',
      icon: '🏗️',
      count: 980,
      description: 'Progettazione e consulenza tecnica'
    }
  ];

  const featuredProfessionals = [
    {
      id: 1,
      name: "Avv. Marco Rossi",
      profession: "Avvocato",
      specialization: "Diritto Civile",
      rating: 4.9,
      reviews: 189,
      city: "Milano",
      verified: true,
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      name: "Dott. Giuseppe Verdi",
      profession: "Commercialista",
      specialization: "Consulenza Fiscale",
      rating: 4.8,
      reviews: 156,
      city: "Roma",
      verified: true,
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      name: "Not. Anna Bianchi",
      profession: "Notaio",
      specialization: "Atti e Successioni",
      rating: 4.9,
      reviews: 134,
      city: "Torino",
      verified: true,
      image: "/api/placeholder/400/300"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.id}`}
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Esplora per categoria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.id}`}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-500 mb-4">{category.count}+ professionisti</p>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Professionisti in evidenza
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProfessionals.map((professional) => (
              <Link
                key={professional.id}
                href={`/professionista/${professional.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={professional.image}
                    alt={professional.name}
                    fill
                    className="object-cover"
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