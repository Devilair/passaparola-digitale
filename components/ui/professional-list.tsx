'use client';
import Link from 'next/link';
import { Star, Shield, MapPin } from 'lucide-react';

const professionals = [
  {
    id: 1,
    name: "Avv. Marco Rossi",
    profession: "Avvocato",
    specializations: ["Diritto Civile", "Diritto del Lavoro"],
    rating: 4.8,
    reviews: 156,
    city: "Milano",
    verified: true,
    image: "/api/placeholder/100/100"
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
    image: "/api/placeholder/100/100"
  }
];

export default function ProfessionalList() {
  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      {professionals.map((professional) => (
        <Link 
          key={professional.id} 
          href={`/professionista/${professional.id}`}
          className="block"
        >
          <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Immagine profilo */}
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informazioni principali */}
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {professional.name}
                      {professional.verified && (
                        <Shield className="w-5 h-5 text-blue-500" />
                      )}
                    </h3>
                    <p className="text-gray-600">{professional.profession}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold ml-1">{professional.rating}</span>
                    </div>
                    <span className="text-gray-500">
                      ({professional.reviews} recensioni)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-500 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{professional.city}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {professional.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
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
  );
}