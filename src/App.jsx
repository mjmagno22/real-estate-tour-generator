import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout } from './components/Layout'
import { FileUpload } from './components/FileUpload'
import { TourPreview } from './components/TourPreview'
import { Purchase } from './components/Purchase'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [tourUrl, setTourUrl] = useState(null)
  const [error, setError] = useState(null)

  // Handle file upload
  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  // Handle tour generation
  const handleGenerateTour = async () => {
    if (!selectedFile) {
      setError('Please select a floor plan first')
      return
    }

    setIsGenerating(true)
    setError(null)

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Generate tour URL
    const generatedUrl = `https://tourgen.app/tour/${Date.now()}`
    setTourUrl(generatedUrl)
    setIsGenerating(false)
    setCurrentStep(3)
  }

  // Handle purchase
  const handlePurchase = () => {
    // Simulate payment processing
    alert('Redirecting to secure checkout...')
    // In production, this would open Stripe checkout
    window.open('https://buy.stripe.com/test_123', '_blank')
  }

  // Reset and start over
  const handleReset = () => {
    setCurrentStep(1)
    setSelectedFile(null)
    setTourUrl(null)
    setError(null)
  }

  return (
    <Layout currentStep={currentStep}>
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              error={error}
            />

            <div className="mt-8 text-center">
              {selectedFile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(2)}
                  className="btn-primary"
                >
                  Continue to 3D Generation
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TourPreview
              file={selectedFile}
              isGenerating={isGenerating}
              tourData={tourUrl}
            />

            <div className="mt-8 flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="btn-secondary"
              >
                Start Over
              </motion.button>

              {!isGenerating && !tourUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerateTour}
                  className="btn-primary"
                >
                  Generate 3D Tour
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Purchase
              tourUrl={tourUrl}
              onPurchase={handlePurchase}
            />

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="btn-secondary"
              >
                Create Another Tour
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export default App