export function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm text-gray-300">Loading 3D scene...</p>
    </div>
  )
}
