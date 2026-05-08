'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { FiArrowRight, FiFilter, FiGrid, FiList, FiStar, FiPlay } from 'react-icons/fi'
import { products as allProducts, Product } from '@/data/products'
import { useSearchParams } from 'next/navigation'

const sortOptions = [
  { id: 'name-asc', name: 'Nom (A-Z)' },
  { id: 'name-desc', name: 'Nom (Z-A)' },
  { id: 'price-asc', name: 'Prix croissant' },
  { id: 'price-desc', name: 'Prix décroissant' }
]

const viewModes = [
  { id: 'grid', name: 'Grille', icon: FiGrid },
  { id: 'list', name: 'Liste', icon: FiList }
]

function BoutiqueContent() {
  const searchParams = useSearchParams()
  const [activeSort, setActiveSort] = useState('name-asc')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<number[]>([])
  const [recommendationCategory, setRecommendationCategory] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])

  const sheepProducts = allProducts.filter(product => product.category === 'Mouton')

  const availableOrigins = [...new Set(sheepProducts.map(p => p.origin))]
  const countByOrigin = (originKey: string) => {
    const map: { [key: string]: string } = { 'cote-divoire': "Côte d'Ivoire", 'mali': 'Mali' }
    return sheepProducts.filter(p => p.origin === map[originKey]).length
  }

  useEffect(() => {
    const recommended = searchParams.get('recommended')
    const category = searchParams.get('category')
    
    if (recommended) {
      const productIds = recommended.split(',').map(id => parseInt(id)).filter(id => !isNaN(id))
      setRecommendedProducts(productIds)
      setRecommendationCategory(category || '')
      setShowRecommendations(true)
    }
  }, [searchParams])

  const resetFilters = () => {
    setPriceRange([0, 300000])
    setSelectedOrigin('')
    setSelectedAvailability('')
    setSelectedMedia([])
  }

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      const productPrice = parseInt(product.price.replace(/[^0-9]/g, ''))
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false

      if (selectedOrigin) {
        const originMap: { [key: string]: string } = {
          'cote-divoire': "Côte d'Ivoire",
          'mali': 'Mali'
        }
        if (product.origin !== originMap[selectedOrigin]) return false
      }

      if (selectedAvailability === 'en-stock' && product.stock !== 'En stock') return false
      if (selectedAvailability === 'reservation' && product.stock === 'En stock') return false

      if (selectedMedia.length > 0) {
        const mediaMatches = selectedMedia.some(media => {
          if (media === 'avec-photo') return !!product.image
          if (media === 'avec-video') return !!product.video
          if (media === 'video-uniquement') return !product.image && !!product.video
          return false
        })
        if (!mediaMatches) return false
      }

      return true
    })
  }

  const sortProducts = (products: Product[]) => {
    const sorted = [...products]
    switch (activeSort) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return sorted.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')))
      case 'price-desc':
        return sorted.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')))
      default:
        return sorted
    }
  }

  const filteredProducts = filterProducts(sheepProducts)
  const sortedProducts = sortProducts(filteredProducts)

  return (
    <div className="min-h-screen bg-[#FDF6E3]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Boutique</h1>
              <p className="text-gray-600 mt-2">Découvrez notre sélection de moutons de qualité pour Tabaski</p>
            </div>
            <span className="text-gray-600">
              {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* AI Recommendations Banner */}
      {showRecommendations && (
        <div className="bg-gradient-to-r from-[#C8973A]/10 to-[#F5F5DC]/10 border-b border-[#C8973A]/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#C8973A] rounded-full flex items-center justify-center">
                  <FiStar className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Vos Recommandations IA</h3>
                  <p className="text-sm text-gray-600">
                    {recommendationCategory && `${recommendationCategory} - `}
                    {recommendedProducts.length} mouton{recommendedProducts.length > 1 ? 's' : ''} sélectionné{recommendedProducts.length > 1 ? 's' : ''} pour vous
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowRecommendations(false)
                  window.history.pushState({}, '', '/produits')
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors text-xl"
              >
                ×
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedProducts.slice(0, 3).map(productId => {
                const product = sheepProducts.find(p => p.id === productId)
                if (!product) return null
                return (
                  <div key={productId} className="bg-white rounded-lg p-4 shadow-sm border border-[#C8973A]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                        <p className="text-[#C8973A] font-bold">{product.price}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-gray-600">{product.specifications.taille}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{product.origin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 text-gray-700 hover:text-[#C8973A] transition-colors"
            >
              <FiFilter />
              <span>Filtres</span>
            </button>

            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-600">Trier par:</label>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8973A]"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              {viewModes.map(mode => {
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`p-2 rounded-lg transition-colors ${viewMode === mode.id ? 'bg-[#C8973A] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    title={mode.name}
                  >
                    <Icon className="text-lg" />
                  </button>
                )
              })}
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-sm text-gray-600 hover:text-[#C8973A] hover:bg-gray-100 rounded-lg transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <div className={`${showFilters ? 'block' : 'hidden lg:block'} mt-4 pt-4 border-t border-gray-200`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Price Range */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget : {(priceRange[0] / 1000).toFixed(0)}k – {(priceRange[1] / 1000).toFixed(0)}k FCFA
                </label>
                <div className="space-y-2">
                  <input type="range" min="0" max="300000" step="10000" value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#C8973A]"
                  />
                  <div className="flex items-center space-x-2">
                    <input type="number" placeholder="Min" value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8973A] text-sm"
                    />
                    <span className="text-gray-500">–</span>
                    <input type="number" placeholder="Max" value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 300000])}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8973A] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origine</label>
                <select value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8973A] text-sm"
                >
                  <option value="">Toutes ({sheepProducts.length})</option>
                  {availableOrigins.includes("Côte d'Ivoire") && (
                    <option value="cote-divoire">🇨🇮 Côte d'Ivoire ({countByOrigin('cote-divoire')})</option>
                  )}
                  {availableOrigins.includes('Mali') && (
                    <option value="mali">🇲🇱 Mali ({countByOrigin('mali')})</option>
                  )}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilité</label>
                <div className="space-y-2">
                  {[
                    { id: 'en-stock', label: 'En stock', count: sheepProducts.filter(p => p.stock === 'En stock').length },
                    { id: 'reservation', label: 'Sur réservation', count: sheepProducts.filter(p => p.stock !== 'En stock').length }
                  ].map(av => (
                    <label key={av.id} className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${av.count === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="availability"
                          checked={selectedAvailability === av.id}
                          disabled={av.count === 0}
                          onClick={() => setSelectedAvailability(selectedAvailability === av.id ? '' : av.id)}
                          onChange={() => {}}
                          className="w-4 h-4 accent-[#C8973A]"
                        />
                        <span className="text-sm font-medium text-gray-700">{av.label}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{av.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Media filter */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">Type de média</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'avec-photo', label: '📷 Avec photo', count: sheepProducts.filter(p => !!p.image).length },
                  { id: 'avec-video', label: '🎥 Avec vidéo', count: sheepProducts.filter(p => !!p.video).length },
                  { id: 'video-uniquement', label: '🎬 Vidéo uniquement', count: sheepProducts.filter(p => !p.image && !!p.video).length }
                ].map(media => (
                  <label key={media.id} className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all cursor-pointer select-none ${
                    selectedMedia.includes(media.id)
                      ? 'border-[#C8973A] bg-[#FDF6E3] text-[#C8973A]'
                      : media.count === 0
                        ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 hover:border-[#C8973A]/50 text-gray-700'
                  }`}>
                    <input type="checkbox"
                      checked={selectedMedia.includes(media.id)}
                      disabled={media.count === 0}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedMedia([...selectedMedia, media.id])
                        else setSelectedMedia(selectedMedia.filter(m => m !== media.id))
                      }}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{media.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                      selectedMedia.includes(media.id) ? 'bg-[#C8973A] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>{media.count}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {product.image ? (
                    <div className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url('${product.image}')`, backgroundColor: '#f3f4f6' }}
                    ></div>
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center space-y-2">
                      <FiPlay className="text-white text-4xl" />
                      <span className="text-white text-xs font-medium">Vidéo disponible</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white px-1.5 py-0.5 rounded-full text-lg">
                    {product.origin === "Côte d'Ivoire" ? '🇨🇮' : '🇲🇱'}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#C8973A] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.stock}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-[#C8973A] transition-colors">{product.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-[#C8973A]">{product.price}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex justify-between"><span>Taille:</span><span>{product.specifications.taille}</span></div>
                    <div className="flex justify-between"><span>Poids:</span><span>{product.specifications.poids}</span></div>
                  </div>
                  <a href={`/produits/${product.id}`}
                    className="w-full bg-[#C8973A] hover:bg-[#D4A763] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Voir les détails</span>
                    <FiArrowRight className="text-sm" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <div className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${product.image}')`, backgroundColor: '#f3f4f6' }}
                      ></div>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center space-y-2">
                        <FiPlay className="text-white text-4xl" />
                        <span className="text-white text-xs font-medium">Vidéo disponible</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Origine: {product.origin}</span>
                          <span>Stock: {product.stock}</span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#C8973A]">{product.price}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div><span className="text-sm text-gray-500">Taille</span><p className="font-medium text-gray-800">{product.specifications.taille}</p></div>
                      <div><span className="text-sm text-gray-500">Âge</span><p className="font-medium text-gray-800">{product.specifications.age}</p></div>
                      <div><span className="text-sm text-gray-500">Poids</span><p className="font-medium text-gray-800">{product.specifications.poids}</p></div>
                      <div><span className="text-sm text-gray-500">Catégorie</span><p className="font-medium text-gray-800">{product.specifications.categorie}</p></div>
                    </div>
                    <a href={`/produits/${product.id}`}
                      className="inline-flex items-center space-x-2 bg-[#C8973A] hover:bg-[#B8852E] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      <span>Voir les détails</span>
                      <FiArrowRight />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <FiFilter className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos filtres pour voir plus de résultats.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ✅ Export principal avec Suspense
export default function BoutiquePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8973A] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <BoutiqueContent />
    </Suspense>
  )
}