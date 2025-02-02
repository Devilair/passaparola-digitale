'use client';

import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';

const SearchFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    minRating: 0,
    verifiedOnly: false,
    priceRange: 'all'
  });

  const cities = ['Milano', 'Roma', 'Torino', 'Napoli', 'Firenze'];

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg border p-4">
      {/* Pulsante Toggle Filtri */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 font-medium"
      >
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        Filtri di Ricerca
      </button>

      {/* Pannello Filtri */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Città */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Città
            </label>
            <select
              value={filters.city}
              onChange={(e) => updateFilter('city', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Tutte le città</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Minimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating Minimo
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => updateFilter('minRating', rating)}
                  className={`p-2 rounded ${
                    filters.minRating >= rating
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <Star className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Solo Verificati */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">
                Solo professionisti verificati
              </span>
            </label>
          </div>

          {/* Fascia di Prezzo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fascia di Prezzo
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => updateFilter('priceRange', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="all">Tutte le fasce</option>
              <option value="low">Economica</option>
              <option value="medium">Media</option>
              <option value="high">Premium</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;