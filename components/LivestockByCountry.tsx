'use client'

import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { products } from '@/data/products'

const countryConfig: { [key: string]: { flag: string; color: string; bg: string; border: string } } = {
  'Burkina Faso': {
    flag: '🇧🇫',
    color: 'text-red-700',
    bg: 'from-red-50 to-orange-50',
    border: 'border-red-100'
  },
  'Niger': {
    flag: '🇳🇪',
    color: 'text-orange-700',
    bg: 'from-orange-50 to-yellow-50',
    border: 'border-orange-100'
  },
  "Côte d'Ivoire": {
    flag: '🇨🇮',
    color: 'text-green-700',
    bg: 'from-green-50 to-emerald-50',
    border: 'border-green-100'
  },
  'Mali': {
    flag: '🇲🇱',
    color: 'text-yellow-700',
    bg: 'from-yellow-50 to-amber-50',
    border: 'border-yellow-100'
  }
}

const totalProducts = products.length

export default function LivestockByCountry() {
  const countByCountry = products.reduce<{ [key: string]: number }>((acc, product) => {
    const origin = product.origin.trim()
    acc[origin] = (acc[origin] || 0) + 1
    return acc
  }, {})

  const countries = Object.entries(countByCountry)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
      ...(countryConfig[name] || { flag: '🏳️', color: 'text-gray-700', bg: 'from-gray-50 to-gray-100', border: 'border-gray-100' })
    }))

  return (
    <section className="py-16 md:py-20 bg-[#FDF6E3]">
      <div className="container mx-auto px-4">

        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#C8973A]/10 text-[#C8973A] text-sm font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            Nos origines
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Bétail par pays</h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm md:text-base">
            Tous nos moutons sont soigneusement sélectionnés auprès d'éleveurs de confiance.
          </p>
        </div>

        {/* Grille de cartes */}
        <div className={`grid gap-5 ${
          countries.length === 1
            ? 'grid-cols-1 max-w-sm mx-auto'
            : countries.length === 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {countries.map((country, index) => (
            <a
              key={index}
              href="/produits"
              className={`group relative bg-gradient-to-br ${country.bg} border ${country.border} rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Cercle décoratif en arrière-plan */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/40 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/30 pointer-events-none" />

              <div className="relative">
                {/* Drapeau + compteur badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className="text-5xl md:text-6xl drop-shadow-sm select-none">
                    {country.flag}
                  </div>
                  <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {country.count} disponible{country.count > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Nom du pays */}
                <h3 className={`text-xl md:text-2xl font-bold ${country.color} mb-2`}>
                  {country.name}
                </h3>

                {/* Barre de progression */}
                <div className="mb-4">
                  <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C8973A] rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((country.count / totalProducts) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {Math.round((country.count / totalProducts) * 100)}% du catalogue
                  </p>
                </div>

                {/* Lien */}
                <div className={`flex items-center space-x-1 text-sm font-semibold ${country.color} group-hover:gap-2 transition-all`}>
                  <span>Voir les moutons</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
