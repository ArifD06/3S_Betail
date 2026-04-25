'use client'

import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { products as allProducts, Product } from '@/data/products'

const tabs = [
  { id: 'recent', name: 'Récemment ajoutés', active: true },
  { id: 'popular', name: 'Les plus commandés', active: false },
  { id: 'special', name: 'Offre Spécial', active: false }
]

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('recent')

  // Filtrer les produits selon l'onglet actif
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'recent':
        return allProducts.slice(0, 4) // 4 produits les plus récents
      case 'popular':
        return allProducts.slice(0, 4) // Simuler les plus populaires
      case 'special':
        return allProducts.filter(p => p.specifications.categorie === 'Premium' || p.specifications.categorie === 'Extra Large')
      default:
        return allProducts.slice(0, 4)
    }
  }

  const products = getFilteredProducts()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Produits vedettes</h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-200 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#C8973A] text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${product.image}')`,
                    backgroundColor: '#f3f4f6' // Couleur de fond temporaire
                  }}
                ></div>
                {/* Country Flag */}
                <div className="absolute top-3 left-3 bg-white px-1.5 py-0.5 rounded-full text-lg">
                  {product.flag === 'Côte d\'Ivoire' ? '🇨🇮' : '🇲🇱'}
                </div>
                {/* Stock Badge */}
                <div className="absolute top-3 right-3 bg-[#C8973A] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.stock}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-[#C8973A] transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#C8973A]">{product.price}</span>
                </div>
                
                {/* View Details Button */}
                <a 
                  href={`/produits/${product.id}`}
                  className="w-full bg-[#C8973A] hover:bg-[#D4A763] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Voir les détails</span>
                  <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
