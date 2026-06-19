import { AlertTriangle, RefreshCw } from 'lucide-react'

export function ErrorFallback({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white p-8">
      <AlertTriangle className="w-12 h-12 text-yellow-400 mb-4" />
      <p className="text-lg font-semibold mb-2">3D Scene Error</p>
      <p className="text-sm text-gray-400 mb-6 text-center">
        Something went wrong loading the 3D scene.
        This may be due to WebGL compatibility.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Retry</span>
      </button>
    </div>
  )
}
