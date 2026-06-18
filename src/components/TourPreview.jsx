import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle, Eye, Download, Share2 } from 'lucide-react'

export function TourPreview({ file, isGenerating, tourData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Generate Your 3D Virtual Tour
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Our AI technology will transform your floor plan into an immersive 3D virtual tour
        with realistic lighting, furniture placement, and interactive navigation.
      </p>

      {/* Preview Area */}
      <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl p-8 mb-8">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Loader2 className="w-full h-full text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Generating Your 3D Tour...
              </h3>
              <p className="text-gray-600">
                Creating immersive experience from your floor plan
              </p>
              <div className="mt-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing floor plan</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : tourData ? (
            <motion.div
              key="generated"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="relative mx-auto" style={{ maxWidth: '600px' }}>
                {/* 3D Tour Preview */}
                <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Room Preview */}
                  <div className="relative h-96">
                    <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl">
                      {/* Floor */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-xl"></div>

                      {/* Walls */}
                      <div className="absolute top-0 left-0 w-2 h-full bg-slate-700/50"></div>
                      <div className="absolute top-0 right-0 w-2 h-full bg-slate-700/50"></div>

                      {/* Furniture */}
                      <div className="absolute bottom-8 left-8 w-16 h-12 bg-gradient-to-r from-amber-700 to-amber-500 rounded-lg shadow-lg"></div>
                      <div className="absolute bottom-8 right-12 w-20 h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg"></div>
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-r from-green-600 to-green-400 rounded-lg shadow-lg"></div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Success Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Tour Ready!</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Eye className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Generate Tour
              </h3>
              <p className="text-gray-600 mb-6">
                Click "Generate Tour" to create your 3D virtual experience
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tour Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <div className="text-2xl font-bold text-blue-600 mb-1">3D</div>
          <div className="text-sm text-gray-600">Virtual Tour</div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <div className="text-2xl font-bold text-green-600 mb-1">360°</div>
          <div className="text-sm text-gray-600">Full View</div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <div className="text-2xl font-bold text-purple-600 mb-1">HD</div>
          <div className="text-sm text-gray-600">Quality</div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <div className="text-2xl font-bold text-orange-600 mb-1">Instant</div>
          <div className="text-sm text-gray-600">Delivery</div>
        </motion.div>
      </div>
    </motion.div>
  )
}