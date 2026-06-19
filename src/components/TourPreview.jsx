import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Eye, Maximize2, Navigation, RotateCcw } from 'lucide-react'
import { TourCanvas } from './Scene3D'

export function TourPreview({ file, isGenerating, tourData, layout, onGenerate }) {
  const [lightingPreset, setLightingPreset] = useState('day')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const sceneLayout = layout || {
    sceneWidth: 10, sceneDepth: 8, wallHeight: 3.0,
    sourceFile: null, rooms: [], furniture: [],
  }

  const toggleFullscreen = useCallback(() => {
    const el = document.getElementById('tour-canvas-container')
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement) setIsFullscreen(false) }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Explore Your 3D Virtual Tour</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
        Navigate through your interactive 3D space. Drag to rotate, scroll to zoom,
        and explore every corner of your property.
      </p>

      <div id="tour-canvas-container"
        className={`relative rounded-2xl overflow-hidden bg-gray-900 transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full h-[400px] sm:h-[500px]'}`}>
        <TourCanvas layout={sceneLayout} lightingPreset={lightingPreset} showStats={false} />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-xl px-3 py-2">
          <button onClick={() => setLightingPreset('day')}
            className={`p-2 rounded-lg transition-colors ${lightingPreset === 'day' ? 'bg-yellow-500/30 text-yellow-300' : 'text-white/70 hover:bg-white/10'}`}
            title="Day lighting"><Sun className="w-4 h-4" /></button>
          <button onClick={() => setLightingPreset('night')}
            className={`p-2 rounded-lg transition-colors ${lightingPreset === 'night' ? 'bg-blue-500/30 text-blue-300' : 'text-white/70 hover:bg-white/10'}`}
            title="Night lighting"><Moon className="w-4 h-4" /></button>
          <button onClick={() => setLightingPreset('sunset')}
            className={`p-2 rounded-lg transition-colors ${lightingPreset === 'sunset' ? 'bg-orange-500/30 text-orange-300' : 'text-white/70 hover:bg-white/10'}`}
            title="Sunset lighting"><Eye className="w-4 h-4" /></button>
          <div className="w-px h-5 bg-white/20 mx-1" />
          <button onClick={toggleFullscreen}
            className="p-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {isGenerating && (
          <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white text-lg font-semibold mb-2">Generating Your 3D Tour...</p>
              <p className="text-gray-400 text-sm">Creating immersive experience from your floor plan</p>
              <div className="mt-6 max-w-xs mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-gray-300">Processing floor plan</span><span className="text-green-400">✓</span></div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <motion.div className="bg-blue-500 h-1.5 rounded-full"
                      initial={{ width: 0 }} animate={{ width: '100%' }}
                      transition={{ duration: 2.5, ease: 'easeInOut' }} />
                  </div>
                  <p className="text-xs text-gray-500">Building 3D geometry & lighting</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tourData && !isGenerating && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg text-sm">
              <Navigation className="w-4 h-4" /><span>Interactive Tour Ready</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {!tourData && !isGenerating && (
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onGenerate} className="btn-primary text-lg px-10 py-4">
            Generate 3D Tour
          </motion.button>
        )}
        {tourData && (
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="btn-secondary flex items-center space-x-2">
            <RotateCcw className="w-4 h-4" /><span>Reset View</span>
          </motion.button>
        )}
      </div>

      {!isGenerating && (
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center space-x-4 text-xs text-gray-500 bg-gray-50 rounded-xl px-4 py-2">
            <span>🖱 Drag to rotate</span>
            <span className="hidden sm:inline">🔍 Scroll to zoom</span>
            <span>✋ Right-drag to pan</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
