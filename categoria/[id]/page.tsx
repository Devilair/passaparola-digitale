'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Star, MapPin, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Dati di esempio per ogni categoria
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
      description: "Avvocato civilista con oltre 15 anni di esperienza..."
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
      description: "Specializzata in diritto penale e societario..."
    }
  ],
  commercialisti: [
    {
      id: 3,
      name: "Dott. Giuseppe Verdi",
      specializations: ["Consulenza Fiscale", "Bilanci"],
      rating: 4.9,
      reviews: 124,
      city: "Torino",
      verified: true,
      image: "/api/placeholder/100/100",
      description: "Esperto in consulenza fiscale e societaria..."
    }
  ],
  notai: [...],
  ingegneri: [...],
  artigiani: [...]
};

const categoryTitles = {
  avvocati: "Avvocati",
  commercialisti: "Commercialisti",
  notai: "Notai",
  ingegneri: "Ingegneri",
  artigiani: "Artigiani"
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [cityFilter, setCityFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  const professionals = mockProfessionals[categoryId as keyof typeof mockProfessionals] || [];

  const filteredProfessionals = professionals.filter(pro => {
    if (cityFilter && pro.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
    if (ratingFilter && pro.rating < ratingFilter) return false;
    return true;
  });

  if (!categoryTitles[categoryId as keyof typeof categoryTitles]) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Categoria non trovata</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{categoryTitles[categoryId as keyof typeof categoryTitles]}</h1>
        
        {/* Filtri */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex gap-4">
            <select 
              className="p-2 border rounded"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="">Tutte le città</option>
              <option value="Milano">Milano</option>
              <option value="Roma">Roma</option>
              <option value="Torino">Torino</option>
            </select>

            <select 
              className="p-2 border rounded"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
            >
              <option value="0">Rating minimo</option>
              <option value="4">4+ stelle</option>
              <option value="4.5">4.5+ stelle</option>
            </select>
          </div>
        </div>

        {/* Lista Professionisti */}
        <div className="space-y-4">
          {filteredProfessionals.map((pro) => (
            <Link 
              key={pro.id}
              href={`/professionista/${pro.id}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                    <Image
                      src={pro.image}
                      alt={pro.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          {pro.name}
                          {pro.verified && (
                            <Shield className="w-5 h-5 text-blue-500" />
                          )}
                        </h2>
                        <div className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="ml-1 text-gray-600">{pro.city}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="ml-1 font-bold">{pro.rating}</span>
                        <span className="ml-1 text-gray-500">
                          ({pro.reviews} recensioni)
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-gray-600">{pro.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {pro.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
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
      </div>
    </div>
  );
}