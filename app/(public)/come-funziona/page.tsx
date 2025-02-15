'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Shield, Star, MessageSquare, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Cerca il professionista",
      description: "Trova facilmente il professionista più adatto alle tue esigenze usando i nostri filtri di ricerca avanzati per categoria, città e specializzazione."
    },
    {
      icon: Star,
      title: "Leggi le recensioni verificate",
      description: "Consulta le esperienze reali di altri utenti. Tutte le recensioni sono verificate attraverso prove di servizio per garantire la massima trasparenza."
    },
    {
      icon: Shield,
      title: "Verifica le credenziali",
      description: "Controlla le qualifiche professionali, le specializzazioni e il livello di esperienza. I professionisti verificati hanno superato il nostro processo di verifica dell'identità."
    },
    {
      icon: MessageSquare,
      title: "Condividi la tua esperienza",
      description: "Dopo aver usufruito di un servizio, contribuisci alla community lasciando una recensione dettagliata della tua esperienza."
    }
  ];

  const features = [
    {
      title: "Solo recensioni verificate",
      description: "Richiediamo prove del servizio ricevuto per garantire l'autenticità delle recensioni"
    },
    {
      title: "Nessuna vendita di contatti",
      description: "Non vendiamo i tuoi dati né facciamo lead generation. Siamo una piattaforma indipendente."
    },
    {
      title: "Professionisti verificati",
      description: "Verifichiamo l'identità e le credenziali professionali per garantire la massima affidabilità"
    },
    {
      title: "Trasparenza totale",
      description: "Il ranking dei professionisti è basato solo sulle recensioni verificate, mai su pagamenti o promozioni"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Come funziona Passaparola Digitale
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La piattaforma che ti aiuta a trovare il professionista giusto attraverso 
            recensioni verificate e trasparenti
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Perché scegliere Passaparola Digitale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Pronto a trovare il professionista giusto?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di utenti che hanno già trovato il professionista 
            più adatto alle loro esigenze
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerca un professionista
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Registrati ora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}