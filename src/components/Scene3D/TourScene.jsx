import { Environment, Sky, ContactShadows } from '@react-three/drei'
import { Room } from './Room'
import { Furniture } from './Furniture'
import { Lighting } from './Lighting'
import { SceneController } from './SceneController'

export function TourScene({ layout, lightingPreset = 'day' }) {
  return (
    <>
      <Lighting preset={lightingPreset} />
      <Environment preset="apartment" background={false} blur={0.5} />
      <Sky distance={450000} sunPosition={[10, 15, 10]} inclination={0.5} azimuth={0.25} />
      <Room layout={layout} />
      {layout.furniture?.map((item, index) => (
        <Furniture key={`${item.type}-${index}`} item={item} index={index} />
      ))}
      <ContactShadows
        position={[0, -layout.wallHeight / 2 + 0.01, 0]}
        opacity={0.4}
        scale={Math.max(layout.sceneWidth, layout.sceneDepth) * 1.5}
        blur={2.5}
        far={layout.wallHeight}
      />
      <SceneController layout={layout} />
    </>
  )
}
