import * as THREE from 'three'
import { LIGHTING_PRESETS } from '../../constants/scene'

export function Lighting({ preset = 'day' }) {
  const config = LIGHTING_PRESETS[preset] || LIGHTING_PRESETS.day
  const sunPos = new THREE.Vector3(...config.directionalPosition)

  return (
    <>
      <ambientLight intensity={config.ambientIntensity} color={config.ambientColor} />
      <directionalLight
        position={sunPos}
        intensity={config.directionalIntensity}
        color={config.directionalColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.001}
      />
      <directionalLight
        position={sunPos.clone().multiplyScalar(-0.5)}
        intensity={config.fillIntensity}
        color={config.fillColor}
      />
      <hemisphereLight args={['#87ceeb', '#3e2723', 0.3]} />
    </>
  )
}
