'use client';

import { Star, Shield, MapPin, Calendar, ThumbsUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

type Review = {
  id: number;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  response?: string;
};

type Professional = {
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
  experience: string;
  education: string[];
  languages: string[];
  address: string;
  reviewsList: Review[];
};

export default function ProfessionalProfile() {
  const params = useParams();

  // Dati di esempio
  const professional: Professional = {
    id: 1,
    name: "Avv. Marco Rossi",
    profession: "Avvocato",
    specializations: ["Diritto Civile", "Diritto del Lavoro"],
    rating: 4.8,
    reviews: 156,
    city: "Milano",
    verified: true,
    image: "/api/placeholder/200/200",
    description: "Avvocato civilista con oltre 15 anni di esperienza. Specializzato in diritto del lavoro e controversie contrattuali.",
    experience: "15 anni",
    education: ["Laurea in Giurisprudenza - Università di Milano", "Master in Diritto del Lavoro"],
    languages: ["Italiano", "Inglese"],
    address: "Via Roma 123, Milano",
    reviewsList: [
      {
        id: 1,
        author: "Mario Bianchi",
        rating: 5,
        date: "15 gennaio 2024",
        verified: true,
        title: "Professionista eccellente",
        content: "Ho avuto un'esperienza molto positiva. L'avvocato Rossi è stato chiaro, competente e sempre disponibile.",
        response: "Grazie per la sua recensione. È stato un piacere assisterla."
      },
      {
        id: 2,
        author: "Laura Verdi",
        rating: 4,
        date: "10 gennaio 2024",
        verified: true,
        title: "Molto professionale",
        content: "Ottima assistenza per una questione contrattuale complessa. Consigliato."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Pulsante Indietro */}
        <Link 
          href="/"
          className="inline-block mb-6 text-blue-500 hover:text-blue-600"
        >
          ← Torna alla ricerca
        </Link>

        {/* Header Profilo */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex gap-6">
            <div className="w-48 h-48 relative rounded-lg overflow-hidden">
              <Image
                src={professional.image}
                alt={professional.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    {professional.name}
                    {professional.verified && (
                      <Shield className="w-6 h-6 text-blue-500" />
                    )}
                  </h1>
                  <p className="text-xl text-gray-600 mt-1">{professional.profession}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold ml-1">{professional.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({professional.reviews} recensioni)
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-5 h-5 mr-1" />
                      {professional.city}
                    </div>
                  </div>
                </div>
                
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Contatta
                </button>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">{professional.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dettagli e Recensioni */}
        <div className="grid grid-cols-3 gap-6">
          {/* Colonna Sinistra - Dettagli */}
          <div className="col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Informazioni</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500 text-sm">Esperienza</label>
                  <p className="font-medium">{professional.experience}</p>
                </div>

                <div>
                  <label className="text-gray-500 text-sm">Formazione</label>
                  <ul className="list-disc list-inside space-y-1">
                    {professional.education.map((edu, index) => (
                      <li key={index} className="font-medium">{edu}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="text-gray-500 text-sm">Lingue</label>
                  <div className="flex gap-2">
                    {professional.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 text-sm">Indirizzo</label>
                  <p className="font-medium">{professional.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonna Destra - Recensioni */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-6">Recensioni</h2>
              
              <div className="space-y-6">
                {professional.reviewsList.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{review.author}</h3>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <Shield className="w-3 h-3 mr-1" />
                              Verificata
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4" />
                          {review.date}
                        </div>
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
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
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
    </main>
  );
}