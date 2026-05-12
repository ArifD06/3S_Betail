'use client'

import React from 'react'
import { products } from '@/data/products'

const flagMap: { [key: string]: string } = {
  'Burkina Faso': '🇧🇫',
  'Niger': '🇳🇪',
  "Côte d'Ivoire": '🇨🇮',
  'Mali': '🇲🇱'
}

export default function LivestockByCountry() {
  const countByCountry = products.reduce<{ [key: string]: number }>((acc, product) => {
    const origin = product.origin.trim()
    acc[origin] = (acc[origin] || 0) + 1
    return acc
  }, {})

  const countries = Object.entries(countByCountry)
    .filter(([, count]) => count > 0)
    .map(([name, count]) => ({ name, count, flag: flagMap[name] || '🏳️' }))

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Bétail par pays</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="text-5xl bg-white rounded-full p-3 shadow-md">
                  {country.flag}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#C8973A] transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-gray-600">{country.count} bétail disponible</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
