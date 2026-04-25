'use client'

import dynamic from "next/dynamic"
import React, { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiMessageSquare } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const Map = dynamic(() => import("@/components/map"), { ssr: false });
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert('Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        alert(result.error || 'Une erreur est survenue lors de l\'envoi du message.')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#C8973A] to-[#B8852E] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos produits et services.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-[#C8973A]/20 rounded-full p-4">
                  <FiPhone className="text-2xl text-[#C8973A]" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Téléphone</h3>
              <p className="text-gray-600 mb-2">
                <a href="tel:+2250152041893" className="hover:text-[#C8973A] transition-colors">
                  +225 0152041893
                </a>
              </p>
              <p className="text-gray-600">
                <a href="mailto:arifdiakite@gmail.com" className="hover:text-[#C8973A] transition-colors">
                  +225 0151291181
                </a>
              </p>
            </div>

           

            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-4">
                  <FiMapPin className="text-2xl text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Adresse</h3>
              <p className="text-gray-600">
                Abidjan M'badon, Côte d'Ivoire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8973A]"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8973A]"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="+225 XX XX XX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d'information</option>
                    <option value="commande">Passer une commande</option>
                    <option value="support">Support client</option>
                    <option value="partenariat">Proposition de partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                    placeholder="Votre message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="text-lg" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notre localisation</h2>
              
              {/* Map Container - Leaflet */}
<div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }}>
  <Map />
</div>

              {/* Quick Contact Info */}
              <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <FiClock className="mr-2 text-[#C8973A]" />
                  Horaires d'ouverture
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi:</span>
                    <span className="font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Samedi:</span>
                    <span className="font-medium">08:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimanche:</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Période Tabaski:</span>
                    <span className="font-medium text-[#C8973A]">24/24</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="mt-4">
                <a
                  href="https://wa.me/2250152041893"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Discuter sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Questions fréquentes</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiMessageSquare className="mr-2 text-[#C8973A]" />
                  Comment passer une commande?
                </h3>
                <p className="text-gray-600">
                  Vous pouvez passer une commande via notre site web, par téléphone au +225 0152041893, ou directement sur WhatsApp. Notre équipe vous guidera dans le choix du produit parfait.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiMessageSquare className="mr-2 text-[#C8973A]" />
                  Quels sont les modes de livraison?
                </h3>
                <p className="text-gray-600">
                  Nous livrons dans toute la Côte d'Ivoire. La livraison est gratuite pour toute commande. Vous pouvez également venir retirer votre commande directement sur place.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiMessageSquare className="mr-2 text-[#C8973A]" />
                  Les animaux sont-ils certifiés?
                </h3>
                <p className="text-gray-600">
                  Oui, tous nos animaux sont certifiés par des vétérinaires agréés et respectent les normes halal. Un certificat de conformité est fourni avec chaque animal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
