'use client'

import React, { useState, useEffect } from 'react'
import { FiChevronRight, FiPhone, FiMapPin, FiInfo, FiArrowLeft } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { getProductById, Product } from '@/data/products'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'

const flagOf = (flag: string) =>
  flag === 'Burkina Faso' ? '🇧🇫' : flag === 'Niger' ? '🇳🇪' : flag === "Côte d'Ivoire" ? '🇨🇮' : '🇲🇱'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { slug } = await params
        const found = getProductById(parseInt(slug))
        if (found) setProduct(found)
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    load()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8973A] mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!product) return notFound()

  const specs = [
    { label: 'Taille', value: product.specifications.taille },
    { label: 'Poids', value: product.specifications.poids },
    { label: 'Âge', value: product.specifications.age },
    { label: 'Catégorie', value: product.specifications.categorie }
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3.5">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <a href="/" className="hover:text-[#C8973A] transition-colors">Accueil</a>
            <FiChevronRight className="text-gray-300 text-xs" />
            <a href="/produits" className="hover:text-[#C8973A] transition-colors">Boutique</a>
            <FiChevronRight className="text-gray-300 text-xs" />
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Galerie */}
          <div>
            <ProductGallery
              images={product.images}
              productName={product.name}
              video={product.video}
            />
          </div>

          {/* Infos produit */}
          <div className="space-y-5">

            {/* En-tête */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  product.stock === 'En stock' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {product.stock}
                </span>
                <span className="text-xs bg-[#C8973A]/10 text-[#C8973A] font-medium px-3 py-1 rounded-full">
                  {product.specifications.categorie}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

              {/* Origine */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <FiMapPin className="flex-shrink-0" />
                <span>{flagOf(product.flag)} {product.origin}</span>
              </div>

              {/* Prix */}
              <div className="text-3xl font-bold text-[#C8973A] mb-5">{product.price}</div>

              {/* Note */}
              {product.note && (
                <div className="flex items-start gap-3 bg-[#C8973A]/8 border border-[#C8973A]/20 rounded-xl p-4 mb-5">
                  <FiInfo className="text-[#C8973A] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{product.note}</p>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.longDescription}</p>
              </div>
            </div>

            {/* Caractéristiques */}
            {product.characteristics && product.characteristics.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">Caractéristiques</h3>
                <ul className="space-y-2.5">
                  {product.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8973A] mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Spécifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">Spécifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{spec.label}</p>
                    <p className="font-semibold text-gray-800 text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+2250152041893"
                className="flex items-center justify-center gap-2 bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3.5 px-5 rounded-xl transition-all duration-300 shadow-md shadow-[#C8973A]/20"
              >
                <FiPhone className="text-base" />
                <span>Appeler</span>
              </a>
              <a
                href={`https://wa.me/2250152041893?text=Bonjour, je suis intéressé par : ${product.name} — ${product.price}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-[#C8973A] text-[#C8973A] hover:bg-[#C8973A] hover:text-white font-semibold py-3.5 px-5 rounded-xl transition-all duration-300"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Retour au catalogue */}
            <a
              href="/produits"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#C8973A] transition-colors w-fit"
            >
              <FiArrowLeft className="text-xs" />
              <span>Retour au catalogue</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
