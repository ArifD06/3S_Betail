'use client'

import dynamic from "next/dynamic"
import React, { useState } from 'react'
import { FiMapPin, FiPhone, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const Map = dynamic(() => import("@/components/map"), { ssr: false })

const schedule = [
  { day: 'Lundi – Vendredi', hours: '08h00 – 18h00' },
  { day: 'Samedi', hours: '08h00 – 14h00' },
  { day: 'Dimanche', hours: 'Fermé' },
  { day: 'Période Tabaski', hours: '24h/24 · 7j/7', highlight: true }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        alert(result.error || 'Une erreur est survenue lors de l\'envoi du message.')
      }
    } catch {
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#2C1A00] to-[#4A2E00] text-white overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#C8973A]/10 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#C8973A]/5 pointer-events-none" />
        <div className="container mx-auto px-4 py-20 relative">
          <span className="inline-block bg-[#C8973A]/20 text-[#C8973A] text-sm font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
            Contactez-nous
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Parlons de votre <span className="text-[#C8973A]">Tabaski</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Notre équipe est à votre disposition pour répondre à toutes vos questions et vous aider à choisir le mouton idéal.
          </p>
        </div>
      </div>

      {/* Cartes de contact rapide */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Téléphone */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8973A]/10 flex items-center justify-center flex-shrink-0">
                <FiPhone className="text-[#C8973A] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Téléphone</h3>
                <a href="tel:+2250152041893" className="block text-sm text-gray-600 hover:text-[#C8973A] transition-colors">+225 01 52 04 18 93</a>
                <a href="tel:+2250151291181" className="block text-sm text-gray-600 hover:text-[#C8973A] transition-colors">+225 01 51 29 11 81</a>
              </div>
            </div>

            {/* Adresse */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8973A]/10 flex items-center justify-center flex-shrink-0">
                <FiMapPin className="text-[#C8973A] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Localisation</h3>
                <p className="text-sm text-gray-600">Abidjan M'badon</p>
                <p className="text-sm text-gray-600">Côte d'Ivoire</p>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="max-w-3xl mx-auto mt-4">
            <a
              href="https://wa.me/2250152041893"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#C8973A] hover:bg-[#D4A763] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] shadow-md shadow-[#C8973A]/20"
            >
              <FaWhatsapp className="text-2xl" />
              <span>Discuter directement sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Formulaire + Carte */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

            {/* Formulaire */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-500 text-sm mb-8">Nous vous répondrons dans les 24 heures.</p>

              {submitted ? (
                <div className="bg-[#C8973A]/10 border border-[#C8973A]/30 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#C8973A]/20 flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="text-[#C8973A] text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 text-sm">Nous vous répondrons très bientôt. Merci de nous avoir contacté.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#C8973A] text-sm font-semibold underline underline-offset-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8973A]/40 focus:border-[#C8973A] text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8973A]/40 focus:border-[#C8973A] text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+225 XX XX XX XX XX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8973A]/40 focus:border-[#C8973A] text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8973A]/40 focus:border-[#C8973A] text-sm transition-all bg-white"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Votre message..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8973A]/40 focus:border-[#C8973A] text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <FiSend />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Carte + Horaires */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800">Notre localisation</h2>

              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: '320px' }}>
                <Map />
              </div>

              {/* Horaires */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C8973A]/10 flex items-center justify-center">
                    <FiClock className="text-[#C8973A] text-sm" />
                  </div>
                  Horaires d'ouverture
                </h3>
                <div className="space-y-2.5">
                  {schedule.map((s, i) => (
                    <div key={i} className={`flex justify-between items-center py-2 ${i < schedule.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <span className="text-sm text-gray-600">{s.day}</span>
                      <span className={`text-sm font-medium ${s.highlight ? 'text-[#C8973A]' : 'text-gray-800'}`}>
                        {s.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
