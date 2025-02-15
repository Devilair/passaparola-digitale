'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NewReviewPage() {
  const [isLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Sezione Accesso */}
        <div className="bg-white rounded-lg shadow p-8 text-center mb-8">
          <AlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">
            Accedi per scrivere una recensione
          </h1>
          <p className="text-gray-600 mb-8">
            Per garantire l'autenticità delle recensioni, è necessario accedere o registrarsi prima di poter scrivere una recensione.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Accedi
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Registrati
            </Link>
          </div>
        </div>

        {/* Sezione informativa */}
        <div className="bg-white rounded-lg shadow p-8 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Come funzionano le recensioni su Passaparola Digitale?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Verifica dell'identità</h3>
                  <p className="text-gray-600">Ci assicuriamo che ogni recensione provenga da un utente reale e verificato.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Prova del servizio</h3>
                  <p className="text-gray-600">Richiediamo una prova del servizio ricevuto (fattura, contratto, ecc.) per garantire l'autenticità.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Moderazione</h3>
                  <p className="text-gray-600">Ogni recensione viene moderata dal nostro team per assicurare il rispetto delle linee guida.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Diritto di risposta</h3>
                  <p className="text-gray-600">I professionisti hanno la possibilità di rispondere alle recensioni in modo professionale.</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Linee guida per le recensioni</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Scrivi solo di esperienze personali dirette</li>
                <li>• Fornisci dettagli specifici sul servizio ricevuto</li>
                <li>• Mantieni un tono professionale e costruttivo</li>
                <li>• Evita informazioni personali o sensibili</li>
                <li>• Allega prove del servizio per la verifica</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}