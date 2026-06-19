import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileImage, X, CheckCircle } from 'lucide-react'
import { validateFile, createPreviewUrl, revokeObjectUrl, ACCEPTED_MIME_TYPES } from '../utils/validation'

export function FileUpload({ onFileSelect, selectedFile, onError, error }) {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (selectedFile) {
      const url = createPreviewUrl(selectedFile)
      setPreviewUrl(url)
      return () => revokeObjectUrl(url)
    }
    setPreviewUrl(null)
  }, [selectedFile])

  const handleValidation = useCallback((file) => {
    const result = validateFile(file)
    if (!result.valid) {
      onError(result.error)
      return false
    }
    return true
  }, [onError])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0 && handleValidation(files[0])) {
      onFileSelect(files[0])
      onError(null)
    }
  }, [onFileSelect, onError, handleValidation])

  const handleDragOver = useCallback((e) => e.preventDefault(), [])
  const handleDragEnter = useCallback((e) => { e.preventDefault(); setIsDragging(true) }, [])
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false) }, [])

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0]
    if (file && handleValidation(file)) {
      onFileSelect(file)
      onError(null)
    }
  }, [onFileSelect, onError, handleValidation])

  const handleRemoveFile = useCallback(() => { onFileSelect(null); onError(null) }, [onFileSelect, onError])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      document.getElementById('file-upload-input')?.click()
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upload Your Floor Plan</h2>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
        Upload a floor plan image and we'll transform it into an immersive 3D virtual tour
        in seconds. Supports JPG, PNG, and WebP formats up to 10MB.
      </p>

      {selectedFile && previewUrl ? (
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-50 border-2 border-dashed border-green-300 rounded-2xl p-4 sm:p-6">
          <div className="relative inline-block max-w-full">
            <img src={previewUrl} alt="Floor plan preview"
              className="max-w-full sm:max-w-md mx-auto rounded-xl shadow-lg h-auto max-h-64 sm:max-h-96 object-contain" />
            <button onClick={handleRemoveFile}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 sm:p-2 shadow-lg transition-colors"
              aria-label="Remove file">
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-green-600 font-medium">{selectedFile.name} ready to process</p>
          </div>
        </motion.div>
      ) : (
        <div role="button" tabIndex={0} aria-label="Upload floor plan image"
          onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave} onKeyDown={handleKeyDown}
          onClick={() => document.getElementById('file-upload-input')?.click()}
          className={`bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed rounded-2xl p-8 sm:p-12 cursor-pointer transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50 shadow-xl scale-[1.02]' : 'border-blue-300 hover:border-blue-400 hover:shadow-xl'}`}>
          <Upload className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 transition-colors ${isDragging ? 'text-blue-600' : 'text-blue-500'}`} />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{isDragging ? 'Drop your file here' : 'Drop your floor plan here'}</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">or click to browse files</p>
          <input type="file" id="file-upload-input" accept={ACCEPTED_MIME_TYPES}
            onChange={handleFileInput} className="hidden" aria-hidden="true" />
          <label htmlFor="file-upload-input"
            className="btn-primary inline-flex items-center space-x-2 cursor-pointer"
            onClick={(e) => e.stopPropagation()}>
            <FileImage className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Select File</span>
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mt-4">Supported formats: JPG, PNG, WebP • Max size: 10MB</p>
        </div>
      )}

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" role="alert">
          <p className="text-red-600 font-medium text-sm">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl mx-auto">
        <FeatureCard icon={<FileImage className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          title="AI-Powered" description="Advanced AI converts your floor plan into interactive 3D space" bgColor="bg-blue-100" />
        <FeatureCard icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
          title="Instant Results" description="Get your 3D tour ready in minutes, not hours" bgColor="bg-green-100" />
        <FeatureCard icon={<span className="text-xl sm:text-2xl">🏠</span>}
          title="Professional" description="Cinematic quality virtual tours that impress buyers" bgColor="bg-purple-100" />
      </div>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-left">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-xl flex items-center justify-center mb-3 sm:mb-4`}>{icon}</div>
      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </motion.div>
  )
}
