'use client'

import React, { useState, useEffect } from 'react'
import { FiMenu, FiPhone, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/produits' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermer le menu mobile au changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Bandeau supérieur */}
      <div className="bg-[#2C1A00] text-[#F5F5DC]/70 text-xs py-2 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>🐑 Livraison disponible sur Abidjan — Tabaski 2026</span>
          <div className="flex items-center gap-4">
            <a href="/a-propos" className="hover:text-[#C8973A] transition-colors">À propos</a>
            <span className="text-[#C8973A]/40">|</span>
            <a href="/faq" className="hover:text-[#C8973A] transition-colors">Aide & FAQ</a>
          </div>
        </div>
      </div>

      {/* Navbar principale */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#C8973A]/20'
          : 'bg-white border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group flex-shrink-0">
              <img src="/images/logo.svg" alt="3S Bétail" className="h-9 w-auto" />
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-gray-800 group-hover:text-[#C8973A] transition-colors leading-none">
                  3S <span className="text-[#C8973A]">Bétail</span>
                </span>
                <p className="text-[10px] text-gray-400 leading-none mt-0.5 tracking-wide">Votre mouton de confiance</p>
              </div>
            </a>

            {/* Liens desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-[#C8973A]'
                        : 'text-gray-600 hover:text-[#C8973A] hover:bg-[#C8973A]/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C8973A] rounded-full" />
                    )}
                  </a>
                )
              })}
            </div>

            {/* Actions desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://wa.me/2250152041893"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#C8973A] text-[#C8973A] hover:bg-[#C8973A] hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+2250152041893"
                className="flex items-center gap-2 bg-[#C8973A] hover:bg-[#B8852E] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
              >
                <FiPhone className="text-base" />
                <span>Appeler</span>
              </a>
            </div>

            {/* Bouton burger mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:border-[#C8973A] hover:text-[#C8973A] transition-all duration-200"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-100 bg-white px-4 py-4 space-y-1">

            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C8973A]/10 text-[#C8973A]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#C8973A]'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C8973A]" />}
                  {link.label}
                </a>
              )
            })}

            {/* Séparateur */}
            <div className="h-px bg-gray-100 my-3" />

            {/* Boutons contact mobile */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://wa.me/2250152041893"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-[#C8973A] text-[#C8973A] font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:bg-[#C8973A] hover:text-white"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+2250152041893"
                className="flex items-center justify-center gap-2 bg-[#C8973A] text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 hover:bg-[#B8852E]"
              >
                <FiPhone className="text-base" />
                <span>Appeler</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
