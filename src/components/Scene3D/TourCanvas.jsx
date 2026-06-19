import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { TourScene } from './TourScene'
import { LoadingFallback } from './LoadingFallback'
import { ErrorFallback } from './ErrorFallback'

export function TourCanvas({ layout, lightingPreset = 'day', showStats = false }) {
  const [hasError, setHasError] = useState(false)
  const [renderKey, setRenderKey] = useState(0)

  if (hasError) {
    return (
      <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
        <ErrorFallback onRetry={() => { setHasError(false); setRenderKey(k => k + 1) }} />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900" key={renderKey}>
      <Canvas
        shadows
        camera={{
          position: [layout.sceneWidth * 0.8, layout.wallHeight * 1.5, layout.sceneDepth * 1.2],
          fov: 55,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true, toneMapping: 3, toneMappingExposure: 1.0 }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={<LoadingFallback />}>
          <TourScene layout={layout} lightingPreset={lightingPreset} />
        </Suspense>
        {showStats && import.meta.env?.DEV && <Stats />}
      </Canvas>
    </div>
  )
}
