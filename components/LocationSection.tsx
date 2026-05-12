'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { FiMapPin, FiPhone, FiClock, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const Map = dynamic(() => import('@/components/map'), { ssr: false })

export default function LocationSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* En-tête */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#C8973A]/10 text-[#C8973A] text-sm font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            Localisation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nous trouver</h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base max-w-md mx-auto">
            Venez voir nos moutons sur place ou contactez-nous pour organiser une visite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* Carte — prend 2/3 */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: '360px' }}>
            <Map />
          </div>

          {/* Infos rapides — 1/3 */}
          <div className="flex flex-col gap-4">

            {/* Adresse */}
            <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#C8973A]/10 flex items-center justify-center flex-shrink-0">
                <FiMapPin className="text-[#C8973A]" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-0.5">Adresse</p>
                <p className="text-gray-500 text-sm leading-relaxed">Abidjan M'badon<br />Côte d'Ivoire</p>
              </div>
            </div>

            {/* Téléphone */}
            <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#C8973A]/10 flex items-center justify-center flex-shrink-0">
                <FiPhone className="text-[#C8973A]" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-0.5">Téléphone</p>
                <a href="tel:+2250152041893" className="block text-sm text-gray-500 hover:text-[#C8973A] transition-colors">+225 01 52 04 18 93</a>
                <a href="tel:+2250151291181" className="block text-sm text-gray-500 hover:text-[#C8973A] transition-colors">+225 01 51 29 11 81</a>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#C8973A]/10 flex items-center justify-center flex-shrink-0">
                <FiClock className="text-[#C8973A]" />
              </div>
              <div className="w-full">
                <p className="font-semibold text-gray-800 text-sm mb-2">Horaires</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Lun – Ven</span>
                    <span className="font-medium text-gray-700">08h – 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-medium text-gray-700">08h – 14h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tabaski</span>
                    <span className="font-medium text-[#C8973A]">24h/24</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <a
              href="https://wa.me/2250152041893"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-sm"
            >
              <FaWhatsapp className="text-base" />
              <span>WhatsApp</span>
            </a>

            <a
              href="/contact"
              className="flex items-center justify-center gap-2 border border-gray-200 hover:border-[#C8973A] text-gray-600 hover:text-[#C8973A] font-medium py-3 px-4 rounded-xl transition-all duration-300 text-sm group"
            >
              <span>Voir la page contact</span>
              <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
