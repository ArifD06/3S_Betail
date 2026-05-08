'use client'

import React, { useState } from 'react'
import { FiChevronRight, FiChevronLeft, FiCheck, FiArrowRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { products as allProducts } from '@/data/products'

interface QuizAnswers {
  familySize: string
  budget: string
  preference: string
  experience: string
  urgency: string
}

export default function RecommendationQuiz() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    familySize: '', budget: '', preference: '', experience: '', urgency: ''
  })
  const [results, setResults] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const sheepProducts = allProducts.filter(p => p.category === 'Mouton')

  const questions = [
    {
      id: 'familySize',
      title: 'Combien de personnes pour la Tabaski ?',
      emoji: '👨‍👩‍👧‍👦',
      options: [
        { value: 'small',  label: '2 à 4 personnes',    emoji: '👫',       desc: 'Petit foyer' },
        { value: 'medium', label: '5 à 8 personnes',    emoji: '👨‍👩‍👧‍👦',      desc: 'Famille moyenne' },
        { value: 'large',  label: '9 à 15 personnes',   emoji: '🏠',       desc: 'Grande famille' },
        { value: 'xlarge', label: '15 personnes et +',  emoji: '🏘️',      desc: 'Très grande famille' }
      ]
    },
    {
      id: 'budget',
      title: 'Quel est votre budget ?',
      emoji: '💰',
      options: [
        { value: 'economy',  label: 'Moins de 150 000 FCFA',      emoji: '💵', desc: 'Budget serré' },
        { value: 'standard', label: '150 000 – 200 000 FCFA',     emoji: '💴', desc: 'Budget standard' },
        { value: 'premium',  label: '200 000 – 250 000 FCFA',     emoji: '💶', desc: 'Budget confortable' },
        { value: 'luxury',   label: 'Plus de 250 000 FCFA',       emoji: '💎', desc: 'Sans limite' }
      ]
    },
    {
      id: 'preference',
      title: 'Quelle est votre priorité ?',
      emoji: '⭐',
      options: [
        { value: 'tradition', label: 'Respecter la tradition',    emoji: '🕌', desc: 'Authentique et symbolique' },
        { value: 'prestige',  label: 'Impressionner les invités', emoji: '👑', desc: 'Beau et imposant' },
        { value: 'practical', label: 'Rapport qualité-prix',      emoji: '✅', desc: 'Simple et efficace' },
        { value: 'mixed',     label: 'Le meilleur des deux',      emoji: '🌟', desc: 'Qualité et prestige' }
      ]
    },
    {
      id: 'experience',
      title: 'Votre expérience avec la Tabaski ?',
      emoji: '🎯',
      options: [
        { value: 'beginner',    label: 'Première fois',       emoji: '🌱', desc: "J'ai besoin de conseils" },
        { value: 'regular',     label: 'Quelques années',     emoji: '📅', desc: 'Je connais les bases' },
        { value: 'experienced', label: 'Habitué',             emoji: '🏆', desc: 'Je sais ce que je veux' },
        { value: 'family',      label: 'Tradition familiale', emoji: '👴', desc: 'On a nos habitudes' }
      ]
    },
    {
      id: 'urgency',
      title: 'Quand souhaitez-vous acheter ?',
      emoji: '📅',
      options: [
        { value: 'immediate', label: 'Maintenant',          emoji: '⚡', desc: 'Je suis prêt' },
        { value: 'soon',      label: 'Cette semaine',       emoji: '📆', desc: 'Dans les prochains jours' },
        { value: 'planning',  label: 'Dans 2-3 semaines',   emoji: '🗓️', desc: "J'anticipe" },
        { value: 'browsing',  label: 'Je regarde seulement',emoji: '👀', desc: "J'explore les options" }
      ]
    }
  ]

  const compute = () => {
    const scores: { [id: number]: number } = {}
    sheepProducts.forEach(p => { scores[p.id] = 0 })

    if (answers.familySize === 'small')  sheepProducts.forEach(p => { scores[p.id] += 1 })
    if (answers.familySize === 'medium') sheepProducts.forEach(p => { scores[p.id] += 2 })
    if (answers.familySize === 'large' || answers.familySize === 'xlarge') sheepProducts.forEach(p => { scores[p.id] += 3 })

    if (answers.budget === 'standard' || answers.budget === 'premium') sheepProducts.forEach(p => { scores[p.id] += 2 })

    if (answers.preference === 'tradition' || answers.preference === 'prestige') {
      sheepProducts.filter(p => !!p.image).forEach(p => { scores[p.id] += 2 })
    }
    if (answers.preference === 'practical' || answers.preference === 'mixed') {
      sheepProducts.filter(p => !!p.video).forEach(p => { scores[p.id] += 2 })
    }

    if (answers.urgency === 'immediate' || answers.urgency === 'soon') {
      sheepProducts.filter(p => p.stock === 'En stock').forEach(p => { scores[p.id] += 1 })
    }

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
    setAnswers({ familySize: '', budget: '', preference: '', experience: '', urgency: '' })
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
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{current.emoji}</div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{current.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.options.map(opt => {
            const selected = currentAnswer === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setAnswers(prev => ({ ...prev, [current.id]: opt.value }))}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selected
                    ? 'border-[#C8973A] bg-[#FDF6E3] shadow-md'
                    : 'border-gray-100 hover:border-[#C8973A]/40 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm leading-tight">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                  {selected && (
                    <div className="w-5 h-5 bg-[#C8973A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="text-white text-xs" />
                    </div>
                  )}
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
