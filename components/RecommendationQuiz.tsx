'use client'

import React, { useState } from 'react'
import { FiChevronRight, FiChevronLeft, FiCheck, FiUsers, FiDollarSign, FiAward, FiHeart } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

interface QuizAnswers {
  familySize: string
  budget: string
  preference: string
  experience: string
  urgency: string
}

interface RecommendationResult {
  products: number[]
  explanation: string
  confidence: number
  category: string
}

export default function RecommendationQuiz() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    familySize: '',
    budget: '',
    preference: '',
    experience: '',
    urgency: ''
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null)

  const questions = [
    {
      id: 'familySize',
      title: 'Combien de personnes participeront à Tabaski ?',
      icon: FiUsers,
      options: [
        { value: 'small', label: '2-4 personnes', description: 'Petite famille' },
        { value: 'medium', label: '5-8 personnes', description: 'Famille moyenne' },
        { value: 'large', label: '9-12 personnes', description: 'Grande famille' },
        { value: 'xlarge', label: '13+ personnes', description: 'Très grande famille' }
      ]
    },
    {
      id: 'budget',
      title: 'Quel est votre budget pour le mouton ?',
      icon: FiDollarSign,
      options: [
        { value: 'economy', label: '100k - 130k FCFA', description: 'Option économique' },
        { value: 'standard', label: '130k - 160k FCFA', description: 'Bon rapport qualité-prix' },
        { value: 'premium', label: '160k - 200k FCFA', description: 'Qualité supérieure' },
        { value: 'luxury', label: '200k+ FCFA', description: 'Sans compromis' }
      ]
    },
    {
      id: 'preference',
      title: 'Que préférez-vous pour votre célébration ?',
      icon: FiHeart,
      options: [
        { value: 'tradition', label: 'Tradition authentique', description: 'Respect des coutumes' },
        { value: 'prestige', label: 'Prestige et distinction', description: 'Mettre en valeur' },
        { value: 'practical', label: 'Pratique et simple', description: 'Sans complication' },
        { value: 'mixed', label: 'Équilibre tradition/moderne', description: 'Le meilleur des deux' }
      ]
    },
    {
      id: 'experience',
      title: 'Comment décririez-vous votre expérience Tabaski ?',
      icon: FiAward,
      options: [
        { value: 'beginner', label: 'Première fois', description: 'J ai besoin de conseils' },
        { value: 'regular', label: 'Quelques années', description: 'Je connais les bases' },
        { value: 'experienced', label: 'Expert', description: 'Je sais exactement ce que je veux' },
        { value: 'family', label: 'Tradition familiale', description: 'Notre famille a ses habitudes' }
      ]
    },
    {
      id: 'urgency',
      title: 'Quand prévoyez-vous votre achat ?',
      icon: FiCheck,
      options: [
        { value: 'immediate', label: 'Immédiatement', description: 'Prêt à acheter maintenant' },
        { value: 'soon', label: 'Cette semaine', description: 'Je prévois bientôt' },
        { value: 'planning', label: 'Dans 2-3 semaines', description: 'Je planifie à l avance' },
        { value: 'browsing', label: 'Juste curieux', description: 'J explore les options' }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      generateRecommendations()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const generateRecommendations = () => {
    // Algorithme de recommandation IA
    let scores: { [key: number]: number } = {}
    let explanation = ''
    let category = ''

    // Logique de scoring basée sur les réponses
    if (answers.familySize === 'small') {
      scores = { ...scores, 1: 10, 3: 8 } // Moutons de taille S/M
      explanation += 'Pour une petite famille, nous recommandons des moutons de taille standard. '
    } else if (answers.familySize === 'medium') {
      scores = { ...scores, 1: 9, 2: 10, 4: 8 } // Moutons de taille M/L
      explanation += 'Une famille moyenne nécessite des moutons de taille moyenne à grande. '
    } else if (answers.familySize === 'large') {
      scores = { ...scores, 2: 9, 4: 10 } // Moutons de taille L/XL
      explanation += 'Pour une grande famille, optez pour des spécimens de grande taille. '
    } else {
      scores = { ...scores, 4: 10, 2: 9 } // Moutons XL
      explanation += 'Une très grande famille requiert les plus beaux spécimens. '
    }

    // Budget influence
    if (answers.budget === 'economy') {
      scores = { ...scores, 3: 8, 1: 7 }
      explanation += 'Avec un budget économique, le mouton du Nord offre un excellent rapport. '
    } else if (answers.budget === 'premium' || answers.budget === 'luxury') {
      scores = { ...scores, 2: 10, 4: 10 }
      explanation += 'Pour un budget premium, les races Ladoum et Sahéliens sont idéales. '
    }

    // Préférence influence
    if (answers.preference === 'tradition') {
      scores = { ...scores, 3: 9, 1: 8 }
      category = 'Traditionnel'
      explanation += 'Les moutons du Sahel et du Nord respectent parfaitement les traditions. '
    } else if (answers.preference === 'prestige') {
      scores = { ...scores, 2: 10, 4: 10 }
      category = 'Premium'
      explanation += 'Pour le prestige, rien ne surpasse les races Ladoum et Sahéliennes. '
    }

    // Calcul du produit recommandé principal
    const sortedProducts = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([id]) => parseInt(id))

    const result: RecommendationResult = {
      products: sortedProducts.slice(0, 3),
      explanation,
      confidence: Math.max(...Object.values(scores)) / 10,
      category: category || 'Standard'
    }

    setRecommendations(result)
    setIsCompleted(true)
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({
      familySize: '',
      budget: '',
      preference: '',
      experience: '',
      urgency: ''
    })
    setIsCompleted(false)
    setRecommendations(null)
  }

  const viewRecommendations = () => {
    if (recommendations) {
      // Naviguer vers la page produits avec les recommandations
      router.push(`/produits?recommended=${recommendations.products.join(',')}&category=${recommendations.category}`)
    }
  }

  const currentQuestion = questions[currentStep]
  const Icon = currentQuestion.icon
  const progress = ((currentStep + 1) / questions.length) * 100

  if (isCompleted && recommendations) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-3xl text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Vos Recommandations Personnalisées</h2>
          <p className="text-gray-600">Basé sur vos réponses, voici ce que nous vous suggérons</p>
        </div>

        <div className="bg-gradient-to-r from-[#C8973A]/10 to-[#F5F5DC]/10 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Notre analyse</h3>
          <p className="text-gray-700 leading-relaxed">{recommendations.explanation}</p>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600">Confiance de notre IA :</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#C8973A] h-2 rounded-full transition-all duration-500"
                style={{ width: `${recommendations.confidence * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-[#C8973A]">
              {Math.round(recommendations.confidence * 100)}%
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-gray-800">Moutons recommandés pour vous</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.products.map((productId, index) => (
              <div key={productId} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-[#C8973A] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-600">Option {index + 1}</p>
                <p className="font-semibold text-gray-800">Mouton #{productId}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={viewRecommendations}
            className="flex-1 bg-[#C8973A] hover:bg-[#D4A763] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Voir les recommandations</span>
            <FiChevronRight />
          </button>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Recommencer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Question {currentStep + 1} sur {questions.length}</span>
          <span className="text-sm font-medium text-[#C8973A]">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#C8973A] to-[#D4A763] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#F5F5DC] rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="text-2xl text-[#C8973A]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQuestion.title}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(currentQuestion.id, option.value)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              answers[currentQuestion.id as keyof QuizAnswers] === option.value
                ? 'border-[#C8973A] bg-[#F5F5DC] shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                answers[currentQuestion.id as keyof QuizAnswers] === option.value
                  ? 'border-[#C8973A] bg-[#C8973A]'
                  : 'border-gray-300'
              }`}>
                {answers[currentQuestion.id as keyof QuizAnswers] === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FiChevronLeft />
          <span>Précédent</span>
        </button>

        <button
          onClick={nextStep}
          disabled={!answers[currentQuestion.id as keyof QuizAnswers]}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            answers[currentQuestion.id as keyof QuizAnswers]
              ? 'bg-[#C8973A] hover:bg-[#D4A763] text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{currentStep === questions.length - 1 ? 'Obtenir mes recommandations' : 'Suivant'}</span>
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}
