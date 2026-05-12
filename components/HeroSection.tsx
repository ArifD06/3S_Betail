'use client'

import React, { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { products } from '@/data/products'

const slides = [
  {
    title: "Moutons du Burkina Faso",
    description: "Des moutons robustes et bien nourris, sélectionnés avec soin pour votre Tabaski 2026. Qualité garantie, livraison sur Abidjan.",
    buttonText: "Voir le catalogue",
    bgImage: "/images/WhatsApp Image 2026-05-08 at 15.54.36.jpeg",
    badge: "🇧🇫 Burkina Faso"
  },
  {
    title: "Moutons du Niger — Tradition Sahélienne",
    description: "Des spécimens authentiques du Niger, élevés dans les meilleures conditions. Robustes, sains et prêts pour la fête.",
    buttonText: "Découvrir la collection",
    bgImage: "/images/WhatsApp Image 2026-05-12 at 21.57.29.jpeg",
    badge: "🇳🇪 Niger"
  },
  {
    title: "Choisissez Votre Mouton Idéal",
    description: "Parcourez notre sélection de moutons en photo réelle. Ce que vous voyez est exactement ce que vous recevez.",
    buttonText: "Explorer la boutique",
    bgImage: "/images/WhatsApp Image 2026-05-08 at 15.54.22.jpeg",
    badge: "📷 Photos réelles"
  },
  {
    title: "Livraison sur Abidjan",
    description: "Commandez votre mouton en ligne et recevez-le directement chez vous. Paiement flexible, service de confiance.",
    buttonText: "Commander maintenant",
    bgImage: "/images/WhatsApp Image 2026-05-12 at 21.57.41.jpeg",
    badge: "🚚 Livraison disponible"
  }
]

export default function HeroSection() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlideIndex, setPrevSlideIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const availableCount = products.filter(p => p.stock === 'En stock').length

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) goNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, currentSlide])

  const goTo = (index: number) => {
    setPrevSlideIndex(currentSlide)
    setCurrentSlide(index)
    setTimeout(() => setPrevSlideIndex(null), 700)
  }

  const goNext = () => goTo((currentSlide + 1) % slides.length)
  const goPrev = () => goTo((currentSlide - 1 + slides.length) % slides.length)

  return (
    <section
      className="relative h-[600px] md:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides empilés avec transition fade */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 2 : index === prevSlideIndex ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.bgImage}')`, backgroundColor: '#1a1a1a' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Contenu */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Badge + compteur */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="bg-[#C8973A] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                {slides[currentSlide].badge}
              </span>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                <FiShoppingBag className="text-white" />
                <span className="text-white text-sm font-medium">{availableCount} moutons disponibles</span>
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="text-lg text-white/85 mb-8 leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* CTA */}
            <button
              onClick={() => router.push('/produits')}
              className="bg-[#C8973A] hover:bg-[#D4A763] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3 group shadow-lg"
            >
              <span>{slides[currentSlide].buttonText}</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Flèches */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Slide précédent"
      >
        <FiChevronLeft className="text-2xl" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Slide suivant"
      >
        <FiChevronRight className="text-2xl" />
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#C8973A] w-8' : 'bg-white/50 hover:bg-white/70 w-2.5'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
