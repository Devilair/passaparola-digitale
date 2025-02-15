'use client';

import Link from 'next/link';
import { Shield, Star, TrendingUp, Users, CheckCircle, Award } from 'lucide-react';

export default function ForProfessionalsPage() {
  const benefits = [
    {
      icon: Shield,
      title: "Verifica dell'identità",
      description: "Ottieni un badge di verifica che conferma la tua identità e le tue credenziali professionali"
    },
    {
      icon: Star,
      title: "Gestione recensioni",
      description: "Rispondi alle recensioni dei clienti e gestisci la tua reputazione online in modo professionale"
    },
    {
      icon: TrendingUp,
      title: "Maggiore visibilità",
      description: "Aumenta la tua visibilità online e raggiungi nuovi potenziali clienti attraverso recensioni verificate"
    },
    {
      icon: Users,
      title: "Community professionale",
      description: "Entra a far parte di una community di professionisti verificati e costruisci la tua reputazione digitale"
    }
  ];

  const plans = [
    {
      name: "Base",
      price: "Gratuito",
      features: [
        "Profilo professionale base",
        "Ricezione recensioni verificate",
        "Risposta alle recensioni",
        "Statistiche di base"
      ],
      cta: "Inizia gratis",
      highlighted: false
    },
    {
      name: "Verificato",
      price: "€19.99/mese",
      features: [
        "Tutto del piano Base",
        "Badge professionista verificato",
        "Priorità nelle ricerche",
        "Statistiche avanzate",
        "Supporto prioritario"
      ],
      cta: "Prova gratis per 30 giorni",
      highlighted: true
    },
    {
      name: "Premium",
      price: "€39.99/mese",
      features: [
        "Tutto del piano Verificato",
        "Dashboard analytics avanzata",
        "Export dati e report",
        "API access",
        "Account manager dedicato"
      ],
      cta: "Contattaci",
      highlighted: false
    }
  ];

  const stats = [
    { number: "50k+", label: "Professionisti registrati" },
    { number: "150k+", label: "Recensioni verificate" },
    { number: "98%", label: "Tasso di soddisfazione" },
    { number: "500k+", label: "Utenti mensili" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Costruisci la tua reputazione professionale
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Unisciti alla piattaforma leader per la gestione della reputazione professionale. 
            Nessuna vendita di contatti, solo recensioni verificate e trasparenti.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Registrati come professionista
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Vantaggi per i professionisti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Piani e prezzi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-8 ${
                  plan.highlighted 
                    ? 'bg-blue-50 border-2 border-blue-500 relative' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      Più popolare
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Domande frequenti
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Come funziona la verifica dell'identità?</h3>
              <p className="text-gray-600">
                Il processo di verifica richiede la presentazione di documenti d'identità validi 
                e credenziali professionali. Il nostro team verifica manualmente ogni richiesta 
                per garantire la massima affidabilità.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Come vengono gestite le recensioni?</h3>
              <p className="text-gray-600">
                Tutte le recensioni sono verificate attraverso prove di servizio. Avrai la possibilità 
                di rispondere alle recensioni e gestire la tua reputazione in modo professionale.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quanto costa il servizio?</h3>
              <p className="text-gray-600">
                Offriamo un piano base gratuito e piani premium con funzionalità avanzate. 
                Puoi iniziare gratuitamente e passare a un piano superiore in qualsiasi momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Inizia a costruire la tua reputazione digitale
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unisciti a migliaia di professionisti che hanno già scelto Passaparola Digitale 
            per gestire la loro presenza online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Registrati ora
            </Link>
            <Link
              href="/contatti"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}