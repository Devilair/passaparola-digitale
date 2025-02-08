'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  rating: number | null;
  priceRange: string | null;
  verifiedOnly: boolean;
  experience: string | null;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    rating: null,
    priceRange: null,
    verifiedOnly: false,
    experience: null,
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filtri</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Filter className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className="space-y-6">
          {/* Rating */}
          <div>
            <h3 className="text-sm font-medium mb-2">Rating minimo</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    className="mr-2"
                    checked={filters.rating === rating}
                    onChange={() => handleFilterChange({ rating })}
                  />
                  <span>{rating}+ stelle</span>
                </label>
              ))}
            </div>
          </div>

          {/* Prezzo */}
          <div>
            <h3 className="text-sm font-medium mb-2">Fascia di prezzo</h3>
            <div className="space-y-2">
              {['€', '€€', '€€€', '€€€€'].map((price) => (
                <label key={price} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    className="mr-2"
                    checked={filters.priceRange === price}
                    onChange={() => handleFilterChange({ priceRange: price })}
                  />
                  <span>{price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verificati */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.verifiedOnly}
                onChange={(e) => handleFilterChange({ verifiedOnly: e.target.checked })}
              />
              <span className="text-sm">Solo professionisti verificati</span>
            </label>
          </div>

          {/* Esperienza */}
          <div>
            <h3 className="text-sm font-medium mb-2">Anni di esperienza</h3>
            <div className="space-y-2">
              {['0-5', '5-10', '10-20', '20+'].map((exp) => (
                <label key={exp} className="flex items-center">
                  <input
                    type="radio"
                    name="experience"
                    className="mr-2"
                    checked={filters.experience === exp}
                    onChange={() => handleFilterChange({ experience: exp })}
                  />
                  <span className="text-sm">{exp} anni</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}