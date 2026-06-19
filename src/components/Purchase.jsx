import React from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, Zap, ArrowLeft } from 'lucide-react'
import { PLANS } from '../constants/pricing'

export function Purchase({ tourUrl, onPurchase, onBack }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
        Get instant access to professional 3D virtual tours. Perfect for real estate agents
        looking to impress buyers and close deals faster.
      </p>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">3D Virtual Tour Ready</h3>
            <p className="text-xs sm:text-sm text-gray-600">Your interactive 3D tour has been generated successfully</p>
          </div>
        </div>
        {tourUrl && (
          <div className="mt-3 flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-xs sm:text-sm text-blue-600">Secure checkout powered by Stripe</span>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-6 sm:mb-8">
        {PLANS.map((plan, index) => (
          <motion.div key={plan.id} whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl scale-100 sm:scale-105 z-10' : 'shadow-lg'} rounded-2xl bg-white overflow-hidden`}>
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-xs sm:text-sm font-semibold">
                {plan.savings} • Most Popular
              </div>
            )}
            <div className={`p-4 sm:p-6 ${plan.popular ? 'pt-10 sm:pt-12' : ''}`}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{plan.name}</h3>
              <div className="mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 text-sm sm:text-base">{plan.period}</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700 text-left">{feature}</span>
                  </li>
                ))}
              </ul>
              <button onClick={onPurchase}
                className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {plan.popular ? 'Start Free Trial' : 'Get Started'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-6">
        <button onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /><span>Back to 3D Tour</span>
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-4 sm:mb-6">
          <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-1">30-Day Money-Back Guarantee</h3>
            <p className="text-blue-100 text-xs sm:text-sm">No risk, all reward</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div><div className="text-2xl sm:text-3xl font-bold mb-1">5x</div><div className="text-blue-100 text-xs sm:text-sm">More Buyer Engagement</div></div>
          <div><div className="text-2xl sm:text-3xl font-bold mb-1">24h</div><div className="text-blue-100 text-xs sm:text-sm">Average Time Saved</div></div>
          <div><div className="text-2xl sm:text-3xl font-bold mb-1">98%</div><div className="text-blue-100 text-xs sm:text-sm">Customer Satisfaction</div></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="mt-8 sm:mt-12 max-w-3xl mx-auto">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h3>
        <div className="space-y-3 sm:space-y-4">
          {[['How long does it take to generate a tour?', 'Our AI generates professional 3D virtual tours in minutes, not hours.'],
            ['Can I cancel my subscription anytime?', 'Yes, you can cancel anytime. No hidden fees or contracts.'],
            ['What file formats do you support?', 'We accept JPG, PNG, and WebP floor plans up to 10MB.']]
            .map(([q, a], i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 sm:p-4 text-left">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{q}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{a}</p>
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
