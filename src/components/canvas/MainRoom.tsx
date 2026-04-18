import { memo } from 'react'

/**
 * Module 1 placeholder — confirms canvas, lighting, and draw call baseline.
 * Replace with actual room GLTF in Module 3.
 */
const MainRoom = memo(function MainRoom() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Test cube — remove in Module 3 */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6366f1" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Desk placeholder */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#1e1e2e" roughness={0.8} />
      </mesh>

      {/* Keyboard placeholder */}
      <mesh position={[0, -0.52, 0.1]} receiveShadow>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color="#2a2a3e" roughness={0.6} />
      </mesh>

      <gridHelper args={[20, 20, '#222244', '#111122']} position={[0, -0.65, 0]} />
    </>
  )
})

export default MainRoom
