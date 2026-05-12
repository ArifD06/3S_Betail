'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { FiArrowRight, FiFilter, FiGrid, FiList, FiStar, FiX, FiMapPin, FiRefreshCw } from 'react-icons/fi'
import { products as allProducts, Product } from '@/data/products'
import { useSearchParams } from 'next/navigation'

const sortOptions = [
  { id: 'name-asc',   name: 'Nom (A–Z)' },
  { id: 'name-desc',  name: 'Nom (Z–A)' },
  { id: 'price-asc',  name: 'Prix croissant' },
  { id: 'price-desc', name: 'Prix décroissant' }
]

const flagOf = (origin: string) =>
  origin.trim() === 'Burkina Faso' ? '🇧🇫'
  : origin.trim() === 'Niger' ? '🇳🇪'
  : origin.trim() === "Côte d'Ivoire" ? '🇨🇮'
  : '🇲🇱'

function BoutiqueContent() {
  const searchParams = useSearchParams()
  const [activeSort, setActiveSort]         = useState('name-asc')
  const [viewMode, setViewMode]             = useState('grid')
  const [showFilters, setShowFilters]       = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<number[]>([])
  const [recommendationCategory, setRecommendationCategory] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [priceRange, setPriceRange]         = useState([0, 300000])
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const [selectedTailles, setSelectedTailles] = useState<string[]>([])

  const sheepProducts    = allProducts.filter(p => p.category === 'Mouton')
  const availableOrigins = [...new Set(sheepProducts.map(p => p.origin))]

  const countByOrigin = (key: string) => {
    const map: Record<string, string> = { 'burkina-faso': 'Burkina Faso', 'niger': 'Niger', 'cote-divoire': "Côte d'Ivoire" }
    return sheepProducts.filter(p => p.origin.trim() === map[key]).length
  }
  const countByTaille = (t: string) => sheepProducts.filter(p => p.specifications.taille === t).length

  useEffect(() => {
    const recommended = searchParams.get('recommended')
    const category    = searchParams.get('category')
    if (recommended) {
      setRecommendedProducts(recommended.split(',').map(Number).filter(n => !isNaN(n)))
      setRecommendationCategory(category || '')
      setShowRecommendations(true)
    }
  }, [searchParams])

  const resetFilters = () => {
    setPriceRange([0, 300000])
    setSelectedOrigin('')
    setSelectedAvailability('')
    setSelectedTailles([])
  }

  const hasActiveFilters = selectedOrigin || selectedAvailability || selectedTailles.length > 0 || priceRange[1] < 300000

  const filterProducts = (products: Product[]) => products.filter(product => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ''))
    if (price < priceRange[0] || price > priceRange[1]) return false
    if (selectedOrigin) {
      const map: Record<string, string> = { 'burkina-faso': 'Burkina Faso', 'niger': 'Niger', 'cote-divoire': "Côte d'Ivoire" }
      if (product.origin.trim() !== map[selectedOrigin]) return false
    }
    if (selectedAvailability === 'en-stock'    && product.stock !== 'En stock') return false
    if (selectedAvailability === 'reservation' && product.stock === 'En stock') return false
    if (selectedTailles.length > 0 && !selectedTailles.includes(product.specifications.taille)) return false
    return true
  })

  const sortProducts = (products: Product[]) => {
    const s = [...products]
    if (activeSort === 'name-asc')   return s.sort((a, b) => a.name.localeCompare(b.name))
    if (activeSort === 'name-desc')  return s.sort((a, b) => b.name.localeCompare(a.name))
    if (activeSort === 'price-asc')  return s.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')))
    if (activeSort === 'price-desc') return s.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')))
    return s
  }

  const sortedProducts = sortProducts(filterProducts(sheepProducts))

  return (
    <div className="min-h-screen bg-[#FDF6E3]">

      {/* ── Hero header ── */}
      <div className="bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <p className="text-[#C8973A] text-sm font-semibold uppercase tracking-widest mb-2">
            Tabaski 2026
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Notre Boutique</h1>
          <p className="text-white/60 text-sm md:text-base max-w-lg">
            Découvrez notre sélection de moutons du Burkina Faso et du Niger — photos réelles, livraison sur Abidjan.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
              🐑 {sheepProducts.filter(p => p.stock === 'En stock').length} moutons disponibles
            </span>
            <span className="bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
              📷 Photos 100% réelles
            </span>
            <span className="bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
              🚚 Livraison Abidjan
            </span>
          </div>
        </div>
      </div>

      {/* ── Bandeau recommandations IA ── */}
      {showRecommendations && (
        <div className="bg-[#C8973A]/10 border-b border-[#C8973A]/20">
          <div className="container mx-auto px-4 py-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C8973A] rounded-full flex items-center justify-center">
                  <FiStar className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Vos Recommandations IA</h3>
                  <p className="text-xs text-gray-500">
                    {recommendationCategory && `${recommendationCategory} · `}
                    {recommendedProducts.length} mouton{recommendedProducts.length > 1 ? 's' : ''} sélectionné{recommendedProducts.length > 1 ? 's' : ''} pour vous
                  </p>
                </div>
              </div>
              <button onClick={() => { setShowRecommendations(false); window.history.pushState({}, '', '/produits') }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {recommendedProducts.slice(0, 3).map(id => {
                const p = sheepProducts.find(x => x.id === id)
                if (!p) return null
                return (
                  <div key={id} className="bg-white rounded-xl p-3 shadow-sm border border-[#C8973A]/20 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100"
                      style={{ backgroundImage: `url('${p.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{p.name}</p>
                      <p className="text-[#C8973A] font-bold text-sm truncate">{p.price}</p>
                      <p className="text-xs text-gray-400">{p.specifications.taille} · {p.origin.trim()}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Barre de contrôles ── */}
      <div className="bg-white border-b border-gray-200 sticky top-[64px] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">

            {/* Gauche : filtres + compteur */}
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  showFilters || hasActiveFilters
                    ? 'border-[#C8973A] bg-[#C8973A]/5 text-[#C8973A]'
                    : 'border-gray-200 text-gray-600 hover:border-[#C8973A]/50 hover:text-[#C8973A]'
                }`}>
                <FiFilter className="text-base" />
                <span>Filtres</span>
                {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#C8973A]" />}
              </button>
              <span className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{sortedProducts.length}</span> résultat{sortedProducts.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Droite : tri + vue */}
            <div className="flex items-center gap-2">
              <select value={activeSort} onChange={e => setActiveSort(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8973A] bg-white">
                {sortOptions.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                {[{ id: 'grid', icon: FiGrid }, { id: 'list', icon: FiList }].map(({ id, icon: Icon }) => (
                  <button key={id} onClick={() => setViewMode(id)}
                    className={`p-2.5 transition-colors ${viewMode === id ? 'bg-[#C8973A] text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                    <Icon className="text-base" />
                  </button>
                ))}
              </div>
              {hasActiveFilters && (
                <button onClick={resetFilters}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#C8973A] px-3 py-2 rounded-xl hover:bg-gray-50 transition-all">
                  <FiRefreshCw className="text-sm" />
                  <span className="hidden sm:inline">Réinitialiser</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Panneau de filtres ── */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Budget */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Budget</p>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {(priceRange[0] / 1000).toFixed(0)}k – {(priceRange[1] / 1000).toFixed(0)}k FCFA
                </p>
                <input type="range" min="0" max="300000" step="10000" value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-[#C8973A] mb-3" />
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={priceRange[0]}
                    onChange={e => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8973A]" />
                  <span className="text-gray-300">–</span>
                  <input type="number" placeholder="Max" value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value) || 300000])}
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8973A]" />
                </div>
              </div>

              {/* Origine + Disponibilité */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Origine</p>
                  <select value={selectedOrigin} onChange={e => setSelectedOrigin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8973A]">
                    <option value="">Toutes ({sheepProducts.length})</option>
                    {availableOrigins.some(o => o.trim() === 'Burkina Faso') && <option value="burkina-faso">🇧🇫 Burkina Faso ({countByOrigin('burkina-faso')})</option>}
                    {availableOrigins.some(o => o.trim() === 'Niger')         && <option value="niger">🇳🇪 Niger ({countByOrigin('niger')})</option>}
                    {availableOrigins.some(o => o.trim() === "Côte d'Ivoire") && <option value="cote-divoire">🇨🇮 Côte d'Ivoire ({countByOrigin('cote-divoire')})</option>}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Disponibilité</p>
                  <div className="space-y-1">
                    {[
                      { id: 'en-stock', label: 'En stock', count: sheepProducts.filter(p => p.stock === 'En stock').length },
                      { id: 'reservation', label: 'Sur réservation', count: sheepProducts.filter(p => p.stock !== 'En stock').length }
                    ].map(av => (
                      <label key={av.id} className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        av.count === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="availability" checked={selectedAvailability === av.id} disabled={av.count === 0}
                            onClick={() => setSelectedAvailability(selectedAvailability === av.id ? '' : av.id)}
                            onChange={() => {}} className="accent-[#C8973A]" />
                          <span className="text-sm text-gray-700">{av.label}</span>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{av.count}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Taille */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Taille</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'Petit', label: '🐑 Petit',  desc: '< 35 kg' },
                    { id: 'Moyen', label: '🐏 Moyen',  desc: '35–50 kg' },
                    { id: 'Grand', label: '🦣 Grand',  desc: '> 50 kg' }
                  ].map(t => {
                    const count  = countByTaille(t.id)
                    const active = selectedTailles.includes(t.id)
                    return (
                      <label key={t.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 cursor-pointer select-none transition-all ${
                        active ? 'border-[#C8973A] bg-[#C8973A]/5 text-[#C8973A]'
                        : count === 0 ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 hover:border-[#C8973A]/40 text-gray-700'}`}>
                        <input type="checkbox" checked={active} disabled={count === 0} className="sr-only"
                          onChange={e => {
                            if (e.target.checked) setSelectedTailles([...selectedTailles, t.id])
                            else setSelectedTailles(selectedTailles.filter(x => x !== t.id))
                          }} />
                        <span className="text-sm font-semibold">{t.label}</span>
                        <span className="text-xs text-gray-400 hidden sm:inline">{t.desc}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${active ? 'bg-[#C8973A] text-white' : 'bg-gray-100 text-gray-500'}`}>{count}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Grille / Liste ── */}
      <div className="container mx-auto px-4 py-8">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🐑</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun mouton trouvé</h3>
            <p className="text-gray-500 mb-6">Essayez de modifier vos filtres.</p>
            <button onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-[#C8973A] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#B8852E] transition-colors">
              <FiRefreshCw /> Réinitialiser les filtres
            </button>
          </div>
        ) : viewMode === 'grid' ? (

          /* ── Vue grille ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortedProducts.map(product => (
              <a key={product.id} href={`/produits/${product.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col">

                {/* Image */}
                <div className="relative h-56 bg-gray-100 overflow-hidden flex-shrink-0">
                  {product.image ? (
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${product.image}')` }} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">Photo non disponible</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-base px-2 py-1 rounded-full shadow-sm">
                    {flagOf(product.origin)}
                  </div>
                  <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${
                    product.stock === 'En stock' ? 'bg-green-500 text-white' : 'bg-orange-400 text-white'}`}>
                    {product.stock}
                  </span>
                  <p className="absolute bottom-2 left-3 text-white text-sm font-semibold drop-shadow">{product.name}</p>
                </div>

                {/* Infos */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <FiMapPin className="flex-shrink-0" />
                    <span>{product.origin.trim()}</span>
                    <span className="mx-1">·</span>
                    <span>{product.specifications.poids}</span>
                    <span className="mx-1">·</span>
                    <span>{product.specifications.taille}</span>
                  </div>
                  <p className="text-[#C8973A] font-bold text-base leading-snug mb-4 line-clamp-2">
                    {product.price}
                  </p>
                  <div className="mt-auto flex items-center justify-between bg-[#C8973A]/10 group-hover:bg-[#C8973A] rounded-xl px-4 py-2.5 transition-all duration-300">
                    <span className="text-sm font-semibold text-[#C8973A] group-hover:text-white transition-colors">Voir les détails</span>
                    <FiArrowRight className="text-[#C8973A] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>

        ) : (

          /* ── Vue liste ── */
          <div className="space-y-4">
            {sortedProducts.map(product => (
              <a key={product.id} href={`/produits/${product.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row overflow-hidden">

                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 flex-shrink-0 bg-gray-100 overflow-hidden">
                  {product.image ? (
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${product.image}')` }} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Photo non disponible</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-base px-2 py-1 rounded-full">
                    {flagOf(product.origin)}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 flex flex-col flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#C8973A] transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <FiMapPin className="flex-shrink-0" />
                        <span>{product.origin.trim()}</span>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                      product.stock === 'En stock' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {product.stock}
                    </span>
                  </div>

                  <p className="text-[#C8973A] font-bold text-lg mb-3 line-clamp-1">{product.price}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Taille',    value: product.specifications.taille },
                      { label: 'Poids',     value: product.specifications.poids },
                      { label: 'Âge',       value: product.specifications.age },
                      { label: 'Catégorie', value: product.specifications.categorie }
                    ].map(spec => (
                      <div key={spec.label} className="bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-gray-400">{spec.label}</p>
                        <p className="text-sm font-semibold text-gray-700">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 bg-[#C8973A] group-hover:bg-[#B8852E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                      Voir les détails <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FDF6E3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8973A] mx-auto mb-4" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    }>
      <BoutiqueContent />
    </Suspense>
  )
}
