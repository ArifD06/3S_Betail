import HeroSection from '@/components/HeroSection'
import LivestockByCountry from '@/components/LivestockByCountry'
import FeaturedProducts from '@/components/FeaturedProducts'
import RecommendationQuiz from '@/components/RecommendationQuiz'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <LivestockByCountry />
      
      {/* AI Recommendation Section */}
      <section className="py-16 bg-gradient-to-br from-[#F5F5DC] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Votre Mouton Idéal en 5 Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre IA analyse vos besoins pour vous recommander le mouton parfait pour votre Tabaski
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">IA Intelligente</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Personnalisé</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Instantané</span>
              </div>
            </div>
          </div>
          
          <RecommendationQuiz />
        </div>
      </section>
      
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  )
}
