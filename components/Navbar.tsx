'use client'

import React, { useState } from 'react'
import { FiMenu, FiPhone, FiChevronDown, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Navbar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full">
      {/* Top Layer - Gold */}
      <div className="bg-[#C8973A] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="hidden sm:flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <a href="/a-propos" className="hover:text-yellow-200 cursor-pointer">A propos de nous</a>
             
            </div>
            <div className="flex space-x-4">
              <a href="#aide" className="hover:text-yellow-200 cursor-pointer">Centre d'aide</a>
              
            </div>
          </div>
          {/* Mobile Top Bar - Simplified */}
          <div className="sm:hidden flex justify-center text-sm">
          
          </div>
        </div>
      </div>

      {/* Middle Layer - Cream */}
      <div className="bg-[#F5F5DC] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/images/logo.svg" alt="3S Bétail" className="h-10 w-auto" />
            </div>

           

            {/* Desktop Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="https://wa.me/2250152041893"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaWhatsapp className="text-xl" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>
              <a
                href="tel:+2250152041893"
                className="flex items-center space-x-2 bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FiPhone className="text-xl" />
                <span className="hidden xl:inline">Appeler</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#C8973A] hover:text-[#B8852E] transition-colors"
            >
              {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Layer - White */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center py-3">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#C8973A] transition-colors"
              >
                <FiMenu className="text-xl" />
                <span>Toutes les catégories</span>
                <FiChevronDown className={`transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <a href="/produits?categorie=moutons" className="block px-4 py-2 text-gray-700 hover:bg-[#F5F5DC] hover:text-[#C8973A]">Moutons</a>
                    <span className="block px-4 py-2 text-gray-400 cursor-not-allowed">Chèvres</span>
                    <span className="block px-4 py-2 text-gray-400 cursor-not-allowed">Bœufs</span>
                    <span className="block px-4 py-2 text-gray-400 cursor-not-allowed">Volailles</span>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-[#C8973A] transition-colors">Accueil</a>
              <a href="/produits" className="text-gray-700 hover:text-[#C8973A] transition-colors">Boutique</a>
              <a href="/a-propos" className="text-gray-700 hover:text-[#C8973A] transition-colors">A propos</a>
              <a href="/faq" className="text-gray-700 hover:text-[#C8973A] transition-colors">Faq</a>
              <a href="/contact" className="text-gray-700 hover:text-[#C8973A] transition-colors">Contact</a>
            </div>

            {/* Phone Button */}
            <a 
              href="tel:+2250152041893"
              className="flex items-center space-x-2 bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
            >
              <FiPhone className="text-lg" />
              <span className="hidden lg:inline">+225 0152041893</span>
              <span className="lg:hidden">Appeler</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Categories */}
            <div className="mb-4">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#C8973A] transition-colors w-full"
              >
                <FiMenu className="text-xl" />
                <span>Toutes les catégories</span>
                <FiChevronDown className={`transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoriesOpen && (
                <div className="mt-2 space-y-2 pl-8">
                  <a href="/produits?categorie=moutons" className="block py-2 text-gray-700 hover:text-[#C8973A]">Moutons</a>
                  <a href="/produits?categorie=chevres" className="block py-2 text-gray-700 hover:text-[#C8973A]">Chèvres</a>
                  <a href="/produits?categorie=boeufs" className="block py-2 text-gray-700 hover:text-[#C8973A]">Bœufs</a>
                  <a href="/produits?categorie=volailles" className="block py-2 text-gray-700 hover:text-[#C8973A]">Volailles</a>
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-4">
              <a href="/" className="block py-2 text-gray-700 hover:text-[#C8973A]">Accueil</a>
              <a href="/produits" className="block py-2 text-gray-700 hover:text-[#C8973A]">Boutique</a>
              <a href="/a-propos" className="block py-2 text-gray-700 hover:text-[#C8973A]">A propos</a>
              <a href="/faq" className="block py-2 text-gray-700 hover:text-[#C8973A]">Faq</a>
              <a href="/contact" className="block py-2 text-gray-700 hover:text-[#C8973A]">Contact</a>
            </div>

            {/* Mobile Contact Buttons */}
            <div className="space-y-3">
              <a
                href="https://wa.me/2250152041893"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaWhatsapp className="text-xl" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+2250152041893"
                className="flex items-center justify-center space-x-2 bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold px-4 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FiPhone className="text-xl" />
                <span>Appeler</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}