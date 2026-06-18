import { motion } from 'framer-motion'
import { Home, Camera, CreditCard, CheckCircle } from 'lucide-react'

export function Layout({ children, currentStep }) {
  const steps = [
    { id: 1, name: 'Upload', icon: Camera, description: 'Upload floor plan' },
    { id: 2, name: 'Generate', icon: Home, description: 'Create 3D tour' },
    { id: 3, name: 'Purchase', icon: CreditCard, description: 'Get full access' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="gradient-bg text-white py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-shadow">TourGen Pro</h1>
                <p className="text-blue-100 text-sm">Professional 3D Virtual Tours</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-right"
            >
              <p className="text-sm text-blue-100">For Real Estate Professionals</p>
              <p className="text-xs text-blue-200">Starting at $19/tour</p>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="step-indicator justify-center mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep >= step.id
              const isCompleted = currentStep > step.id

              return (
                <motion.div key={step.id} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`step-dot ${isActive ? 'active' :
                        isCompleted ? 'completed' : 'inactive'} mb-2`}
                    >
                      {isCompleted && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {!isCompleted && <Icon className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-xs font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 card-hover"
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
          <p>© 2024 TourGen Pro. Made for Real Estate Agents •
            <span className="text-blue-600 font-medium"> Professional Virtual Tours</span>
          </p>
        </div>
      </footer>
    </div>
  )
}