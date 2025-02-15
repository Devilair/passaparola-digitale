'use client';

import { useState, useRef } from 'react';
import { Search, MapPin, Star, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const scrollContainer = useRef<HTMLDivElement>(null);

  const cities = ['Milano', 'Roma', 'Torino', 'Firenze', 'Napoli', 'Bologna'];

  const categories = [
    { id: 'avvocati', name: 'Avvocati', icon: '⚖️' },
    { id: 'commercialisti', name: 'Commercialisti', icon: '📊' },
    { id: 'notai', name: 'Notai', icon: '📜' },
    { id: 'ingegneri', name: 'Ingegneri', icon: '🏗️' },
    { id: 'architetti', name: 'Architetti', icon: '🏛️' },
    { id: 'medici', name: 'Medici', icon: '👨‍⚕️' },
    { id: 'consulenti', name: 'Consulenti', icon: '💼' },
    { id: 'artigiani', name: 'Artigiani', icon: '🔧' },
    { id: 'dentisti', name: 'Dentisti', icon: '🦷' },
    { id: 'psicologi', name: 'Psicologi', icon: '🧠' }
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
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
            Leggi recensioni verificate e trova l'esperto più adatto alle tue esigenze
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
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

          {/* Category Scroll */}
          <div className="relative max-w-7xl mx-auto">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50"
              aria-label="Scorri a sinistra"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div 
              ref={scrollContainer}
              className="overflow-x-auto scrollbar-hide flex gap-4 px-8"
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categoria/${category.id}`}
                  className="flex flex-col items-center gap-2 min-w-[100px] p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
                >
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{category.name}</span>
                </Link>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50"
              aria-label="Scorri a destra"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Community Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Aiuta altri a trovare il professionista giusto
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Condividi la tua esperienza su Passaparola Digitale, dove le recensioni verificate fanno la differenza.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/registrati"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Scrivi una recensione
                </Link>
                <Link
                  href="/come-funziona"
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Scopri di più
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">150k+</div>
                <div className="text-gray-600">Recensioni verificate</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
                <div className="text-gray-600">Professionisti</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Recensioni autentiche</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
                <div className="text-gray-600">Rating medio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16">
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
            Unisciti a migliaia di professionisti e gestisci la tua reputazione online
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
