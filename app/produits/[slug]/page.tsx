'use client'

import React, { useState, useEffect } from 'react'
import { FiMinus, FiPlus, FiShoppingCart, FiChevronRight, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { getProductById, Product } from '@/data/products'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Déballer la Promise params
        const resolvedParams = await params
        const productId = parseInt(resolvedParams.slug)
        const foundProduct = getProductById(productId)
        
        if (foundProduct) {
          setProduct(foundProduct)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error loading product:', error)
        setLoading(false)
      }
    }

    loadProduct()
  }, [params])

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8973A] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-[#C8973A] transition-colors">Accueil</a>
            <FiChevronRight className="text-gray-400" />
            <a href="/produits" className="hover:text-[#C8973A] transition-colors">Produit</a>
            <FiChevronRight className="text-gray-400" />
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <ProductGallery 
              images={product.images} 
              productName={product.name} 
            />
            
            {/* Product Info Card */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">{product.name.split(' - ')[0]}</h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-[#C8973A]">{product.price}</span>
                <span className="text-sm text-gray-600">{product.name.split(' - ')[1]} {product.specifications.taille} ({product.specifications.age})</span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-[#F5F5DC] text-[#C8973A] px-3 py-1 rounded-full text-sm font-medium">
                  {product.specifications.categorie}
                </span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-gray-600">
                  <span className="font-medium">Catégorie:</span> {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {product.flag === 'Côte d\'Ivoire' ? '🇨🇮' : '🇲🇱'}
                  </span>
                  <span className="text-gray-600">({product.origin})</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-[#C8973A] mb-6">{product.price}</div>

              {/* Important Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800 leading-relaxed">
                  {product.note}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Caractéristiques */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Caractéristiques principales</h3>
                <div className="space-y-2">
                  {product.characteristics.map((characteristic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#C8973A] rounded-full"></div>
                      <span className="text-gray-600">{characteristic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spécifications détaillées */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Spécifications</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
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
              </div>

              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <a 
                  href="tel:+2250152041893"
                  className="flex-1 bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <FiPhone className="text-lg" />
                  <span>Appeler</span>
                </a>
                <a 
                  href={`https://wa.me/2250152041893?text=Bonjour, je suis intéressé par le produit: ${product.name} - ${product.price}`}
                  className="bg-[#C8973A] hover:bg-[#B8852E] text-white p-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

                      </div>
        </div>
      </div>
    </div>
  )
}
