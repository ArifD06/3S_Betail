'use client'

import React, { useState } from 'react'
import { FiChevronRight, FiChevronLeft, FiCheck, FiArrowRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { products as allProducts } from '@/data/products'

interface QuizAnswers {
  familySize: string
  budget: string
  taille: string
  media: string
  livraison: string
}

export default function RecommendationQuiz() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    familySize: '', budget: '', taille: '', media: '', livraison: ''
  })
  const [results, setResults] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const sheepProducts = allProducts.filter(p => p.category === 'Mouton')

  const questions = [
    {
      id: 'familySize',
      title: 'Pour combien de personnes ?',
      emoji: '👨‍👩‍👧‍👦',
      options: [
        { value: 'small',  emoji: '👫',  label: 'Moins de 5',    desc: 'Petit foyer' },
        { value: 'medium', emoji: '🏠',  label: '5 à 10',        desc: 'Famille moyenne' },
        { value: 'large',  emoji: '🏘️', label: 'Plus de 10',    desc: 'Grande famille' },
        { value: 'xlarge', emoji: '🎉',  label: 'Grande fête',   desc: '20 personnes et plus' }
      ]
    },
    {
      id: 'budget',
      title: 'Votre budget ?',
      emoji: '💰',
      options: [
        { value: 'economy',  emoji: '💵', label: 'Moins de 150 000',  desc: 'FCFA' },
        { value: 'standard', emoji: '💴', label: 'Autour de 180 000', desc: 'FCFA' },
        { value: 'premium',  emoji: '💶', label: '200 000 – 250 000', desc: 'FCFA' },
        { value: 'luxury',   emoji: '💎', label: 'Plus de 250 000',   desc: 'FCFA' }
      ]
    },
    {
      id: 'taille',
      title: 'Quelle taille de mouton ?',
      emoji: '📏',
      options: [
        { value: 'Petit', emoji: '🐑', label: 'Petit',  desc: 'Léger, moins de 35 kg' },
        { value: 'Moyen', emoji: '🐏', label: 'Moyen',  desc: 'Entre 35 et 50 kg' },
        { value: 'Grand', emoji: '🦣', label: 'Grand',  desc: 'Plus de 50 kg' },
        { value: 'indifferent', emoji: '🤷', label: 'Peu importe', desc: 'Montrez-moi tout' }
      ]
    },
    {
      id: 'media',
      title: 'Comment voir le mouton avant d\'acheter ?',
      emoji: '👁️',
      options: [
        { value: 'photo', emoji: '📷', label: 'En photo',       desc: 'Une belle image suffit' },
        { value: 'video', emoji: '🎥', label: 'En vidéo',       desc: 'Je veux le voir bouger' },
        { value: 'both',  emoji: '🌟', label: 'Photo + vidéo',  desc: 'Les deux, c\'est mieux' },
        { value: 'any',   emoji: '👌', label: 'Peu importe',    desc: 'Je fais confiance' }
      ]
    },
    {
      id: 'livraison',
      title: 'Comment récupérer le mouton ?',
      emoji: '🚚',
      options: [
        { value: 'delivery', emoji: '🏠', label: 'Livraison à domicile', desc: 'On vous l\'amène' },
        { value: 'pickup',   emoji: '🚶', label: 'Je viens le chercher', desc: 'Sur place à Abidjan' },
        { value: 'urgent',   emoji: '⚡', label: 'Livraison urgente',    desc: 'Aujourd\'hui ou demain' },
        { value: 'later',    emoji: '🗓️', label: 'Pas pressé',          desc: 'Je planifie à l\'avance' }
      ]
    }
  ]

  const compute = () => {
    const scores: { [id: number]: number } = {}
    sheepProducts.forEach(p => { scores[p.id] = 0 })

    // Taille de la famille → légère préférence pour moutons en stock
    if (answers.familySize === 'large' || answers.familySize === 'xlarge')
      sheepProducts.forEach(p => { scores[p.id] += 1 })

    // Budget standard → boost tous les produits à 180k
    if (answers.budget === 'standard' || answers.budget === 'premium')
      sheepProducts.forEach(p => { scores[p.id] += 2 })

    // Taille du mouton
    if (answers.taille !== 'indifferent')
      sheepProducts.filter(p => p.specifications.taille === answers.taille)
        .forEach(p => { scores[p.id] += 4 })

    // Préférence photo/vidéo
    if (answers.media === 'photo' || answers.media === 'both')
      sheepProducts.filter(p => !!p.image).forEach(p => { scores[p.id] += 3 })
    if (answers.media === 'video' || answers.media === 'both')
      sheepProducts.filter(p => !!p.video).forEach(p => { scores[p.id] += 3 })
    if (answers.media === 'any')
      sheepProducts.forEach(p => { scores[p.id] += 2 })

    // Livraison urgente → moutons en stock
    if (answers.livraison === 'urgent' || answers.livraison === 'delivery')
      sheepProducts.filter(p => p.stock === 'En stock').forEach(p => { scores[p.id] += 1 })

    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([id]) => parseInt(id))
      .slice(0, 3)

    setResults(sorted)
    setDone(true)
  }

  const resetQuiz = () => {
    setDone(false)
    setStep(0)
    setAnswers({ familySize: '', budget: '', taille: '', media: '', livraison: '' })
    setResults([])
  }

  const current = questions[step]
  const progress = ((step + 1) / questions.length) * 100
  const currentAnswer = answers[current.id as keyof QuizAnswers]

  if (done) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-[#C8973A] to-[#D4A763] p-6 text-white text-center">
          <div className="text-5xl mb-3">✨</div>
          <h2 className="text-2xl font-bold">Vos moutons recommandés</h2>
          <p className="text-white/80 text-sm mt-1">Sélection personnalisée pour votre Tabaski</p>
        </div>

        <div className="p-4 sm:p-6 space-y-3">
          {results.map((id, i) => {
            const p = sheepProducts.find(x => x.id === id)
            if (!p) return null
            return (
              <a key={id} href={`/produits/${p.id}`}
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-[#C8973A] transition-all group"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                  {p.image ? (
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${p.image}')` }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-xl">▶</span>
                    </div>
                  )}
                  {p.video && (
                    <div className="absolute bottom-1 right-1 bg-[#C8973A] rounded-full w-5 h-5 flex items-center justify-center">
                      <span className="text-white" style={{ fontSize: '8px' }}>▶</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-[#C8973A] bg-[#FDF6E3] px-2 py-0.5 rounded-full">
                    #{i + 1} recommandé
                  </span>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#C8973A] transition-colors mt-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{p.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[#C8973A] text-sm">{p.price}</p>
                  <FiArrowRight className="ml-auto mt-2 text-gray-400 group-hover:text-[#C8973A] transition-colors" />
                </div>
              </a>
            )
          })}
        </div>

        <div className="px-4 sm:px-6 pb-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push(`/produits?recommended=${results.join(',')}`)}
            className="flex-1 bg-[#C8973A] hover:bg-[#B8852E] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Voir tous les moutons
            <FiArrowRight />
          </button>
          <button
            onClick={resetQuiz}
            className="sm:px-6 py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-600 rounded-xl transition-colors text-sm font-medium"
          >
            Recommencer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="bg-gradient-to-r from-[#C8973A] to-[#D4A763] p-5 sm:p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/80 text-sm font-medium">Question {step + 1} / {questions.length}</span>
          <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2 mb-4">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-center gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i < step ? 'w-5 h-2 bg-white' : i === step ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="p-4 sm:p-6">
        <div className="text-center mb-5">
          <div className="text-4xl sm:text-5xl mb-2">{current.emoji}</div>
          <h2 className="text-base sm:text-xl font-bold text-gray-800 leading-snug px-2">{current.title}</h2>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {current.options.map(opt => {
            const selected = currentAnswer === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setAnswers(prev => ({ ...prev, [current.id]: opt.value }))}
                className={`p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 active:scale-95 ${
                  selected
                    ? 'border-[#C8973A] bg-[#FDF6E3] shadow-md'
                    : 'border-gray-100 hover:border-[#C8973A]/40 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl">{opt.emoji}</span>
                    {selected && (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#C8973A] rounded-full flex items-center justify-center flex-shrink-0">
                        <FiCheck className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-800 text-xs sm:text-sm leading-tight">{opt.label}</p>
                  <p className="text-xs text-gray-400 leading-tight hidden sm:block">{opt.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-6 pb-6 flex justify-between items-center">
        <button
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
          className={`flex items-center gap-1 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
            step === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FiChevronLeft />
          Précédent
        </button>

        <button
          onClick={() => step === questions.length - 1 ? compute() : setStep(s => s + 1)}
          disabled={!currentAnswer}
          className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-semibold transition-all text-sm ${
            currentAnswer
              ? 'bg-[#C8973A] hover:bg-[#B8852E] text-white shadow-md hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step === questions.length - 1 ? '✨ Voir mes recommandations' : 'Suivant'}
          {step < questions.length - 1 && <FiChevronRight />}
        </button>
      </div>
    </div>
  )
}
