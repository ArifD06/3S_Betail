'use client'

import React, { useState, useEffect } from 'react'
import { FiArrowRight, FiFilter, FiGrid, FiList, FiStar } from 'react-icons/fi'
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

export default function BoutiquePage() {
  const searchParams = useSearchParams()
  const [activeSort, setActiveSort] = useState('name-asc')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<number[]>([])
  const [recommendationCategory, setRecommendationCategory] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  
  // Filter states
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Handle recommendations from quiz
  useEffect(() => {
    const recommended = searchParams.get('recommended')
    const category = searchParams.get('category')
    
    if (recommended) {
      const productIds = recommended.split(',').map(id => parseInt(id)).filter(id => !isNaN(id))
      setRecommendedProducts(productIds)
      setRecommendationCategory(category || '')
      setShowRecommendations(true)
      
      // Auto-filter to show only recommended products
      const recommendedProductList = sheepProducts.filter(product => productIds.includes(product.id))
      // You could update the filtered products here if needed
    }
  }, [searchParams])

  // Reset filters
  const resetFilters = () => {
    setPriceMin('')
    setPriceMax('')
    setPriceRange([0, 200000])
    setSelectedOrigin('')
    setSelectedCategory('')
    setSelectedSizes([])
    setSelectedAvailability('')
    setSelectedTags([])
  }

  // Filtrer uniquement les moutons
  const sheepProducts = allProducts.filter(product => product.category === 'Mouton')

  // Fonction de filtrage
  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      // Filtre de prix avec slider
      const productPrice = parseInt(product.price.replace(/[^0-9]/g, ''))
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false
      
      // Filtre d'origine
      if (selectedOrigin) {
        const originMap: { [key: string]: string } = {
          'cote-divoire': 'Côte d\'Ivoire',
          'mali': 'Mali'
        }
        if (product.origin !== originMap[selectedOrigin]) return false
      }
      
      // Filtre de catégorie
      if (selectedCategory) {
        if (product.specifications.categorie.toLowerCase() !== selectedCategory) return false
      }
      
      // Filtre par taille
      if (selectedSizes.length > 0) {
        const taille = product.specifications.taille.toLowerCase()
        const sizeMatches = selectedSizes.some(size => {
          switch(size) {
            case 's': return taille.includes('75') || taille.includes('m')
            case 'm': return taille.includes('80') || taille.includes('j')
            case 'l': return taille.includes('85') || taille.includes('l')
            case 'xl': return taille.includes('90') || taille.includes('xl')
            default: return false
          }
        })
        if (!sizeMatches) return false
      }
      
      // Filtre par disponibilité
      if (selectedAvailability) {
        if (selectedAvailability === 'en-stock' && product.stock !== 'En stock') return false
        if (selectedAvailability === 'reservation' && product.stock !== 'En stock') return false
      }
      
      // Filtre par tags
      if (selectedTags.length > 0) {
        const productTags: string[] = []
        if (product.specifications.categorie.includes('Extra')) productTags.push('extra')
        if (product.specifications.categorie.includes('Premium')) productTags.push('premium')
        if (product.specifications.categorie.includes('Standard')) productTags.push('standard')
        if (product.characteristics.some(char => char.includes('pure') || char.includes('certifi'))) productTags.push('race-pure')
        
        const tagMatches = selectedTags.some(tag => productTags.includes(tag))
        if (!tagMatches) return false
      }
      
      return true
    })
  }

  // Fonction de tri
  const sortProducts = (products: Product[]) => {
    const sorted = [...products]
    switch (activeSort) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
          return priceA - priceB
        })
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
          return priceB - priceA
        })
      default:
        return sorted
    }
  }

  // Appliquer les filtres puis le tri
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
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
              </span>
            </div>
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
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            
            {/* Recommended Products Preview */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedProducts.slice(0, 3).map(productId => {
                const product = sheepProducts.find(p => p.id === productId)
                if (!product) return null
                
                return (
                  <div key={productId} className="bg-white rounded-lg p-4 shadow-sm border border-[#C8973A]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${product.image}')` }}
                        ></div>
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
            {/* Filters Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 text-gray-700 hover:text-[#C8973A] transition-colors"
            >
              <FiFilter />
              <span>Filtres</span>
            </button>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-600">Trier par:</label>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8973A]"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              {viewModes.map(mode => {
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === mode.id
                        ? 'bg-[#C8973A] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={mode.name}
                  >
                    <Icon className="text-lg" />
                  </button>
                )
              })}
              
              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-sm text-gray-600 hover:text-[#C8973A] hover:bg-gray-100 rounded-lg transition-colors"
                title="Réinitialiser les filtres"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {(showFilters || true) && (
            <div className={`${showFilters ? 'block' : 'hidden lg:block'} mt-4 pt-4 border-t border-gray-200`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Price Range */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fourchette de prix: {(priceRange[0] / 1000).toFixed(0)}k - {(priceRange[1] / 1000).toFixed(0)}k FCFA
                  </label>
                  <div className="space-y-4">
                    {/* Custom Slider */}
                    <div className="relative">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">0k</span>
                        <div className="flex-1 relative">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-[#C8973A] rounded-full relative"
                              style={{
                                width: `${((priceRange[1] - priceRange[0]) / 200000) * 100}%`,
                                left: `${(priceRange[0] / 200000) * 100}%`,
                                position: 'absolute'
                              }}
                            ></div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="200000"
                            step="10000"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                            style={{
                              left: 0,
                              zIndex: priceRange[0] > priceRange[1] - 20000 ? 3 : 1
                            }}
                          />
                          <input
                            type="range"
                            min="0"
                            max="200000"
                            step="10000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                            style={{
                              left: 0,
                              zIndex: priceRange[1] - priceRange[0] < 20000 ? 3 : 2
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">200k</span>
                      </div>
                    </div>
                    
                    {/* Price Inputs */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Origin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origine
                  </label>
                  <select 
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Toutes les origines</option>
                    <option value="cote-divoire">Côte d'Ivoire</option>
                    <option value="mali">Mali</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Toutes les catégories</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="extra">Extra</option>
                  </select>
                </div>
              </div>

              {/* Advanced Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                {/* Size Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 's', label: 'S (75x110 cm)', desc: 'Petit format' },
                      { id: 'm', label: 'M (80x117 cm)', desc: 'Format standard' },
                      { id: 'l', label: 'L (85x125 cm)', desc: 'Grand format' },
                      { id: 'xl', label: 'XL (90x130 cm)', desc: 'Très grand' }
                    ].map(size => (
                      <label key={size.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSizes([...selectedSizes, size.id])
                            } else {
                              setSelectedSizes(selectedSizes.filter(s => s !== size.id))
                            }
                          }}
                          className="w-4 h-4 text-[#C8973A] border-gray-300 rounded focus:ring-[#C8973A]"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-700">{size.label}</span>
                          <span className="text-xs text-gray-500 block">{size.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disponibilité
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'en-stock', label: 'En stock', color: 'green' },
                      { id: 'reservation', label: 'Réservation possible', color: 'yellow' }
                    ].map(availability => (
                      <label key={availability.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="availability"
                          checked={selectedAvailability === availability.id}
                          onChange={(e) => setSelectedAvailability(e.target.checked ? availability.id : '')}
                          className="w-4 h-4 text-[#C8973A] border-gray-300 focus:ring-[#C8973A]"
                        />
                        <span className="text-sm font-medium text-gray-700">{availability.label}</span>
                        <span className={`w-2 h-2 rounded-full bg-${availability.color}-500`}></span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caractéristiques
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'extra', label: 'Extra Qualité', icon: '⭐' },
                      { id: 'premium', label: 'Premium', icon: '👑' },
                      { id: 'race-pure', label: 'Race Pure', icon: '🏆' },
                      { id: 'standard', label: 'Standard', icon: '✓' }
                    ].map(tag => (
                      <label key={tag.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTags([...selectedTags, tag.id])
                            } else {
                              setSelectedTags(selectedTags.filter(t => t !== tag.id))
                            }
                          }}
                          className="w-4 h-4 text-[#C8973A] border-gray-300 rounded focus:ring-[#C8973A]"
                        />
                        <span className="text-lg">{tag.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{tag.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
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
                  
                  {/* Specifications */}
                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Taille:</span>
                      <span>{product.specifications.taille}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Poids:</span>
                      <span>{product.specifications.poids}</span>
                    </div>
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
        ) : (
          // List View
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <div 
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${product.image}')`,
                        backgroundColor: '#f3f4f6'
                      }}
                    ></div>
                  </div>
                  
                  {/* Product Info */}
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
                    
                    {/* Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Taille</span>
                        <p className="font-medium text-gray-800">{product.specifications.taille}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Âge</span>
                        <p className="font-medium text-gray-800">{product.specifications.age}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Poids</span>
                        <p className="font-medium text-gray-800">{product.specifications.poids}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Catégorie</span>
                        <p className="font-medium text-gray-800">{product.specifications.categorie}</p>
                      </div>
                    </div>
                    
                    <a 
                      href={`/produits/${product.id}`}
                      className="inline-flex items-center space-x-2 bg-[#C8973A] hover:bg-[#B8852E] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
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

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FiFilter className="text-6xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos filtres pour voir plus de résultats.</p>
          </div>
        )}
      </div>
    </div>
  )
}
