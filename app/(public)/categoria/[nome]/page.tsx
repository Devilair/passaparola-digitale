'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, Shield, MapPin, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Dati mock per i professionisti
const mockProfessionals = {
  avvocati: [
    {
      id: 1,
      name: "Avv. Marco Rossi",
      specializations: ["Diritto Civile", "Diritto del Lavoro"],
      rating: 4.8,
      reviews: 156,
      city: "Milano",
      verified: true,
      image: "/api/placeholder/100/100",
      description: "Specializzato in diritto del lavoro e controversie civili."
    },
    {
      id: 2,
      name: "Avv. Laura Bianchi",
      specializations: ["Diritto Penale", "Diritto Societario"],
      rating: 4.6,
      reviews: 98,
      city: "Roma",
      verified: true,
      image: "/api/placeholder/100/100",
      description: "Esperta in diritto penale e societario."
    }
  ],
  commercialisti: [
    {
      id: 3,
      name: "Dott. Giuseppe Verdi",
      specializations: ["Consulenza Fiscale", "Bilanci"],
      rating: 4.7,
      reviews: 123,
      city: "Torino",
      verified: true,
      image: "/api/placeholder/100/100",
      description: "Specializzato in consulenza fiscale e bilanci."
    }
  ],
  notai: [
    {
      id: 4,
      name: "Not. Anna Ferrari",
      specializations: ["Atti Immobiliari", "Successioni"],
      rating: 4.9,
      reviews: 87,
      city: "Bologna",
      verified: true,
      image: "/api/placeholder/100/100",
      description: "Esperta in atti immobiliari e successioni."
    }
  ],
  ingegneri: [
    {
      id: 5,
      name: "Ing. Paolo Neri",
      specializations: ["Edilizia", "Progettazione"],
      rating: 4.8,
      reviews: 92,
      city: "Milano",
      verified: true,
      image: "/api/placeholder/100/100",
      description: "Specializzato in progettazione edile e direzione lavori."
    }
  ]
};

const categoryTitles = {
  avvocati: "Avvocati",
  commercialisti: "Commercialisti",
  notai: "Notai",
  ingegneri: "Ingegneri"
};

export default function CategoryPage() {
  const params = useParams();
  const categoryName = params.nome as string;
  const [filters, setFilters] = useState({
    rating: 0,
    city: '',
    verified: false
  });

  // Get professionals for current category
  const professionals = mockProfessionals[categoryName as keyof typeof mockProfessionals] || [];

  const filteredProfessionals = professionals.filter(prof => {
    if (filters.rating > 0 && prof.rating < filters.rating) return false;
    if (filters.city && prof.city !== filters.city) return false;
    if (filters.verified && !prof.verified) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryTitles[categoryName as keyof typeof categoryTitles]}</h1>
        
        <div className="flex gap-6">
          {/* Filtri */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filtri</h2>
                <Filter className="w-5 h-5 text-gray-500" />
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating minimo
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value={0}>Tutti</option>
                  <option value={4.5}>4.5+</option>
                  <option value={4}>4.0+</option>
                  <option value={3.5}>3.5+</option>
                </select>
              </div>

              {/* City Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Città
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Tutte</option>
                  <option value="Milano">Milano</option>
                  <option value="Roma">Roma</option>
                  <option value="Torino">Torino</option>
                  <option value="Bologna">Bologna</option>
                </select>
              </div>

              {/* Verified Filter */}
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Solo verificati</span>
                </label>
              </div>
            </div>
          </div>

          {/* Lista Professionisti */}
          <div className="flex-grow">
            <div className="space-y-4">
              {filteredProfessionals.map((professional) => (
                <Link
                  key={professional.id}
                  href={`/professionista/${professional.id}`}
                  className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex">
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={professional.image}
                          alt={professional.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-6 flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-semibold flex items-center">
                              {professional.name}
                              {professional.verified && (
                                <Shield className="w-5 h-5 text-blue-500 ml-2" />
                              )}
                            </h2>
                            <div className="flex items-center mt-1">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <span className="ml-1 font-semibold">{professional.rating}</span>
                              <span className="text-gray-500 ml-1">
                                ({professional.reviews} recensioni)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{professional.city}</span>
                        </div>
                        <p className="mt-2 text-gray-600">{professional.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {professional.specializations.map((spec, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {filteredProfessionals.length === 0 && (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-500">
                    Nessun professionista trovato con i filtri selezionati.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}