import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mock data per il MVP
const mockProfessionals = [
  {
    id: 1,
    name: "Avv. Marco Rossi",
    profession: "Avvocato",
    specializations: ["Diritto Civile", "Diritto del Lavoro"],
    rating: 4.8,
    reviews: 156,
    city: "Milano",
    verified: true,
    address: "Via Roma 123",
    phone: "+39 02 1234567",
    email: "m.rossi@studio.it",
    website: "www.studiorossi.it",
    image: "/api/placeholder/100/100",
    description: "Specializzato in diritto del lavoro e controversie civili."
  },
  {
    id: 2,
    name: "Dott. Giuseppe Verdi",
    profession: "Commercialista",
    specializations: ["Consulenza Fiscale", "Bilanci"],
    rating: 4.7,
    reviews: 123,
    city: "Roma",
    verified: true,
    address: "Via Milano 456",
    phone: "+39 06 7654321",
    email: "g.verdi@studio.it",
    website: "www.studioverdi.it",
    image: "/api/placeholder/100/100",
    description: "Esperto in consulenza fiscale e bilanci."
  },
  {
    id: 3,
    name: "Not. Anna Bianchi",
    profession: "Notaio",
    specializations: ["Atti Immobiliari", "Successioni"],
    rating: 4.9,
    reviews: 89,
    city: "Torino",
    verified: true,
    address: "Corso Italia 789",
    phone: "+39 011 9876543",
    email: "a.bianchi@notaio.it",
    website: "www.notaiobianchi.it",
    image: "/api/placeholder/100/100",
    description: "Specializzata in atti immobiliari e successioni."
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const query = searchParams.get('q')?.toLowerCase() || '';
  const city = searchParams.get('city')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';
  const minRating = Number(searchParams.get('minRating')) || 0;
  const verifiedOnly = searchParams.get('verified') === 'true';

  // Filtra i professionisti in base ai parametri
  const filteredProfessionals = mockProfessionals.filter(professional => {
    // Filtra per query di ricerca
    if (query && !professional.name.toLowerCase().includes(query) && 
        !professional.profession.toLowerCase().includes(query) &&
        !professional.specializations.some(s => s.toLowerCase().includes(query))) {
      return false;
    }

    // Filtra per città
    if (city && professional.city.toLowerCase() !== city) {
      return false;
    }

    // Filtra per categoria/professione
    if (category && professional.profession.toLowerCase() !== category) {
      return false;
    }

    // Filtra per rating minimo
    if (minRating > 0 && professional.rating < minRating) {
      return false;
    }

    // Filtra per verifica
    if (verifiedOnly && !professional.verified) {
      return false;
    }

    return true;
  });

  return NextResponse.json(filteredProfessionals);
}