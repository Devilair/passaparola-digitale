'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Chi siamo */}
          <div>
            <h3 className="text-white font-semibold mb-4">Chi siamo</h3>
            <ul className="space-y-3">
              <li><Link href="/chi-siamo" className="hover:text-white">Chi siamo</Link></li>
              <li><Link href="/lavora-con-noi" className="hover:text-white">Lavora con noi</Link></li>
              <li><Link href="/contatti" className="hover:text-white">Contatti</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/come-funziona" className="hover:text-white">Come funziona</Link></li>
              <li><Link href="/trasparenza" className="hover:text-white">Report sulla trasparenza</Link></li>
              <li><Link href="/stampa" className="hover:text-white">Stampa</Link></li>
              <li><Link href="/investitori" className="hover:text-white">Relazioni con gli investitori</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              <li><Link href="/fidati" className="hover:text-white">Fidati delle recensioni</Link></li>
              <li><Link href="/assistenza" className="hover:text-white">Centro assistenza</Link></li>
              <li><Link href="/accedi" className="hover:text-white">Accedi</Link></li>
              <li><Link href="/registrati" className="hover:text-white">Registrati</Link></li>
            </ul>
          </div>

          {/* Professionisti */}
          <div>
            <h3 className="text-white font-semibold mb-4">Professionisti</h3>
            <ul className="space-y-3">
              <li><Link href="/business" className="hover:text-white">Area Professionisti</Link></li>
              <li><Link href="/prodotti" className="hover:text-white">Prodotti</Link></li>
              <li><Link href="/piani" className="hover:text-white">Piani e prezzi</Link></li>
              <li><Link href="/business/accesso" className="hover:text-white">Accesso Business</Link></li>
              <li><Link href="/business/blog" className="hover:text-white">Blog per i professionisti</Link></li>
            </ul>
          </div>

          {/* Social e App */}
          <div>
            <h3 className="text-white font-semibold mb-4">Seguici su</h3>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="hover:text-white">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
            <div>
              <Link href="#">
                <img 
                  src="/app-store-badge.png" 
                  alt="Scarica su App Store" 
                  className="h-10 mb-3"
                />
              </Link>
              <Link href="#">
                <img 
                  src="/google-play-badge.png" 
                  alt="Disponibile su Google Play" 
                  className="h-10"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <Link href="/legale" className="hover:text-white">Informazioni legali</Link>
            <Link href="/privacy" className="hover:text-white">Informativa sulla privacy</Link>
            <Link href="/termini" className="hover:text-white">Termini e Condizioni</Link>
            <Link href="/linee-guida" className="hover:text-white">Linee guida per le recensioni</Link>
            <Link href="/status" className="hover:text-white">Stato del sistema</Link>
            <Link href="/cookie" className="hover:text-white">Gestisci i cookie</Link>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 Passaparola Digitale. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}