'use client'

import React, { useState } from 'react'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import { products as allProducts } from '@/data/products'

const flagOf = (flag: string) =>
  flag === 'Burkina Faso' ? '🇧🇫' : flag === 'Niger' ? '🇳🇪' : flag === "Côte d'Ivoire" ? '🇨🇮' : '🇲🇱'

const origins = ['Tous', ...Array.from(new Set(allProducts.map(p => p.origin.trim())))]

export default function FeaturedProducts() {
  const [activeOrigin, setActiveOrigin] = useState('Tous')

  const products = (activeOrigin === 'Tous'
    ? allProducts
    : allProducts.filter(p => p.origin.trim() === activeOrigin)
  ).slice(0, 4)

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* En-tête */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#C8973A]/10 text-[#C8973A] text-sm font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
            Sélection du moment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Produits vedettes</h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base max-w-md mx-auto">
            Des moutons soigneusement sélectionnés, en photo réelle, livrables sur Abidjan.
          </p>
        </div>

        {/* Onglets par origine */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {origins.map(origin => (
            <button
              key={origin}
              onClick={() => setActiveOrigin(origin)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeOrigin === origin
                  ? 'bg-[#C8973A] text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {origin === 'Tous' ? '🐑 Tous' : `${flagOf(origin)} ${origin}`}
            </button>
          ))}
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/produits/${product.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 bg-gray-100 overflow-hidden flex-shrink-0">
                {product.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-sm">Photo non disponible</span>
                  </div>
                )}

                {/* Gradient bas */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Drapeau */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-base px-2 py-1 rounded-full shadow-sm">
                  {flagOf(product.flag)}
                </div>

                {/* Badge stock */}
                <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${
                  product.stock === 'En stock'
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-400 text-white'
                }`}>
                  {product.stock}
                </div>

                {/* Nom sur l'image */}
                <p className="absolute bottom-2 left-3 text-white text-sm font-semibold drop-shadow">
                  {product.name}
                </p>
              </div>

              {/* Infos */}
              <div className="p-4 flex flex-col flex-1">
                {/* Origine */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <FiMapPin className="flex-shrink-0" />
                  <span>{product.origin.trim()}</span>
                  <span className="mx-1">·</span>
                  <span>{product.specifications.poids}</span>
                  <span className="mx-1">·</span>
                  <span>{product.specifications.taille}</span>
                </div>

                {/* Prix */}
                <p className="text-[#C8973A] font-bold text-lg leading-tight mb-4">
                  {product.price}
                </p>

                {/* Bouton */}
                <div className="mt-auto flex items-center justify-between bg-[#C8973A]/10 group-hover:bg-[#C8973A] rounded-xl px-4 py-2.5 transition-all duration-300">
                  <span className="text-sm font-semibold text-[#C8973A] group-hover:text-white transition-colors">
                    Voir les détails
                  </span>
                  <FiArrowRight className="text-[#C8973A] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Message si aucun produit */}
        {products.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Aucun produit disponible pour cette origine.
          </div>
        )}

        {/* Voir plus */}
        <div className="flex justify-center mt-12">
          <a
            href="/produits"
            className="group flex items-center space-x-2 border-2 border-[#C8973A] text-[#C8973A] hover:bg-[#C8973A] hover:text-white font-semibold py-3 px-10 rounded-xl transition-all duration-300"
          >
            <span>Voir tout le catalogue</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
