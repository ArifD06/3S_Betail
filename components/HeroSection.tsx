'use client'

import React, { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { products } from '@/data/products'

export default function HeroSection() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [availableCount, setAvailableCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      title: "Moutons Premium - Qualité Supérieure",
      description: "Découvrez notre sélection de moutons Ladoum et Sahéliens, élevés dans les meilleures conditions pour Tabaski 2026.",
      buttonText: "Voir les produits premium",
      bgImage: "/images/WhatsApp Image 2026-04-19 at 12.39.42 (1).jpeg",
      badge: "Premium"
    },
    {
      title: "Moutons du Sahel - Tradition Authentique",
      description: "Des moutons robustes et sains, parfaitement adaptés aux traditions de Tabaski, disponibles en plusieurs tailles.",
      buttonText: "Explorer la collection",
      bgImage: "/images/WhatsApp Image 2026-04-19 at 12.39.42.jpeg",
      badge: "Tradition"
    },
    {
      title: "Élevage Malien - Excellence Garantie",
      description: "Nos moutons du Mali sont réputés pour leur qualité exceptionnelle et leur robe impeccable, idéaux pour vos célébrations.",
      buttonText: "Découvrir nos races",
      bgImage: "/images/WhatsApp Image 2026-04-19 at 12.39.42 (2).jpeg",
      badge: "Import"
    },
    {
      title: "Géants Sahéliens - Taille XXL",
      description: "Spécimens exceptionnels de grande taille, parfaits pour marquer vos célébrations avec prestige et distinction.",
      buttonText: "Voir les tailles XL",
      bgImage: "/images/WhatsApp Image 2026-04-19 at 12.39.43.jpeg",
      badge: "XXL"
    }
  ]

  useEffect(() => {
    // Calculer le nombre de moutons disponibles
    const inStockProducts = products.filter(product => product.stock === 'En stock')
    setAvailableCount(inStockProducts.length)
  }, [])

  // Navigation automatique avec pause au survol
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleReservationClick = () => {
    router.push('/produits')
  }

  return (
    <section 
      className="relative h-[600px] md:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image avec overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#C8973A]/20 to-black/40 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${slides[currentSlide].bgImage}')`,
          backgroundColor: '#f3f4f6' // Couleur de fond temporaire
        }}
      ></div>

      {/* Contenu */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Badge et compteur */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <span className="inline-block bg-[#C8973A]/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                {slides[currentSlide].badge}
              </span>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiShoppingBag className="text-white text-lg" />
                <span className="text-white font-semibold">
                  {availableCount} moutons disponibles
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              {slides[currentSlide].description}
            </p>
            
            {/* Bouton de réservation */}
            <button 
              onClick={handleReservationClick}
              className="bg-[#C8973A] hover:bg-[#D4A763] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 group shadow-lg"
            >
              <span>{slides[currentSlide].buttonText}</span>
              <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Contrôles de navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Slide précédent"
      >
        <FiChevronLeft className="text-2xl" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Slide suivant"
      >
        <FiChevronRight className="text-2xl" />
      </button>

      {/* Indicateurs de slides */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[#C8973A] w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  )
}
