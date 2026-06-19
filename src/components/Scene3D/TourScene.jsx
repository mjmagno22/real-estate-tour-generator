import { Environment, ContactShadows } from '@react-three/drei'
import { Room } from './Room'
import { Furniture } from './Furniture'
import { Lighting } from './Lighting'
import { SceneController } from './SceneController'

export function TourScene({ layout, lightingPreset = 'day' }) {
  const maxDim = Math.max(layout.sceneWidth, layout.sceneDepth)

  return (
    <>
      <Lighting preset={lightingPreset} />
      <Environment preset="apartment" background={false} blur={0.5} />
      <Room layout={layout} />
      {layout.furniture?.length > 0 && layout.furniture.map((item, i) => (
        <Furniture key={`${item.type}-${i}`} item={item} index={i} />
      ))}
      <ContactShadows
        position={[0, -layout.wallHeight / 2 + 0.01, 0]}
        opacity={0.4}
        scale={maxDim * 1.5}
        blur={2.5}
        far={layout.wallHeight}
      />
      <SceneController layout={layout} />
    </>
  )
}
