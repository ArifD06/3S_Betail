'use client'

import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiSearch, FiMessageSquare, FiShoppingCart, FiTruck, FiShield, FiCreditCard } from 'react-icons/fi'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  icon?: React.ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Comment passer une commande sur SSS Bétail ?",
    answer: "Vous pouvez passer une commande de plusieurs manières :  1) Par téléphone au +225 0152041893, 2) Via WhatsApp au même numéro, ou 3) En nous rendant directement sur place. Notre équipe vous guidera dans le choix du produit parfait selon vos besoins et votre budget.",
    category: "Commandes",
    icon: <FiShoppingCart />
  },
  {
    id: 2,
    question: "Quels types de paiement acceptez-vous ?",
    answer: "Nous acceptons plusieurs modes de paiement pour votre convenance : espèces,  Mobile Money (Orange Money, MTN Money, Moov Money), . Des arrangements peuvent être faits pour les grandes commandes.",
    category: "Paiement",
    icon: <FiCreditCard />
  },
  {
    id: 3,
    question: "La livraison est-elle gratuite ?",
    answer: "Non, nous ne proposons pas de livraison gratuite. .",
    category: "Livraison",
    icon: <FiTruck />
  },
  {
    id: 4,
    question: "Puis-je venir voir les animaux avant d'acheter ?",
    answer: "Absolument ! Nous encourageons nos clients à venir visiter notre établissement pour voir les animaux avant de faire leur choix. Vous pouvez prendre rendez-vous pour une visite guidée. .",
    category: "Visites",
    icon: <FiMessageSquare />
  },
  {
    id: 5,
    question: "Vos animaux sont-ils certifiés halal ?",
    answer: "Oui, tous nos animaux sont certifiés halal par des autorités religieuses reconnues. Chaque animal est élevé selon les préceptes islamiques et vous recevrez un certificat de conformité halal avec chaque achat. Nos éleveurs respectent également les normes de bien-être animal.",
    category: "Certification",
    icon: <FiShield />
  },
  {
    id: 6,
    question: "Quelles sont les tailles de moutons disponibles ?",
    answer: "Nous proposons différentes tailles de moutons : Taille M (75x110 cm, 38-41kg), Taille J (80x117 cm, 40-43kg), et Taille L (90x130 cm, 50-55kg). Chaque taille est adaptée à différents besoins et budgets. Nos experts peuvent vous conseiller sur la taille idéale selon le nombre de personnes à nourrir.",
    category: "Produits",
    icon: <FiShoppingCart />
  },
  {
    id: 7,
    question: "Comment savoir si un mouton est de bonne qualité ?",
    answer: "Un mouton de qualité se reconnaît à plusieurs critères : une robe blanche et propre, des cornes bien développées et symétriques, un poids proportionnel à sa taille, des yeux vifs et vifs, et une bonne condition physique. Tous nos animaux sont sélectionnés selon ces critères et vérifiés par nos vétérinaires.",
    category: "Qualité",
    icon: <FiShield />
  },
  {
    id: 8,
    question: "Proposez-vous des garanties sur vos animaux ?",
    answer: "Oui, nous proposons une garantie de 5 jours sur tous nos animaux. Si un problème de santé est détecté dans les 5 jours suivant l'achat (hors cas de force majeure), nous nous engageons à trouver une solution adaptée. Nous garantissons également que tous nos animaux sont en parfaite santé au moment de la livraison.",
    category: "Garanties",
    icon: <FiShield />
  },
  {
    id: 9,
    question: "Puis-je réserver un mouton à l'avance pour Tabaski ?",
    answer: "Oui, et c'est même recommandé ! Vous pouvez réserver votre mouton jusqu'à 3 mois avant Tabaski. La réservation vous garantit la disponibilité du produit de votre choix et vous permet de bénéficier de nos meilleurs prix. Un acompte de 30% est requis pour confirmer la réservation. Et un tarif spécial est appliqué pour les réservations anticipées.",
    category: "Réservations",
    icon: <FiShoppingCart />
  },
  {
    id: 10,
    question: "Quels sont vos horaires d'ouverture ?",
    answer: "Nos horaires standards sont : Lundi - Vendredi : 08:00 - 18:00, Samedi : 08:00 - 14:00, Dimanche : Fermé. Cependant, en période de Tabaski (2 semaines avant la fête), nous ouvrons 7j/7 de 06:00 à 22:00 pour mieux vous servir. Notre service WhatsApp reste disponible 24/24.",
    category: "Service Client",
    icon: <FiMessageSquare />
  },
  {
    id: 11,
    question: "Proposez-vous des services d'abattage ?",
    answer: "Pour le moment non, mais nous travaillons à l'ouverture d'un service d'abattage professionnel dans les prochains mois.",
    category: "Services",
    icon: <FiShoppingCart />
  },
  {
    id: 12,
    question: "Comment savoir le poids exact d'un mouton ?",
    answer: "Tous nos animaux sont pesés régulièrement et nous garantissons le poids indiqué avec une marge de ±2kg. Au moment de la livraison, vous pouvez demander une pesée de contrôle. Nous utilisons des balances certifiées et vous fournissons un certificat de poids avec chaque animal.",
    category: "Produits",
    icon: <FiShoppingCart />
  }
]

const categories = Array.from(new Set(faqs.map(faq => faq.category)))

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')

  const toggleItem = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'Toutes' || faq.category === selectedCategory
    return matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#C8973A] to-[#B8852E] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">FAQ</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Questions fréquemment posées sur nos produits et services
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('Toutes')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === 'Toutes'
                    ? 'bg-[#C8973A] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Toutes ({faqs.length})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#C8973A] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({faqs.filter(faq => faq.category === category).length})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div 
                    key={faq.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        {faq.icon && (
                          <div className="text-[#C8973A] text-xl">
                            {faq.icon}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 pr-4">
                            {faq.question}
                          </h3>
                          <span className="inline-block mt-1 text-xs bg-[#C8973A]/20 text-[#C8973A] px-2 py-1 rounded-full">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 ml-4">
                        {expandedItems.includes(faq.id) ? (
                          <FiChevronUp className="text-xl" />
                        ) : (
                          <FiChevronDown className="text-xl" />
                        )}
                      </div>
                    </button>
                    
                    {expandedItems.includes(faq.id) && (
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <div className="pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FiMessageSquare className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Aucune question trouvée
                </h3>
                <p className="text-gray-600">
                  Essayez de modifier votre recherche ou de sélectionner une autre catégorie.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#C8973A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Notre équipe client est disponible pour répondre à toutes vos questions. N'hésitez pas à nous contacter !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-white text-[#C8973A] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <FiMessageSquare />
              <span>Contacter le support</span>
            </a>
            <a 
              href="https://wa.me/2250152041893"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-800 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-900 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">12+</div>
              <div className="text-gray-600">Questions répondues</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600">Catégories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support WhatsApp</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
