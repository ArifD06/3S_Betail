'use client'

import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-md group">
        <div 
          className={`relative w-full h-96 bg-cover bg-center bg-no-repeat transition-all duration-300 cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={{
            backgroundImage: `url('${images[currentImageIndex]}')`,
            backgroundColor: '#f3f4f6'
          }}
          onClick={toggleZoom}
        >
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Image précédente"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Image suivante"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <FiZoomIn className="text-sm" />
            <span className="text-xs font-medium">Cliquez pour zoomer</span>
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-[#C8973A] shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`Voir l'image ${index + 1}`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundColor: '#f3f4f6'
                }}
              />
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-[#C8973A]/20 pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={toggleZoom}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[currentImageIndex]}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Modal Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                  aria-label="Image précédente"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                  aria-label="Image suivante"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
              </>
            )}

            {/* Modal Close */}
            <button
              onClick={toggleZoom}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
              aria-label="Fermer le zoom"
            >
              <span className="text-xl font-bold">×</span>
            </button>

            {/* Modal Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
