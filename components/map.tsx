'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Create a custom icon using data URL to avoid external dependencies
const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNSA0MSI+PHBhdGggZmlsbD0iI0M4OTczQSIgZD0iTTEyLjUgMEM1LjYgMCAwIDUuNiAwIDEyLjVjMCAxMi41IDEyLjUgMjguNSAxMi41IDI4LjVTMjUgMjUgMjUgMTIuNUMyNSA1LjYgMTkuNCAwIDEyLjUgMHptMCAxNy41Yy0yLjggMC01LTIuMi01LTVzMi4yLTUgNS01IDUgMi4yIDUgNS0yLjIgNS01IDV6Ii8+PC9zdmc+',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNSA0MSI+PHBhdGggZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4zIiBkPSJNMTIuNSA0MUMxMi41IDQxIDI1IDI1IDI1IDEyLjVDMjUgNS42IDE5LjQgMCAxMi41IDBTMCA1LjYgMCAxMi41QzAgMjUgMTIuNSA0MSAxMi41IDQxeiIvPjwvc3ZnPg==',
  shadowSize: [25, 41],
  shadowAnchor: [12, 41]
})

export default function Map() {
  // Coordinates for Rue Zihon Nicole Lobli, Abidjan, Côte d'Ivoire
  const position: [number, number] = [5.33420, -3.94597]

  const handleGetDirections = () => {
    // Show loading state
    const button = document.querySelector('[data-directions-button]') as HTMLButtonElement
    if (button) {
      button.disabled = true
      button.innerHTML = `
        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        <span>Détection...</span>
      `
    }

    // Get user's current location with better options for mobile
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const destination = `${5.33420},${-3.94597}`
          const origin = `${latitude},${longitude}`
          
          // Multiple URL options for better mobile compatibility
          const urls = [
            // Google Maps with directions (primary)
            `https://www.google.com/maps/dir/${origin}/${destination}/`,
            // Google Maps with origin and destination parameters
            `https://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${5.33420},${-3.94597}&dirflg=d`,
            // Alternative Google Maps URL
            `https://www.google.com/maps?saddr=${latitude},${longitude}&daddr=${5.33420},${-3.94597}`
          ]

          // Try each URL until one works
          let urlIndex = 0
          const tryNextUrl = () => {
            if (urlIndex < urls.length) {
              const url = urls[urlIndex]
              console.log(`Trying URL ${urlIndex + 1}:`, url)
              
              // For mobile, prefer direct navigation
              if (window.location.href !== url) {
                try {
                  window.location.href = url
                  // If we reach here, the navigation might not work
                  setTimeout(() => {
                    urlIndex++
                    tryNextUrl()
                  }, 1000)
                } catch (e) {
                  console.log(`URL ${urlIndex + 1} failed, trying next`)
                  urlIndex++
                  tryNextUrl()
                }
              }
            } else {
              // All URLs failed, open in new tab as last resort
              window.open(urls[0], '_blank')
              resetButton()
            }
          }

          tryNextUrl()
        },
        (error) => {
          console.error('Geolocation error:', error)
          
          // Handle different error types
          let errorMessage = 'Impossible de détecter votre position'
          if (error.code === 1) {
            errorMessage = 'Accès à la position refusé'
          } else if (error.code === 2) {
            errorMessage = 'Position non disponible'
          } else if (error.code === 3) {
            errorMessage = 'Délai d\'attente expiré'
          }

          // Show error message and fallback
          if (button) {
            button.innerHTML = `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Réessayer</span>
            `
            button.disabled = false
          }

          // Fallback: open Google Maps with just the destination
          const destination = `${5.33420},${-3.94597}`
          const fallbackUrl = `https://www.google.com/maps/place/${destination}/`
          
          // Also try to open Apple Maps for iOS users
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
          if (isIOS) {
            const appleMapsUrl = `maps://maps.google.com/maps?daddr=${5.33420},${-3.94597}&amp;ll=`
            window.location.href = appleMapsUrl
          }
          
          setTimeout(() => {
            window.open(fallbackUrl, '_blank')
          }, 2000)
        },
        options
      )
    } else {
      // Geolocation not supported
      const destination = `${5.33420},${-3.94597}`
      const fallbackUrl = `https://www.google.com/maps/place/${destination}/`
      
      if (button) {
        button.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Itinéraire</span>
        `
        button.disabled = false
      }
      
      window.open(fallbackUrl, '_blank')
    }

    // Reset button after 15 seconds max
    setTimeout(resetButton, 15000)
  }

  const resetButton = () => {
    const button = document.querySelector('[data-directions-button]') as HTMLButtonElement
    if (button) {
      button.disabled = false
      button.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
        </svg>
        <span>Itinéraire</span>
      `
    }
  }

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <strong>Vente de Bétails</strong><br />
              Rue Zihon Nicole Lobli<br />
              Abidjan, Côte d'Ivoire
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Directions Button */}
      <button
        onClick={handleGetDirections}
        data-directions-button
        className="absolute top-4 right-4 bg-[#C8973A] hover:bg-[#B8852E] text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-colors z-[1000]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <span>Itinéraire</span>
      </button>
    </div>
  )
}