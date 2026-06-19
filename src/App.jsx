import React, { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout } from './components/Layout'
import { FileUpload } from './components/FileUpload'
import { TourPreview } from './components/TourPreview'
import { Purchase } from './components/Purchase'
import { analyzeFloorPlan, generateTourId } from './utils/roomAnalyzer'

const STEP_VARIANTS = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [tourData, setTourData] = useState(null)
  const [error, setError] = useState(null)
  const [layout, setLayout] = useState(null)

  const handleFileSelect = useCallback((file) => {
    setSelectedFile(file)
    setError(null)
  }, [])

  const handleGenerateTour = useCallback(async () => {
    if (!selectedFile) {
      setError('Please select a floor plan first')
      return
    }
    setIsGenerating(true)
    setError(null)
    try {
      const roomLayout = await analyzeFloorPlan(selectedFile)
      const tour = {
        id: generateTourId(),
        url: `${window.location.origin}/tour/${generateTourId()}`,
        layout: roomLayout,
        createdAt: new Date().toISOString(),
      }
      setLayout(roomLayout)
      setTourData(tour)
      setIsGenerating(false)
      setCurrentStep(2)
    } catch (err) {
      setError(err.message || 'Failed to generate tour. Please try again.')
      setIsGenerating(false)
    }
  }, [selectedFile])

  const handlePurchase = useCallback(() => {
    const stripeUrl = import.meta.env.VITE_STRIPE_URL
    if (stripeUrl) {
      window.location.href = stripeUrl
    } else {
      window.location.href = '#checkout-demo'
    }
  }, [])

  const handleReset = useCallback(() => {
    setCurrentStep(1)
    setSelectedFile(null)
    setTourData(null)
    setLayout(null)
    setError(null)
  }, [])

  return (
    <Layout currentStep={currentStep}>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <p className="text-red-600 font-medium text-center">{error}</p>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={STEP_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onError={setError}
              error={error}
            />
            {selectedFile && (
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGenerateTour}
                  className="btn-primary text-lg px-10 py-4"
                >
                  Generate 3D Tour →
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={STEP_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <TourPreview
              file={selectedFile}
              isGenerating={isGenerating}
              tourData={tourData}
              layout={layout}
              onGenerate={handleGenerateTour}
            />
            <div className="mt-6 flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="btn-secondary"
              >
                ← Start Over
              </motion.button>
              {tourData && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentStep(3)}
                  className="btn-primary"
                >
                  Continue to Purchase →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            variants={STEP_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Purchase
              tourUrl={tourData?.url}
              onPurchase={handlePurchase}
              onBack={() => setCurrentStep(2)}
            />
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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
