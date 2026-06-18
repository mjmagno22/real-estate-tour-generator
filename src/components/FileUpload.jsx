import { motion } from 'framer-motion'
import { Upload, FileImage, X } from 'lucide-react'

export function FileUpload({ onFileSelect, selectedFile, error }) {
  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      validateAndSelectFile(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) {
      validateAndSelectFile(file)
    }
  }

  const validateAndSelectFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      error('Please upload a JPG, PNG, or WebP image')
      return
    }

    if (file.size > maxSize) {
      error('File size must be less than 10MB')
      return
    }

    onFileSelect(file)
  }

  const removeFile = () => {
    onFileSelect(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Upload Your Floor Plan
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Upload a floor plan image and we'll transform it into an immersive 3D virtual tour
        in seconds. Supports JPG, PNG, and WebP formats up to 10MB.
      </p>

      {selectedFile ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-50 border-2 border-dashed border-green-300 rounded-2xl p-6"
        >
          <div className="relative inline-block">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Floor plan preview"
              className="max-w-md mx-auto rounded-xl shadow-lg"
            />
            <button
              onClick={removeFile}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-green-600 font-medium mt-4">
            ✓ {selectedFile.name} ready to process
          </p>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-2xl p-12 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:shadow-xl"
        >
          <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drop your floor plan here
          </h3>
          <p className="text-gray-600 mb-4">
            or click to browse files
          </p>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <FileImage className="w-5 h-5" />
            <span>Select File</span>
          </label>
          <p className="text-sm text-gray-500 mt-4">
            Supported formats: JPG, PNG, WebP • Max size: 10MB
          </p>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <p className="text-red-600 font-medium">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <FileImage className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
          <p className="text-sm text-gray-600">Advanced AI converts your floor plan into interactive 3D space</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
          <p className="text-sm text-gray-600">Get your 3D tour ready in minutes, not hours</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Professional</h4>
          <p className="text-sm text-gray-600">Cinematic quality virtual tours that impress buyers</p>
        </motion.div>
      </div>
    </motion.div>
  )
}