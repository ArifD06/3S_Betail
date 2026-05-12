'use client'

import React from 'react'
import { FiAward, FiHeart, FiCheckCircle, FiUsers, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const values = [
  {
    icon: FiAward,
    title: 'Excellence',
    description: 'Nous sélectionnons uniquement les meilleurs spécimens, élevés dans des conditions optimales.',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: FiHeart,
    title: 'Tradition',
    description: 'Nous respectons les traditions et les valeurs culturelles qui entourent la célébration de Tabaski.',
    color: 'bg-rose-50 text-rose-600'
  },
  {
    icon: FiCheckCircle,
    title: 'Confiance',
    description: 'Votre satisfaction est notre priorité. Qualité, transparence et service client irréprochable.',
    color: 'bg-teal-50 text-teal-600'
  }
]

const expertise = [
  { icon: FiUsers, title: 'Éleveurs Experts', desc: 'Partenaires professionnels du Burkina Faso et du Niger' },
  { icon: FiTruck, title: 'Logistique Optimale', desc: 'Livraison rapide et sécurisée dans tout Abidjan' },
  { icon: FiShield, title: 'Suivi Vétérinaire', desc: 'Tous nos animaux sont suivis et en excellente santé' },
  { icon: FiHeart, title: 'Bien-être Animal', desc: 'Nous respectons les normes les plus strictes pour nos bêtes' }
]

const commitments = {
  qualite: [
    'Animaux sélectionnés selon des critères stricts',
    'Suivi vétérinaire régulier',
    'Alimentation naturelle et contrôlée'
  ],
  service: [
    'Conseils personnalisés pour chaque client',
    'Disponibilité 24/7 en période de Tabaski',
    'Garantie satisfaction et service après-vente'
  ]
}

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] text-white overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#C8973A]/10 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#C8973A]/5 pointer-events-none" />
        <div className="container mx-auto px-4 py-20 relative">
          <span className="inline-block bg-[#C8973A]/20 text-[#C8973A] text-sm font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
            Notre histoire
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            À propos de <span className="text-[#C8973A]">3S Bétail</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
            Votre partenaire de confiance pour une Tabaski réussie, avec les meilleurs moutons du Burkina Faso et du Niger.
          </p>
        </div>
      </div>

      {/* Notre Histoire */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#C8973A]/10 text-[#C8973A] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                Qui sommes-nous
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-5">Notre Histoire</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Fondée par trois frères passionnés d'élevage, 3S Bétail s'est rapidement imposée comme la référence pour la vente de moutons de qualité en Côte d'Ivoire.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre mission est simple : vous fournir des moutons qui répondent aux plus hauts standards de qualité, tout en respectant les valeurs qui font la richesse de notre culture.
              </p>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] rounded-2xl p-8 text-white">
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-[#C8973A]">3S</p>
                <p className="text-white/60 text-sm mt-1">Trois frères, une passion</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2', label: 'Pays d\'origine' },
                  { value: '100%', label: 'Photos réelles' },
                  { value: '8+', label: 'Moutons en stock' },
                  { value: '24h', label: 'Réponse garantie' }
                ].map((stat, i) => (
                  <div key={i} className="text-center bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-2xl font-bold text-[#C8973A]">{stat.value}</p>
                    <p className="text-white/55 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#C8973A]/10 text-[#C8973A] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Ce qui nous guide
            </span>
            <h2 className="text-3xl font-bold text-gray-800">Nos Valeurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${v.color} mb-5`}>
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Notre Expertise */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#C8973A]/10 text-[#C8973A] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Savoir-faire
            </span>
            <h2 className="text-3xl font-bold text-gray-800">Notre Expertise</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {expertise.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8973A]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C8973A] transition-colors duration-300">
                    <Icon className="text-2xl text-[#C8973A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Notre Engagement */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#C8973A]/10 text-[#C8973A] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Nos promesses
            </span>
            <h2 className="text-3xl font-bold text-gray-800">Notre Engagement</h2>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <FiAward className="text-amber-600 text-lg" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Qualité Garantie</h3>
              </div>
              <ul className="space-y-3">
                {commitments.qualite.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8973A] mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <FiCheckCircle className="text-teal-600 text-lg" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Service Client</h3>
              </div>
              <ul className="space-y-3">
                {commitments.service.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8973A] mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#C8973A]/10 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêts à célébrer Tabaski avec nous ?
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto text-sm md:text-base">
            Contactez-nous pour découvrir notre sélection et bénéficier de nos conseils.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2250152041893"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C8973A] hover:bg-[#D4A763] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-[#C8973A]/30"
            >
              <FaWhatsapp className="text-lg" />
              <span>Écrire sur WhatsApp</span>
            </a>
            <a
              href="/produits"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-[#C8973A] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:text-[#C8973A]"
            >
              <span>Voir le catalogue</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
