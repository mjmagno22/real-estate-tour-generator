import React from 'react'
import { motion } from 'framer-motion'
import { Home, Upload, Compass, CreditCard } from 'lucide-react'
import { TOUR_STEPS, APP_NAME, APP_TAGLINE } from '../constants/pricing'

const STEP_ICONS = { 1: Upload, 2: Compass, 3: CreditCard }

export function Layout({ children, currentStep }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <header className="gradient-bg text-white py-5 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-shadow">{APP_NAME}</h1>
                <p className="text-blue-100 text-xs sm:text-sm">{APP_TAGLINE}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden sm:block text-right">
              <p className="text-sm text-blue-100">For Real Estate Professionals</p>
              <p className="text-xs text-blue-200">Starting at $19/tour</p>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 sm:py-8 w-full">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
          <div className="step-indicator justify-center mb-6 sm:mb-8 overflow-x-auto py-2">
            {TOUR_STEPS.map((step, index) => {
              const StepIcon = STEP_ICONS[step.id]
              const isActive = currentStep >= step.id
              const isCompleted = currentStep > step.id
              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-blue-600 shadow-lg shadow-blue-200 scale-110' : isCompleted ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-gray-300'}`}>
                      <StepIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium mt-1.5 whitespace-nowrap ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.name}
                    </span>
                  </div>
                  {index < TOUR_STEPS.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 mt-[-1.5rem] transition-colors duration-300 ${currentStep > step.id ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-4 sm:p-8">
          {children}
        </motion.div>
      </main>

      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 py-4 sm:py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-xs sm:text-sm text-gray-600">
          <p>© 2024 {APP_NAME}. Made for Real Estate Agents •
            <span className="text-blue-600 font-medium ml-1">Professional 3D Virtual Tours</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
