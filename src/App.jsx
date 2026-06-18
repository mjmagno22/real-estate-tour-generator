import React, { useState } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(1)

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🏠 Real Estate Tour Generator</h1>
          <p>Create immersive 3D virtual tours in minutes</p>
        </div>
      </header>

      <main className="container">
        <div className="step-card">
          {step === 1 && (
            <>
              <h2>Step 1: Upload Floor Plan</h2>
              <p>Upload your floor plan image to generate a 3D virtual tour.</p>
              <button className="btn-primary" onClick={() => setStep(2)}>
                Upload Floor Plan
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Step 2: Generate Tour</h2>
              <p>Your 3D virtual tour is being generated...</p>
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
              <button className="btn-primary" onClick={() => setStep(3)}>
                Continue to Payment
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2>🎉 Virtual Tour Ready!</h2>
              <p>Your 3D virtual tour has been successfully created.</p>
              <div className="tour-placeholder">
                <h3>🏠 3D Virtual Tour</h3>
                <p>Share this link with potential buyers</p>
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
              <button className="btn-primary" onClick={() => alert('Payment processing - $19')}>
                💳 Pay $19 for Full Access
              </button>
              <p className="small-text">Instant delivery • 30-day money-back guarantee</p>
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2024 Real Estate Tour Generator. Made for real estate agents.</p>
        </div>
      </footer>
    </div>
  )
}

export default App