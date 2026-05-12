'use client'

import React from 'react'
import { FiAward, FiHeart, FiCheckCircle, FiCamera, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { products } from '@/data/products'

const features = [
  {
    icon: FiCamera,
    title: 'Photos 100% réelles',
    description: 'Chaque mouton est photographié individuellement. Ce que vous voyez est exactement ce que vous recevez.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: FiAward,
    title: 'Sélection rigoureuse',
    description: 'Nos moutons sont triés sur le volet auprès d\'éleveurs de confiance du Burkina Faso et du Niger.',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: FiHeart,
    title: 'Santé garantie',
    description: 'Tous nos animaux sont en excellente condition physique, bien nourris et suivis avant la vente.',
    color: 'bg-rose-50 text-rose-600'
  },
  {
    icon: FiTruck,
    title: 'Livraison sur Abidjan',
    description: 'Nous livrons votre mouton directement chez vous sur Abidjan, à la date qui vous convient.',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: FiCheckCircle,
    title: 'Paiement flexible',
    description: 'Paiement à la livraison ou par mobile money. Aucune mauvaise surprise, transaction sécurisée.',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: FiShield,
    title: 'Service de confiance',
    description: 'Des centaines de familles nous font confiance chaque année pour leur Tabaski. Votre satisfaction est notre priorité.',
    color: 'bg-teal-50 text-teal-600'
  }
]

const stats = [
  { value: `${products.filter(p => p.stock === 'En stock').length}`, label: 'Moutons disponibles' },
  { value: '100%', label: 'Photos réelles' },
  { value: '2', label: 'Pays d\'origine' },
  { value: '24h', label: 'Réponse garantie' }
]

export default function WhyChooseUs() {
  const router = useRouter()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] relative overflow-hidden">

      {/* Cercles décoratifs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C8973A]/10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#C8973A]/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative">

        {/* En-tête */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#C8973A]/20 text-[#C8973A] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Nos engagements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Chez 3S Bétail, chaque détail compte pour que votre Tabaski soit une célébration réussie.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, i) => (
            <div key={i} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl py-5 px-3">
              <p className="text-3xl md:text-4xl font-bold text-[#C8973A]">{stat.value}</p>
              <p className="text-white/60 text-xs md:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grille de features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C8973A]/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#C8973A] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={() => router.push('/produits')}
            className="group inline-flex items-center space-x-3 bg-[#C8973A] hover:bg-[#D4A763] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-[#C8973A]/30"
          >
            <span>Découvrir le catalogue</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
