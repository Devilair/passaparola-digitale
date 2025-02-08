'use client';
import { useState } from 'react';
import { MapPin, Star, Shield, ChevronDown, Filter, List, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: null,
    priceRange: null,
    verifiedOnly: false,
    experience: null,
    specializations: [],
  });

  // Dati di esempio per i risultati della ricerca
  const searchResults = [
    {
      id: 1,
      name: "Avv. Marco Rossi",
      profession: "Avvocato",
      specializations: ["Diritto Civile", "Diritto del Lavoro"],
      rating: 4.8,
      reviews: 156,
      city: "Milano",
      verified: true,
      image: "/api/placeholder/100/100",
      priceRange: "€€€",
      experience: "15 anni",
      description: "Specializzato in diritto del lavoro e controversie civili con oltre 15 anni di esperienza."
    },
    {
      id: 2,
      name: "Dott. Giuseppe Verdi",
      profession: "Commercialista",
      specializations: ["Consulenza Fiscale", "Bilanci"],
      rating: 4.6,
      reviews: 98,
      city: "Roma",
      verified: true,
      image: "/api/placeholder/100/100",
      priceRange: "€€",
      experience: "12 anni",
      description: "Esperto in consulenza fiscale per PMI e liberi professionisti."
    },
    // Altri risultati...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header di ricerca */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Risultati della ricerca</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${
                  viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
                <span>Lista</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${
                  viewMode === 'map' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                <MapIcon className="w-5 h-5" />
                <span>Mappa</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filtri */}
          <div className={`w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filtri</h2>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <Filter className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Filtro Rating */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Rating minimo</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        className="mr-2"
                        checked={selectedFilters.rating === rating}
                        onChange={() => setSelectedFilters({...selectedFilters, rating})}
                      />
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">e più</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro Prezzo */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Fascia di prezzo</h3>
                <div className="space-y-2">
                  {['€', '€€', '€€€', '€€€€'].map((price) => (
                    <label key={price} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        className="mr-2"
                        checked={selectedFilters.priceRange === price}
                        onChange={() => setSelectedFilters({...selectedFilters, priceRange: price})}
                      />
                      <span>{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro Verificati */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedFilters.verifiedOnly}
                    onChange={(e) => setSelectedFilters({...selectedFilters, verifiedOnly: e.target.checked})}
                  />
                  <span className="text-sm">Solo professionisti verificati</span>
                </label>
              </div>

              {/* Esperienza */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Anni di esperienza</h3>
                <div className="space-y-2">
                  {['0-5', '5-10', '10-20', '20+'].map((exp) => (
                    <label key={exp} className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        className="mr-2"
                        checked={selectedFilters.experience === exp}
                        onChange={() => setSelectedFilters({...selectedFilters, experience: exp})}
                      />
                      <span className="text-sm">{exp} anni</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Risultati */}
          <div className="flex-grow">
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {searchResults.map((professional) => (
                  <Link
                    key={professional.id}
                    href={`/professionista/${professional.id}`}
                    className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex">
                        {/* Immagine profilo */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={professional.image}
                            alt={professional.name}
                            className="w-full h-full object-cover"
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
                              <p className="text-gray-600">{professional.profession}</p>
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <span className="ml-1 font-semibold">{professional.rating}</span>
                              </div>
                              <span className="text-gray-500 ml-1">
                                ({professional.reviews} recensioni)
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center mt-2 text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{professional.city}</span>
                            <span className="mx-2">•</span>
                            <span>{professional.experience}</span>
                            <span className="mx-2">•</span>
                            <span>{professional.priceRange}</span>
                          </div>

                          <div className="mt-2">
                            <p className="text-gray-600 line-clamp-2">
                              {professional.description}
                            </p>
                          </div>

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
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-4 h-[600px]">
                {/* Qui andrà la mappa */}
                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">Mappa in arrivo...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}