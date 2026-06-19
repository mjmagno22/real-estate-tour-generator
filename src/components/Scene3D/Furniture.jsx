import { FURNITURE_CONFIG } from '../../constants/scene'

export function Furniture({ item, index }) {
  const config = FURNITURE_CONFIG[item.type]
  if (!config) return null

  return (
    <group position={[item.x, 0, item.z]} rotation={[0, item.rotation ?? 0, 0]}>
      {item.type === 'sofa' && <Sofa config={config} color={item.color} />}
      {item.type === 'bed' && <Bed config={config} color={item.color} />}
      {item.type === 'table' && <Table config={config} color={item.color} />}
      {item.type === 'chair' && <Chair config={config} color={item.color} />}
      {item.type === 'lamp' && <Lamp config={config} />}
      {item.type === 'plant' && <Plant config={config} />}
    </group>
  )
}

function Sofa({ config, color }) {
  const { width, height, depth } = config
  return (
    <group>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial color={color} roughness={0.8} clearcoat={0.05} />
      </mesh>
      <mesh position={[0, height / 2 + height * 0.25, -depth / 2 + 0.05]} castShadow>
        <boxGeometry args={[width * 0.95, height * 0.5, 0.15]} />
        <meshPhysicalMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[-width / 2 + 0.1, height / 2 - 0.05, 0]} castShadow>
        <boxGeometry args={[0.1, height * 0.6, depth * 0.8]} />
        <meshPhysicalMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[width / 2 - 0.1, height / 2 - 0.05, 0]} castShadow>
        <boxGeometry args={[0.1, height * 0.6, depth * 0.8]} />
        <meshPhysicalMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  )
}

function Bed({ config, color }) {
  const { width, height, depth } = config
  return (
    <group>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial color="#f5f0eb" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
        <meshPhysicalMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, height / 2 + 0.3, -depth / 2 - 0.05]} castShadow>
        <boxGeometry args={[width + 0.2, 0.6, 0.1]} />
        <meshPhysicalMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[-width / 4, height / 2 + 0.1, -depth / 4]} castShadow>
        <boxGeometry args={[width * 0.35, 0.12, depth * 0.25]} />
        <meshPhysicalMaterial color="#fff" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Table({ config, color }) {
  const { width, height, depth } = config
  const legs = [[-0.5, 0, -0.35], [0.5, 0, -0.35], [-0.5, 0, 0.35], [0.5, 0, 0.35]]
  return (
    <group>
      <mesh position={[0, height, 0]} castShadow>
        <boxGeometry args={[width, 0.05, depth]} />
        <meshPhysicalMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {legs.map((pos, i) => (
        <mesh key={i} position={[pos[0] * width * 0.4, height / 2, pos[2] * depth * 0.4]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, height, 8]} />
          <meshPhysicalMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

function Chair({ config, color }) {
  const { width, height, depth } = config
  return (
    <group>
      <mesh position={[0, height * 0.4, 0]} castShadow>
        <boxGeometry args={[width, 0.08, depth]} />
        <meshPhysicalMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, height * 0.7, -depth / 2]} castShadow>
        <boxGeometry args={[width * 0.8, height * 0.5, 0.05]} />
        <meshPhysicalMaterial color={color} roughness={0.7} />
      </mesh>
      {[[-0.2, 0, -0.2], [0.2, 0, -0.2], [-0.2, 0, 0.2], [0.2, 0, 0.2]].map((pos, i) => (
        <mesh key={i} position={[pos[0], height * 0.2, pos[2]]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, height * 0.4, 6]} />
          <meshPhysicalMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Lamp({ config }) {
  const { radius, height, color, shadeColor, emissive } = config
  return (
    <group>
      <mesh position={[0, height * 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, height * 0.8, 8]} />
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[radius * 1.5, radius * 2, 0.06, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, height * 0.85, 0]} castShadow>
        <cylinderGeometry args={[radius * 2, radius * 0.5, height * 0.2, 12]} />
        <meshPhysicalMaterial color={shadeColor} roughness={0.9} transparent opacity={0.85} emissive={emissive} emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

function Plant({ config }) {
  const { radius, height, color, potColor } = config
  return (
    <group>
      <mesh position={[0, height * 0.15, 0]} castShadow>
        <cylinderGeometry args={[radius * 0.7, radius * 0.9, height * 0.3, 12]} />
        <meshPhysicalMaterial color={potColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, height * 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, height * 0.4, 6]} />
        <meshPhysicalMaterial color="#4a3520" roughness={0.9} />
      </mesh>
      <mesh position={[0, height * 0.7, 0]} castShadow>
        <sphereGeometry args={[radius * 1.2, 12, 12]} />
        <meshPhysicalMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  )
}
