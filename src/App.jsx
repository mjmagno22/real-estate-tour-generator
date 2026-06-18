import React, { useState, useRef } from 'react'
import './App.css'


function VirtualTour3D() {
  return (
    <div className="tour-placeholder">
      <h3>🏠 3D Virtual Tour</h3>
      <p>Your 3D tour will appear here</p>
      <div className="tour-demo">
        <div className="room-demo">
          <div className="floor"></div>
          <div className="wall wall-1"></div>
          <div className="wall wall-2"></div>
          <div className="furniture bed"></div>
          <div className="furniture sofa"></div>
          <div className="furniture table"></div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [floorplanFile, setFloorplanFile] = useState(null)
  const [tourUrl, setTourUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTourReady, setIsTourReady] = useState(false)
  const tourRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFloorplanFile(acceptedFiles[0])
      setCurrentStep(2)
    }
  }

  const generateTour = async () => {
    setIsGenerating(true)

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsGenerating(false)
    setIsTourReady(true)
    setCurrentStep(3)
  }

  const handlePurchase = () => {
    // Simple payment integration - leads to payment page
    alert('Redirecting to payment - $19 per tour')
    // In production, this would open Stripe payment form
    setTourUrl(`https://realestate-tour-generator.vercel.app/tour/${Date.now()}`)
    window.open('https://realestate-tour-generator.vercel.app/payment', '_blank')
  }

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🏠 Real Estate Tour Generator</h1>
          <p>Create immersive 3D virtual tours in minutes</p>
        </div>
      </header>

      <main className="container">
        {!isTourReady ? (
          <div className="steps">
            {currentStep === 1 && (
              <div className="step-card">
                <h2>Step 1: Upload Floor Plan</h2>
                <div className="dropzone">
                  <p>📄 Drop your floor plan image here</p>
                  <input type="file" accept="image/*" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-card">
                <h2>Step 2: Customize Your Tour</h2>
                <div className="file-preview">
                  <img src={URL.createObjectURL(floorplanFile)} alt="Floor plan" />
                  <p>{floorplanFile.name}</p>
                </div>
                <button onClick={generateTour} className="btn-primary" disabled={isGenerating}>
                  {isGenerating ? '⏳ Generating Tour...' : '🚀 Generate 3D Tour'}
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-card">
                <h2>Step 3: Your 3D Tour is Ready!</h2>
                <div className="tour-preview">
                  <div ref={tourRef} className="tour-container">
                    <VirtualTour3D containerRef={tourRef} />
                  </div>
                </div>
                <button onClick={handlePurchase} className="btn-primary">
                  💰 Purchase Tour - $19
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="success-card">
            <h2>🎉 Virtual Tour Created!</h2>
            <p>Your 3D tour link: <a href={tourUrl} target="_blank" rel="noopener">{tourUrl}</a></p>
            <div className="tour-embed">
              <div ref={tourRef} className="tour-container">
                <VirtualTour3D containerRef={tourRef} />
              </div>
            </div>
            <button onClick={handlePurchase} className="btn-primary">
              Get Full Access - $19
            </button>
            <p className="small-text">Instant delivery • 30-day money-back guarantee</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2024 Real Estate Tour Generator. Made for real estate agents.</p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  // Simple debug logging
  console.log('App rendering with step:', { currentStep: 1, floorplanFile: null, isTourReady: false })

  const [currentStep, setCurrentStep] = useState(1)
  const [floorplanFile, setFloorplanFile] = useState(null)
  const [tourUrl, setTourUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTourReady, setIsTourReady] = useState(false)

  const tourRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles)
    if (acceptedFiles.length > 0) {
      setFloorplanFile(acceptedFiles[0])
      setCurrentStep(2)
    }
  }

  const generateTour = async () => {
    console.log('Generating tour...')
    setIsGenerating(true)

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsGenerating(false)
    setIsTourReady(true)
    setCurrentStep(3)
  }

  const handlePurchase = () => {
    console.log('Processing payment...')
    // Simple payment integration - leads to payment page
    alert('Redirecting to payment - $19 per tour')
    // In production, this would open Stripe payment form
    setTourUrl(`https://realestate-tour-generator.vercel.app/tour/${Date.now()}`)
    window.open('https://realestate-tour-generator.vercel.app/payment', '_blank')
  }

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🏠 Real Estate Tour Generator</h1>
          <p>Create immersive 3D virtual tours in minutes</p>
        </div>
      </header>

      <main className="container">
        {!isTourReady ? (
          <div className="steps">
            {currentStep === 1 && (
              <div className="step-card">
                <h2>Step 1: Upload Floor Plan</h2>
                <div className="dropzone">
                  <p>📄 Drop your floor plan image here</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      console.log('File selected:', e.target.files)
                      if (e.target.files.length > 0) {
                        setFloorplanFile(e.target.files[0])
                        setCurrentStep(2)
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-card">
                <h2>Step 2: Customize Your Tour</h2>
                <div className="file-preview">
                  <img src={URL.createObjectURL(floorplanFile)} alt="Floor plan" />
                  <p>{floorplanFile.name}</p>
                </div>
                <button onClick={generateTour} className="btn-primary" disabled={isGenerating}>
                  {isGenerating ? '⏳ Generating Tour...' : '🚀 Generate 3D Tour'}
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-card">
                <h2>Step 3: Your 3D Tour is Ready!</h2>
                <div className="tour-preview">
                  <div ref={tourRef} className="tour-container">
                    <VirtualTour3D />
                  </div>
                </div>
                <button onClick={handlePurchase} className="btn-primary">
                  💰 Purchase Tour - $19
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="success-card">
            <h2>🎉 Virtual Tour Created!</h2>
            <p>Your 3D tour link: <a href={tourUrl} target="_blank" rel="noopener">{tourUrl}</a></p>
            <div className="tour-embed">
              <div ref={tourRef} className="tour-container">
                <VirtualTour3D />
              </div>
            </div>
            <button onClick={handlePurchase} className="btn-primary">
              Get Full Access - $19
            </button>
            <p className="small-text">Instant delivery • 30-day money-back guarantee</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2024 Real Estate Tour Generator. Made for real estate agents.</p>
        </div>
      </footer>
    </div>
  )
}