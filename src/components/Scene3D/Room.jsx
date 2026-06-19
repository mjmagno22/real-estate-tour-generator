import { useMemo } from 'react'
import * as THREE from 'three'
import { ROOM_COLORS } from '../../constants/scene'

function createFloorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#8B7355'
  ctx.fillRect(0, 0, 512, 512)
  for (let i = 0; i < 16; i++) {
    const y = i * 32
    ctx.strokeStyle = i % 2 === 0 ? '#7a6448' : '#9a8262'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}

function Wall({ position, rotation = [0, 0, 0], length, height }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow castShadow>
      <boxGeometry args={[0.12, height, length]} />
      <meshPhysicalMaterial color={ROOM_COLORS.walls} roughness={0.6} metalness={0.0} />
    </mesh>
  )
}

function RoomDivider({ room, height }) {
  const { x, z, width, depth, color } = room
  return (
    <group>
      <mesh position={[x, -height / 2 + 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * 0.98, depth * 0.98]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      <mesh position={[x - width / 2, 0, z]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.12, height, depth]} />
        <meshPhysicalMaterial color={ROOM_COLORS.walls} roughness={0.6} />
      </mesh>
      <mesh position={[x + width / 2, 0, z]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.12, height, depth]} />
        <meshPhysicalMaterial color={ROOM_COLORS.walls} roughness={0.6} />
      </mesh>
      <mesh position={[x, 0, z - depth / 2]}>
        <boxGeometry args={[width, height, 0.12]} />
        <meshPhysicalMaterial color={ROOM_COLORS.walls} roughness={0.6} />
      </mesh>
      <mesh position={[x, 0, z + depth / 2]}>
        <boxGeometry args={[width, height, 0.12]} />
        <meshPhysicalMaterial color={ROOM_COLORS.walls} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function Room({ layout }) {
  const { sceneWidth, sceneDepth, wallHeight, rooms } = layout

  const floorTexture = useMemo(() => createFloorTexture(), [])

  const floorMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: ROOM_COLORS.floor,
    roughness: 0.7,
    metalness: 0.0,
    map: floorTexture,
  }), [floorTexture])

  const walls = useMemo(() => {
    if (rooms && rooms.length > 0) {
      return rooms.map(r => <RoomDivider key={r.id} room={r} height={wallHeight} />)
    }
    return null
  }, [rooms, wallHeight])

  return (
    <group>
      <mesh position={[0, -wallHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={floorMaterial}>
        <planeGeometry args={[sceneWidth, sceneDepth]} />
      </mesh>

      {walls}

      <Wall position={[-sceneWidth / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={sceneDepth} height={wallHeight} />
      <Wall position={[sceneWidth / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} length={sceneDepth} height={wallHeight} />
      <Wall position={[0, 0, -sceneDepth / 2]} length={sceneWidth} height={wallHeight} />
      <Wall position={[0, 0, sceneDepth / 2]} rotation={[0, Math.PI, 0]} length={sceneWidth} height={wallHeight} />
    </group>
  )
}
