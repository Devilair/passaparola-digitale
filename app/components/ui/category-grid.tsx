'use client';
import { Briefcase, GraduationCap, Scale, FileText, Wrench } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 'lawyer', name: 'Avvocati', icon: Scale },
  { id: 'accountant', name: 'Commercialisti', icon: FileText },
  { id: 'notary', name: 'Notai', icon: GraduationCap },
  { id: 'engineer', name: 'Ingegneri', icon: Briefcase },
  { id: 'craftsman', name: 'Artigiani', icon: Wrench },
];

export function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            className={`p-4 rounded-lg text-center transition-colors flex flex-col items-center gap-2
              ${selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50 border'
              }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <Icon className="w-6 h-6" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}