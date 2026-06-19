export const ROOM_COLORS = {
  walls: '#f5f0eb',
  floor: '#8B7355',
  ceiling: '#ffffff',
  baseboard: '#d4c5a9',
}

export const FURNITURE_CONFIG = {
  sofa: { width: 1.8, height: 0.8, depth: 0.8, color: '#4a6fa5', legs: true, cushions: true },
  bed: { width: 1.5, height: 0.5, depth: 2.0, color: '#6b8e6b', headboard: true },
  table: { width: 1.2, height: 0.7, depth: 0.8, color: '#8B7355', legs: true },
  chair: { width: 0.5, height: 0.9, depth: 0.5, color: '#c4956a', legs: true, backrest: true },
  lamp: { radius: 0.15, height: 1.2, color: '#d4a574', shadeColor: '#faf0dc', emissive: '#ffeedd' },
  plant: { radius: 0.25, height: 1.0, color: '#2d5a27', potColor: '#c0673c' },
  counter: { width: 2.0, height: 0.9, depth: 0.6, color: '#d1d8d0', topColor: '#e8e8e8' },
}

export const LIGHTING_PRESETS = {
  day: { ambientIntensity: 0.4, ambientColor: '#b4d0ff', directionalIntensity: 1.2, directionalColor: '#fff5e6', directionalPosition: [10, 15, 10], shadow: true, fillIntensity: 0.3, fillColor: '#8ec0ff' },
  night: { ambientIntensity: 0.1, ambientColor: '#1a1a3e', directionalIntensity: 0.3, directionalColor: '#446688', directionalPosition: [-5, 8, 5], shadow: true, fillIntensity: 0.5, fillColor: '#ffd700' },
  sunset: { ambientIntensity: 0.3, ambientColor: '#ffcc99', directionalIntensity: 0.8, directionalColor: '#ff7733', directionalPosition: [-8, 5, 12], shadow: true, fillIntensity: 0.4, fillColor: '#ffaa66' },
}
