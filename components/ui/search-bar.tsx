'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {  // Cambiato in arrow function
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Cerca un professionista..."
          className="w-full p-4 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute right-4 top-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;