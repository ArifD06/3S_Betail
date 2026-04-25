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
    // Get user's current location and open Google Maps with directions
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const destination = `${5.33420},${-3.94597}`
          const origin = `${latitude},${longitude}`
          
          // Open Google Maps with directions
          const directionsUrl = `https://www.google.com/maps/dir/${origin}/${destination}/`
          window.open(directionsUrl, '_blank')
        },
        (error) => {
          // Fallback: open Google Maps with just the destination
          const destination = `${5.33420},${-3.94597}`
          const directionsUrl = `https://www.google.com/maps/place/${destination}/`
          window.open(directionsUrl, '_blank')
        }
      )
    } else {
      // Fallback: open Google Maps with just the destination
      const destination = `${5.33420},${-3.94597}`
      const directionsUrl = `https://www.google.com/maps/place/${destination}/`
      window.open(directionsUrl, '_blank')
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