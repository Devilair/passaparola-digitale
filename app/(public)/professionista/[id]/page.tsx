'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Shield, MapPin, MessageSquare } from 'lucide-react';

// Dati mock dei professionisti
const mockProfessionals = {
  "1": {
    id: 1,
    name: "Avv. Marco Rossi",
    profession: "Avvocato",
    specializations: ["Diritto Civile", "Diritto del Lavoro"],
    rating: 4.8,
    reviews: 156,
    city: "Milano",
    address: "Via Roma 123",
    verified: true,
    image: "/api/placeholder/400/300",
    description: "Avvocato civilista con oltre 15 anni di esperienza. Specializzato in diritto del lavoro e controversie contrattuali.",
    experience: "15 anni",
    education: [
      "Laurea in Giurisprudenza - Università degli Studi di Milano",
      "Master in Diritto del Lavoro",
      "Abilitazione professionale dal 2008"
    ],
    languages: ["Italiano", "Inglese", "Francese"],
    reviews_list: [
      {
        id: 1,
        author: "Mario Bianchi",
        rating: 5,
        date: "15 gennaio 2024",
        title: "Professionista eccellente",
        content: "Ho avuto un'esperienza molto positiva. L'avvocato Rossi è stato chiaro, competente e sempre disponibile.",
        verified: true,
        response: "Grazie per la sua recensione. È stato un piacere assisterla."
      },
      {
        id: 2,
        author: "Laura Verdi",
        rating: 4,
        date: "10 gennaio 2024",
        title: "Molto professionale",
        content: "Ottima assistenza per una questione contrattuale complessa. Tempi e costi in linea con quanto preventivato.",
        verified: true
      }
    ]
  }
};

export default function ProfessionalPage() {
  const params = useParams();
  const professionalId = params.id as string;
  const professional = mockProfessionals[professionalId as keyof typeof mockProfessionals];

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Professionista non trovato</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Torna alla home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Torna alla ricerca
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="md:flex">
            {/* Profile Image */}
            <div className="relative md:w-1/3 h-[300px] md:h-auto">
              <Image
                src={professional.image}
                alt={professional.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="p-6 md:w-2/3">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    {professional.name}
                    {professional.verified && (
                      <Shield className="w-6 h-6 text-blue-500" title="Professionista verificato" />
                    )}
                  </h1>
                  <p className="text-xl text-gray-600 mt-1">{professional.profession}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="ml-1 text-2xl font-bold">{professional.rating}</span>
                  <span className="text-gray-500 ml-2">
                    ({professional.reviews} recensioni verificate)
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-4 text-gray-600">
                <MapPin className="w-5 h-5 mr-1" />
                <span>{professional.address}, {professional.city}</span>
              </div>

              <p className="mt-4 text-gray-700">{professional.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Info */}
          <div className="space-y-6">
            {/* Experience & Education */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Informazioni Professionali</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Esperienza</h3>
                  <p className="mt-1">{professional.experience}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Formazione</h3>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    {professional.education.map((edu, index) => (
                      <li key={index} className="text-gray-700">{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Specializzazioni</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
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

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lingue</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {professional.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reviews */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recensioni Verificate</h2>
                <Link 
                  href="/recensioni/nuova" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  Scrivi una recensione
                </Link>
              </div>

              <div className="space-y-6">
                {professional.reviews_list.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{review.author}</h3>
                          {review.verified && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <Shield className="w-3 h-3 mr-1" />
                              Verificata
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-700">{review.content}</p>

                    {review.response && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold">Risposta del professionista</span>
                        </div>
                        <p className="text-gray-600">{review.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}