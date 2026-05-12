'use client'

import React from 'react'
import { FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa'

const links = {
  navigation: [
    { label: 'Accueil', href: '/' },
    { label: 'Boutique', href: '/produits' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' }
  ],
  services: [
    'Livraison à domicile sur Abidjan',
    'Photos réelles des animaux',
    'Paiement mobile money',
    'Qualité & santé garanties',
    'Support client réactif'
  ]
}

export default function Footer() {
  return (
    <footer className="bg-[#2C1A00] text-white">

      {/* Bande or en haut */}
      <div className="h-1 bg-gradient-to-r from-[#B8852E] via-[#C8973A] to-[#B8852E]" />

      {/* CTA WhatsApp */}
      <div className="bg-[#3D2400] border-b border-[#C8973A]/20">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F5F5DC]/80 text-sm">
            Besoin d'aide pour choisir votre mouton ?
          </p>
          <a
            href="https://wa.me/2250152041893"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-[#C8973A] hover:bg-[#D4A763] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 group"
          >
            <FaWhatsapp className="text-base" />
            <span>Contactez-nous sur WhatsApp</span>
            <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Corps principal */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Branding */}
          <div className="lg:col-span-1 space-y-5">
            <div>
              <span className="text-2xl font-bold text-white">3S <span className="text-[#C8973A]">Bétail</span></span>
              <div className="h-0.5 w-10 bg-[#C8973A] mt-2 rounded-full" />
            </div>
            <p className="text-[#F5F5DC]/60 text-sm leading-relaxed">
              Sélection soignée de moutons du Burkina Faso et du Niger, livrés directement chez vous à Abidjan pour une Tabaski réussie.
            </p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#C8973A]/30 flex items-center justify-center text-[#F5F5DC]/60 hover:bg-[#C8973A] hover:text-white hover:border-[#C8973A] transition-all duration-300">
                <FaFacebook className="text-sm" />
              </a>
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#C8973A]/30 flex items-center justify-center text-[#F5F5DC]/60 hover:bg-[#C8973A] hover:text-white hover:border-[#C8973A] transition-all duration-300">
                <FaInstagram className="text-sm" />
              </a>
              <a href="https://wa.me/2250152041893" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-[#C8973A]/30 flex items-center justify-center text-[#F5F5DC]/60 hover:bg-[#C8973A] hover:text-white hover:border-[#C8973A] transition-all duration-300">
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3">
              {links.navigation.map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="text-[#F5F5DC]/60 hover:text-[#C8973A] text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#C8973A]/40 group-hover:bg-[#C8973A] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Nos services</h3>
            <ul className="space-y-3">
              {links.services.map((service, i) => (
                <li key={i} className="text-[#F5F5DC]/60 text-sm flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C8973A]/40 mt-2 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C8973A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMapPin className="text-[#C8973A] text-sm" />
                </div>
                <span className="text-[#F5F5DC]/60 text-sm leading-relaxed">Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C8973A]/10 flex items-center justify-center flex-shrink-0">
                  <FiPhone className="text-[#C8973A] text-sm" />
                </div>
                <div className="text-[#F5F5DC]/60 text-sm space-y-1">
                  <p>+225 01 52 04 18 93</p>
                  <p>+225 01 51 29 11 81</p>
                </div>
              </li>
              <li>
                <a
                  href="https://wa.me/2250152041893"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C8973A]/10 hover:bg-[#C8973A] border border-[#C8973A]/30 hover:border-[#C8973A] text-[#C8973A] hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <FaWhatsapp />
                  <span>Écrire sur WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre de bas */}
      <div className="border-t border-[#C8973A]/15">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#F5F5DC]/40">
          <p>© 2026 3S Bétail — Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-[#C8973A] transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-[#C8973A] transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-[#C8973A] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
