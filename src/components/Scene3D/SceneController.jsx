import { useRef } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export function SceneController({ layout }) {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[
          layout.sceneWidth * 0.7,
          layout.wallHeight * 1.2,
          layout.sceneDepth * 1.0,
        ]}
        fov={55}
        near={0.1}
        far={100}
      />
      <OrbitControls
        target={[0, 0, 0]}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
        panSpeed={0.4}
        minDistance={2}
        maxDistance={Math.max(layout.sceneWidth, layout.sceneDepth) * 2.5}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.1}
        enablePan={true}
        screenSpacePanning={true}
      />
    </>
  )
}
