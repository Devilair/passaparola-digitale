'use client';
import { useState } from 'react';
import { Star, Shield, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProfessionalList = () => {
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
      image: "/api/placeholder/100/100",
      priceRange: "€€€",
      experience: "15 anni",
      description: "Specializzato in diritto del lavoro e controversie civili."
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
      description: "Esperto in consulenza fiscale per PMI."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      {professionals.map((professional) => (
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
  );
};

export default ProfessionalList;