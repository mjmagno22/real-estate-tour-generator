import React, { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import './App.css'

function VirtualTour3D({ containerRef }) {
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    // Setup renderer
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0xf0f0f0, 1)
    container.appendChild(renderer.domElement)

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffffff, 0.8)
    directional.position.set(10, 10, 5)
    scene.add(directional)

    // Camera
    camera.position.set(15, 10, 15)
    camera.lookAt(0, 0, 0)

    // Simple floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    scene.add(floor)

    // Create a simple room
    const roomGeometry = new THREE.BoxGeometry(10, 8, 10)
    const roomMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8f4f8,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    })
    const room = new THREE.Mesh(roomGeometry, roomMaterial)
    scene.add(room)

    // Add some basic furniture
    const furniture = [
      { type: 'bed', x: -4, z: -4, color: 0x8B4513 },
      { type: 'sofa', x: 0, z: -4, color: 0x4169E1 },
      { type: 'table', x: 0, z: 0, color: 0xD2691E }
    ]

    furniture.forEach(item => {
      const geometry = new THREE.BoxGeometry(2, 1, 3)
      const material = new THREE.MeshStandardMaterial({ color: item.color })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(item.x, 0.5, item.z)
      scene.add(mesh)
    })

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])
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
    // This would integrate with Stripe
    alert('Payment processing - $19 per tour')
    setTourUrl(`https://realestate-tour-generator.vercel.app/tour/${Date.now()}`)
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

export default App