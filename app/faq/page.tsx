'use client'

import React, { useState } from 'react'
import { FiChevronDown, FiMessageSquare, FiShoppingCart, FiTruck, FiShield, FiCreditCard, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  icon: React.ElementType
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Comment passer une commande sur 3S Bétail ?",
    answer: "Vous pouvez passer une commande de plusieurs manières : par téléphone au +225 01 52 04 18 93, via WhatsApp au même numéro, ou en parcourant notre catalogue en ligne et en nous contactant directement. Notre équipe vous guidera dans le choix du produit parfait selon vos besoins et votre budget.",
    category: "Commandes",
    icon: FiShoppingCart
  },
  {
    id: 2,
    question: "Quels types de paiement acceptez-vous ?",
    answer: "Nous acceptons plusieurs modes de paiement : espèces à la livraison, Mobile Money (Orange Money, MTN Money, Moov Money). Des arrangements peuvent être faits pour les commandes importantes.",
    category: "Paiement",
    icon: FiCreditCard
  },
  {
    id: 3,
    question: "La livraison est-elle gratuite ?",
    answer: "La livraison est disponible sur Abidjan. Les frais de livraison dépendent de votre localisation. Contactez-nous pour obtenir un devis précis selon votre commune.",
    category: "Livraison",
    icon: FiTruck
  },
  {
    id: 4,
    question: "Puis-je venir voir les animaux avant d'acheter ?",
    answer: "Absolument ! Nous encourageons nos clients à venir voir les animaux avant de faire leur choix. Vous pouvez prendre rendez-vous en nous contactant par téléphone ou WhatsApp.",
    category: "Visites",
    icon: FiMessageSquare
  },
  {
    id: 5,
    question: "Vos animaux sont-ils certifiés halal ?",
    answer: "Oui, tous nos animaux sont élevés selon les préceptes islamiques par des éleveurs de confiance au Burkina Faso et au Niger. Nos moutons respectent les critères halal pour la fête de Tabaski.",
    category: "Certification",
    icon: FiShield
  },
  {
    id: 6,
    question: "Quelles sont les tailles de moutons disponibles ?",
    answer: "Nous proposons différentes tailles : Taille M (75×110 cm, 38-41 kg), Taille J (80×117 cm, 40-43 kg), et Taille L (90×130 cm, 50-55 kg). Nos experts peuvent vous conseiller sur la taille idéale selon le nombre de personnes.",
    category: "Produits",
    icon: FiShoppingCart
  },
  {
    id: 7,
    question: "Comment savoir si un mouton est de bonne qualité ?",
    answer: "Un mouton de qualité se reconnaît à : une robe propre, des cornes bien développées, un poids proportionnel à sa taille, des yeux vifs, et une bonne condition physique. Tous nos animaux sont sélectionnés selon ces critères stricts.",
    category: "Qualité",
    icon: FiShield
  },
  {
    id: 8,
    question: "Proposez-vous des garanties sur vos animaux ?",
    answer: "Oui, nous garantissons la bonne santé de tous nos animaux au moment de la livraison. Si un problème est détecté dans les 5 jours suivant l'achat, nous nous engageons à trouver une solution adaptée.",
    category: "Garanties",
    icon: FiShield
  },
  {
    id: 9,
    question: "Puis-je réserver un mouton à l'avance pour Tabaski ?",
    answer: "Oui, et c'est même recommandé ! Vous pouvez réserver votre mouton à l'avance. Un acompte de 30% est requis pour confirmer la réservation. Un tarif spécial est appliqué pour les réservations anticipées.",
    category: "Réservations",
    icon: FiShoppingCart
  },
  {
    id: 10,
    question: "Quels sont vos horaires d'ouverture ?",
    answer: "Nos horaires standards : Lundi – Vendredi : 08h00 – 18h00, Samedi : 08h00 – 14h00. En période de Tabaski (2 semaines avant la fête), nous ouvrons 7j/7 de 06h00 à 22h00. Notre service WhatsApp reste disponible 24h/24.",
    category: "Service Client",
    icon: FiMessageSquare
  },
  {
    id: 11,
    question: "Proposez-vous des services d'abattage ?",
    answer: "Pour le moment non, mais nous travaillons à l'ouverture d'un service d'abattage professionnel dans les prochains mois.",
    category: "Services",
    icon: FiShoppingCart
  },
  {
    id: 12,
    question: "Comment savoir le poids exact d'un mouton ?",
    answer: "Tous nos animaux sont pesés régulièrement. Nous garantissons le poids indiqué avec une marge de ±2 kg. Au moment de la livraison, vous pouvez demander une pesée de contrôle.",
    category: "Produits",
    icon: FiShoppingCart
  }
]

const categories = ['Toutes', ...Array.from(new Set(faqs.map(f => f.category)))]

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('Toutes')

  const toggle = (id: number) => setExpandedId(prev => prev === id ? null : id)

  const filtered = selectedCategory === 'Toutes'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] text-white overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#C8973A]/10 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#C8973A]/5 pointer-events-none" />
        <div className="container mx-auto px-4 py-20 relative">
          <span className="inline-block bg-[#C8973A]/20 text-[#C8973A] text-sm font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
            Aide & Support
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Questions <span className="text-[#C8973A]">fréquentes</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Retrouvez les réponses aux questions les plus posées sur nos produits et services.
          </p>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#C8973A] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#C8973A]/10 hover:text-[#C8973A]'
                }`}
              >
                {cat}
                {cat !== 'Toutes' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({faqs.filter(f => f.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion FAQ */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-3">
            {filtered.map(faq => {
              const Icon = faq.icon
              const isOpen = expandedId === faq.id
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#C8973A]/40 shadow-md'
                      : 'border-gray-100 bg-white shadow-sm hover:border-[#C8973A]/20 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center gap-4"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                      isOpen ? 'bg-[#C8973A] text-white' : 'bg-[#C8973A]/10 text-[#C8973A]'
                    }`}>
                      <Icon className="text-base" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm md:text-base pr-4">{faq.question}</p>
                      <span className="inline-block mt-1 text-xs text-[#C8973A]/80 font-medium">{faq.category}</span>
                    </div>
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 border-[#C8973A]/30 bg-[#C8973A]/5' : ''}`}>
                      <FiChevronDown className="text-gray-500 text-sm" />
                    </div>
                  </button>

                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 pb-5 pt-0">
                      <div className="pl-14">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <FiMessageSquare className="text-5xl mx-auto mb-4 opacity-40" />
                <p>Aucune question dans cette catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats rapides */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { value: `${faqs.length}`, label: 'Questions répondues' },
              { value: `${categories.length - 1}`, label: 'Catégories' },
              { value: '24/7', label: 'Support WhatsApp' },
              { value: '< 24h', label: 'Délai de réponse' }
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-[#C8973A] mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#C8973A]/10 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold text-white mb-3">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto text-sm">
            Notre équipe est disponible pour répondre à toutes vos questions. N'hésitez pas !
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
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-[#C8973A] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:text-[#C8973A]"
            >
              <span>Formulaire de contact</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
