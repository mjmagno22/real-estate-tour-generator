import { motion } from 'framer-motion'
import { CreditCard, Shield, CheckCircle, Zap } from 'lucide-react'

export function Purchase({ tourUrl, onPurchase }) {
  const plans = [
    {
      name: 'Single Tour',
      price: '$19',
      period: 'per tour',
      features: [
        'One 3D virtual tour',
        'HD quality output',
        'Shareable link',
        'Mobile responsive',
        '30-day support'
      ],
      popular: false
    },
    {
      name: 'Agent Pro',
      price: '$99',
      period: '/ month',
      features: [
        'Unlimited tours',
        'Priority processing',
        'Custom branding',
        'Analytics dashboard',
        'White-label option',
        '24/7 support'
      ],
      popular: true,
      savings: 'Save $183'
    },
    {
      name: 'Agency Elite',
      price: '$299',
      period: '/ month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'API access',
        'Advanced analytics',
        'Dedicated support',
        'Custom integrations'
      ],
      popular: false,
      savings: 'Save $377'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Choose Your Plan
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Get instant access to professional 3D virtual tours. Perfect for real estate agents
        looking to impress buyers and close deals faster.
      </p>

      {/* Tour Preview Summary */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">3D Virtual Tour Ready</h3>
            <p className="text-sm text-gray-600">Your tour has been successfully generated</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-600">Secure checkout powered by Stripe</span>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'} rounded-2xl bg-white overflow-hidden`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                {plan.savings} • Most Popular
              </div>
            )}

            <div className="p-6 pt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <button
                onClick={onPurchase}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.popular ? 'Start Free Trial' : 'Get Started'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Zap className="w-8 h-8" />
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">30-Day Money-Back Guarantee</h3>
            <p className="text-blue-100 text-sm">No risk, all reward</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-1">5x</div>
            <div className="text-blue-100 text-sm">More Buyer Engagement</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">24h</div>
            <div className="text-blue-100 text-sm">Average Time Saved</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">98%</div>
            <div className="text-blue-100 text-sm">Customer Satisfaction</div>
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-12 max-w-3xl mx-auto"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">How long does it take to generate a tour?</h4>
            <p className="text-gray-600 text-sm">Our AI generates professional 3D virtual tours in minutes, not hours.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h4>
            <p className="text-gray-600 text-sm">Yes, you can cancel anytime. No hidden fees or contracts.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">What file formats do you support?</h4>
            <p className="text-gray-600 text-sm">We accept JPG, PNG, and WebP floor plans up to 10MB.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}