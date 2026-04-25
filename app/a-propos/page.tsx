'use client'

import React from 'react'
import { FiAward, FiHeart, FiCheckCircle, FiUsers, FiTruck, FiShield } from 'react-icons/fi'

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#C8973A] to-[#B8852E] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de SSS Bétail</h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed">
              Votre partenaire de confiance pour la fête de Tabaski 
            </p>
          </div>
        </div>
      </div>

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notre Histoire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Fondée tout récement par trois frères passionnés de betails, SSS Bétail s'est rapidement imposée comme la référence pour la vente de bétail de qualité en Côte d'Ivoire et dans la sous-région.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Notre mission est simple : vous fournir des moutons et autres bétails qui répondent aux plus hauts standards de qualité, tout en respectant les normes islamiques et les valeurs qui font la richesse de notre culture.
                </p>
                
              </div>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="text-6xl font-bold text-[#C8973A] mb-2">1+</div>
                <div className="text-gray-600">Années d'expérience</div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#C8973A]">10+</div>
                    <div className="text-sm text-gray-600">Clients satisfaits</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#C8973A]">100%</div>
                    <div className="text-sm text-gray-600">Certification halal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <FiAward className="text-4xl text-[#C8973A]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Nous sélectionnons uniquement les meilleurs spécimens, élevés dans des conditions optimales et certifiés par des experts.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <FiHeart className="text-4xl text-[#C8973A]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Tradition</h3>
              <p className="text-gray-600">
                Nous respectons les traditions et les valeurs culturelles qui entourent la célébration de Tabaski.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <FiCheckCircle className="text-4xl text-[#C8973A]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Confiance</h3>
              <p className="text-gray-600">
                Votre satisfaction est notre priorité. Nous garantissons qualité, transparence et service client irréprochable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Expertise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Notre Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#F5F5DC] rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FiUsers className="text-3xl text-[#C8973A]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Éleveurs Experts</h3>
              <p className="text-gray-600 text-sm">
                Des encadreurs professionnels avec plus de 5 ans d'expérience
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F5F5DC] rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FiTruck className="text-3xl text-[#C8973A]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Logistique Optimale</h3>
              <p className="text-gray-600 text-sm">
                Livraison rapide et sécurisée dans tout Abidjan
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F5F5DC] rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FiShield className="text-3xl text-[#C8973A]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Certification</h3>
              <p className="text-gray-600 text-sm">
                Tous nos animaux sont certifiés et suivis par des experts dans le domaine 
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#F5F5DC] rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FiHeart className="text-3xl text-[#C8973A]" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Bien-être Animal</h3>
              <p className="text-gray-600 text-sm">
                Nous respectons les normes les plus strictes de bien-être animal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Engagement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notre Engagement</h2>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Qualité Garantie</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#C8973A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Animaux sélectionnés selon des critères stricts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#C8973A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Suivi vétérinaire régulier</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#C8973A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Alimentation naturelle et contrôlée</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Client</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#C8973A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Conseils personnalisés</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#C8973A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Disponibilité 24/7 en période de Tabaski</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#C8973A] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Garantie satisfaction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#C8973A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêts à célébrer Tabaski avec nous ?</h2>
          <p className="text-xl text-[#F5F5DC] mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour découvrir notre sélection et bénéficier de nos conseils d'experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/2250152041893"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B8852E] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#967035] transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>WhatsApp</span>
            </a>
            <a 
              href="tel:+2250152041893"
              className="bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Appeler</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
