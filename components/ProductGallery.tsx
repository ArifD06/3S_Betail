'use client'

import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiPlay } from 'react-icons/fi'

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
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const currentMedia = mediaItems[currentIndex]

  const next = () => setCurrentIndex(i => (i + 1) % mediaItems.length)
  const prev = () => setCurrentIndex(i => (i - 1 + mediaItems.length) % mediaItems.length)
  const select = (i: number) => { setCurrentIndex(i); setIsZoomed(false) }

  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const diff = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    setTouchStartX(null)
  }

  return (
    <div className="space-y-3">

      {/* ── Image principale ── */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow group">

        <div
          className="relative w-full h-64 sm:h-96 select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {currentMedia.type === 'image' ? (
            <img
              src={currentMedia.src}
              alt={`${productName} – ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
              draggable={false}
            />
          ) : (
            <video
              src={currentMedia.src}
              controls
              muted
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          )}

          {/* Flèches — desktop uniquement */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={prev}
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2
                           bg-white/90 hover:bg-white text-gray-800 w-9 h-9
                           rounded-full shadow-lg items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Précédent"
              >
                <FiChevronLeft className="text-lg" />
              </button>
              <button
                onClick={next}
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2
                           bg-white/90 hover:bg-white text-gray-800 w-9 h-9
                           rounded-full shadow-lg items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label="Suivant"
              >
                <FiChevronRight className="text-lg" />
              </button>
            </>
          )}

          {/* Bouton zoom — desktop */}
          {currentMedia.type === 'image' && (
            <button
              onClick={() => setIsZoomed(true)}
              className="hidden sm:flex absolute top-3 right-3 bg-white/80 backdrop-blur-sm
                         w-8 h-8 rounded-full items-center justify-center shadow
                         opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Agrandir"
            >
              <FiMaximize2 className="text-sm text-gray-700" />
            </button>
          )}

          {/* Points de navigation — mobile uniquement */}
          {mediaItems.length > 1 && (
            <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {mediaItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => select(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === currentIndex
                      ? 'w-5 h-2 bg-white'
                      : 'w-2 h-2 bg-white/50'
                  }`}
                  aria-label={`Média ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Compteur — desktop */}
          {mediaItems.length > 1 && (
            <div className="hidden sm:block absolute bottom-3 left-3 bg-black/50 text-white px-2.5 py-1 rounded-full text-xs font-medium">
              {currentIndex + 1} / {mediaItems.length}
            </div>
          )}
        </div>
      </div>

      {/* ── Thumbnails scrollables ── */}
      {mediaItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {mediaItems.map((media, i) => (
            <button
              key={i}
              onClick={() => select(i)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden
                          border-2 transition-all duration-200 ${
                i === currentIndex
                  ? 'border-[#C8973A] shadow-md ring-2 ring-[#C8973A]/30'
                  : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300'
              }`}
              aria-label={media.type === 'video' ? 'Voir la vidéo' : `Image ${i + 1}`}
            >
              {media.type === 'image' ? (
                <img src={media.src} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center gap-0.5">
                  <FiPlay className="text-white text-base" />
                  <span className="text-white text-xs leading-none">Vidéo</span>
                </div>
              )}
              {i === currentIndex && (
                <div className="absolute inset-0 bg-[#C8973A]/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Modal zoom ── */}
      {isZoomed && currentMedia.type === 'image' && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={currentMedia.src}
            alt={productName}
            className="max-w-full max-h-full object-contain rounded-lg"
            draggable={false}
          />

          {mediaItems.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2
                           bg-white/15 hover:bg-white/30 text-white w-10 h-10
                           rounded-full flex items-center justify-center transition-colors"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2
                           bg-white/15 hover:bg-white/30 text-white w-10 h-10
                           rounded-full flex items-center justify-center transition-colors"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </>
          )}

          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 bg-white/15 hover:bg-white/30 text-white
                       w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors"
          >
            ×
          </button>

          {mediaItems.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {mediaItems.map((_, i) => (
                <div key={i} className={`rounded-full transition-all ${i === currentIndex ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
