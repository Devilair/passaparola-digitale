'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, Shield, MapPin, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Professional {
  id: number;
  name: string;
  profession: string;
  specializations: string[];
  rating: number;
  reviews: number;
  city: string;
  verified: boolean;
  image: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  const cityQuery = searchParams.get('city');

  const [results, setResults] = useState<Professional[]>([]);
  const [filters, setFilters] = useState({
    rating: 0,
    verified: false,
    city: cityQuery || '',
    category: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...(searchQuery && { q: searchQuery }),
        ...(filters.city && { city: filters.city }),
        ...(filters.category && { category: filters.category }),
        ...(filters.rating > 0 && { minRating: filters.rating.toString() }),
        ...(filters.verified && { verified: 'true' })
      });

      try {
        const response = await fetch(`/api/search?${queryParams}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {searchQuery ? 
              `Risultati per "${searchQuery}"` : 
              'Tutti i professionisti'
            }
          </h1>
          <p className="text-gray-600">
            {results.length} risultati trovati
          </p>
        </div>

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
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Tutte</option>
                  <option value="Avvocato">Avvocati</option>
                  <option value="Commercialista">Commercialisti</option>
                  <option value="Notaio">Notai</option>
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

          {/* Risultati */}
          <div className="flex-grow">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Caricamento risultati...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((professional) => (
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
                              <p className="text-gray-600">{professional.profession}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <span className="ml-1 font-semibold">{professional.rating}</span>
                              <span className="text-gray-500 ml-1">
                                ({professional.reviews} recensioni)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center mt-2 text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{professional.address}, {professional.city}</span>
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
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Nessun risultato trovato</p>
                <p className="text-gray-500 mt-2">Prova a modificare i filtri di ricerca</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}