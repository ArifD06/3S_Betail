'use client'

import React from 'react'
import { FiAward, FiHeart, FiCheckCircle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <FiAward className="text-3xl text-[#C8973A]" />,
    title: 'Prestige Garanti',
    description: 'Des bêtes sélectionnées avec le plus grand soin.'
  },
  {
    icon: <FiHeart className="text-3xl text-[#C8973A]" />,
    title: 'Santé & Bien-être',
    description: 'Encadrement vétérinaire et alimentation naturelle.'
  },
  {
    icon: <FiCheckCircle className="text-3xl text-[#C8973A]" />,
    title: 'Achat Serein',
    description: 'Paiement à la livraison ou par mobile money.'
  }
]

export default function WhyChooseUs() {
  const router = useRouter()

  const handleCatalogClick = () => {
    router.push('/produits')
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Pourquoi choisir Tabaski. ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#F5F5DC] rounded-full inline-block group-hover:bg-[#E5D5B7] transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#C8973A] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleCatalogClick}
            className="bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3"
          >
            <span>Découvrir le Catalogue Complet</span>
            <FiCheckCircle className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  )
}
