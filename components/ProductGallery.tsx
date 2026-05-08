'use client'

import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiZoomIn, FiPlay } from 'react-icons/fi'

interface ProductGalleryProps {
  images: string[]
  productName: string
  video?: string
}

type MediaItem = { type: 'image'; src: string } | { type: 'video'; src: string }

export default function ProductGallery({ images, productName, video }: ProductGalleryProps) {
  const mediaItems: MediaItem[] = [
    ...images.map(src => ({ type: 'image' as const, src })),
    ...(video ? [{ type: 'video' as const, src: video }] : [])
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const currentMedia = mediaItems[currentIndex]

  const next = () => setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
  const select = (index: number) => { setCurrentIndex(index); setIsZoomed(false) }
  const toggleZoom = () => { if (currentMedia.type === 'image') setIsZoomed(!isZoomed) }

  return (
    <div className="space-y-4">
      {/* Main Media Container */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-md group">
        <div className="relative w-full h-96">
          {currentMedia.type === 'image' ? (
            <div
              className={`w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 cursor-zoom-in ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={{ backgroundImage: `url('${currentMedia.src}')`, backgroundColor: '#f3f4f6' }}
              onClick={toggleZoom}
            />
          ) : (
            <video
              src={currentMedia.src}
              controls
              className="w-full h-full object-contain bg-black"
            />
          )}

          {/* Navigation Arrows */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Précédent"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Suivant"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </>
          )}

          {currentMedia.type === 'image' && (
            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <FiZoomIn className="text-sm" />
              <span className="text-xs font-medium">Cliquez pour zoomer</span>
            </div>
          )}

          {mediaItems.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
              {currentIndex + 1} / {mediaItems.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {mediaItems.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {mediaItems.map((media, index) => (
            <button
              key={index}
              onClick={() => select(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-[#C8973A] shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={media.type === 'video' ? 'Voir la vidéo' : `Voir l'image ${index + 1}`}
            >
              {media.type === 'image' ? (
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${media.src}')`, backgroundColor: '#f3f4f6' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center space-y-1">
                  <FiPlay className="text-white text-2xl" />
                  <span className="text-white text-xs font-medium">Vidéo</span>
                </div>
              )}
              {index === currentIndex && (
                <div className="absolute inset-0 bg-[#C8973A]/20 pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal (images only) */}
      {isZoomed && currentMedia.type === 'image' && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={toggleZoom}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={currentMedia.src}
              alt={`${productName} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
              </>
            )}
            <button
              onClick={toggleZoom}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
            >
              <span className="text-xl font-bold">×</span>
            </button>
            {mediaItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-sm font-medium">
                {currentIndex + 1} / {mediaItems.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
