'use client'

import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#C8973A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiShoppingCart className="text-2xl" />
              <span className="text-xl font-bold">SSS Bétail </span>
            </div>
            <p className="text-sm text-[#F5F5DC]/90 leading-relaxed">
              Simplifiez vos achats avec SSS Bétail. Nous sélectionnons pour vous les meilleurs spécimens et assurons une livraison rapide jusqu'à chez vous.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-[#F5F5DC]/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-[#F5F5DC]/80 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-[#F5F5DC]/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#F5F5DC]/90 hover:text-white transition-colors text-sm">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-[#F5F5DC]/90 hover:text-white transition-colors text-sm">
                  Boutique
                </a>
              </li>
              <li>
                <a href="#" className="text-[#F5F5DC]/90 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

         

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#F5F5DC]/90 hover:text-white transition-colors text-sm">
                  Livraison à domicile
                </a>
              </li>
              <li>
                <a href="#" className="text-[#F5F5DC]/90 hover:text-white transition-colors text-sm">
                  Qualité garantie
                </a>
              </li>
              <li>
                <a href="#" className="text-[#F5F5DC]/90 hover:text-white transition-colors text-sm">
                  Support client
                </a>
              </li>
              <li>
                <a href="#" className="text-[#F5F5DC]/90 hover:text-white transition-colors text-sm">
                  Paiement sécurisé
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-[#F5F5DC]/90">
              <p>Abidjan, Côte d'Ivoire</p>
              <p>+225 0152041893 / +225 0151291181</p>
              
            </div>
          </div>
        </div>

        {/* Copyright et liens légaux */}
        <div className="border-t border-[#B8852E] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#F5F5DC]/90">
            <p className="mb-2 md:mb-0">
              © 2026 SSS Bétail, tout droits reservés. 
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#F5F5DC]/80 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-[#F5F5DC]/80 hover:text-white transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-[#F5F5DC]/80 hover:text-white transition-colors">
                Politique de cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}