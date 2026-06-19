function generateDefaultLayout() {
  return {
    sourceFile: null,
    imageWidth: 800,
    imageHeight: 600,
    aspectRatio: 4 / 3,
    rooms: [
      { id: 'living-room', name: 'Living Room', color: '#e8dcc8', x: -2, z: -2, width: 5, depth: 4, wallHeight: 3.0 },
      { id: 'bedroom', name: 'Bedroom', color: '#d4c5a9', x: 3, z: -2, width: 4, depth: 4, wallHeight: 3.0 },
      { id: 'kitchen', name: 'Kitchen', color: '#d1d8d0', x: -2, z: 3, width: 4, depth: 3.5, wallHeight: 3.0 },
    ],
    furniture: [
      { type: 'sofa', x: 0, z: -1, rotation: 0, color: '#4a6fa5' },
      { type: 'table', x: 0.5, z: 0.5, rotation: 0, color: '#8B7355' },
      { type: 'bed', x: 4.5, z: -1, rotation: 0, color: '#6b8e6b' },
      { type: 'chair', x: -0.5, z: 1, rotation: 0.5, color: '#c4956a' },
      { type: 'lamp', x: -1, z: -1.5, rotation: 0, color: '#d4a574' },
    ],
    sceneWidth: 10,
    sceneDepth: 8,
    wallHeight: 3.0,
  }
}

export function analyzeFloorPlan(file) {
  return new Promise((resolve) => {
    if (!file) return resolve(generateDefaultLayout())
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const aspect = img.width / img.height
      const w = Math.max(8, Math.round(aspect * 6))
      const d = Math.max(6, Math.round(6 / aspect))
      resolve({
        sourceFile: file.name,
        imageWidth: img.width,
        imageHeight: img.height,
        aspectRatio: aspect,
        rooms: [
          { id: 'main', name: 'Main Room', color: '#e8dcc8', x: 0, z: 0, width: w * 0.5, depth: d * 0.5, wallHeight: 3.0 },
          { id: 'bedroom', name: 'Bedroom', color: '#d4c5a9', x: w * 0.3, z: 0, width: w * 0.3, depth: d * 0.4, wallHeight: 3.0 },
        ],
        furniture: [
          { type: 'sofa', x: 0, z: -1, rotation: 0, color: '#4a6fa5' },
          { type: 'table', x: 0.5, z: 0.5, rotation: 0, color: '#8B7355' },
          { type: 'bed', x: 1.5, z: 0, rotation: 0, color: '#6b8e6b' },
          { type: 'chair', x: -1, z: 1.5, rotation: 0.5, color: '#c4956a' },
          { type: 'lamp', x: -2, z: -1.5, rotation: 0, color: '#d4a574' },
          { type: 'plant', x: 2, z: -2, rotation: 0, color: '#2d5a27' },
        ],
        sceneWidth: w,
        sceneDepth: d,
        wallHeight: 3.0,
      })
    }
    img.onerror = () => resolve(generateDefaultLayout())
    img.src = url
  })
}

export function generateTourId() {
  return Array.from({ length: 12 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('')
}
