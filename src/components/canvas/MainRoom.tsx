import { memo } from 'react'
import * as THREE from 'three'

/**
 * Full procedural room — NYC minimal loft aesthetic.
 * White walls, light gray concrete floor, dark desk, dual sky-blue monitors.
 * All geometry built from Three.js primitives — no GLTF required.
 *
 * Performance: ~40 draw calls, ~900 triangles — well within Module 3 budget.
 * Shadow casters: 1 directional light only (architecture rule).
 */
const MainRoom = memo(function MainRoom() {
  return (
    <>
      {/* ═══ LIGHTING ══════════════════════════════════════════════ */}

      {/* Diffuse fill — cool daylight white */}
      <ambientLight color="#EEF4FF" intensity={0.85} />

      {/* PRIMARY SHADOW CASTER — upper left, simulates window daylight */}
      <directionalLight
        position={[-5, 8, 3]}
        intensity={1.6}
        color="#FFFCF5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* Window sky bounce — cool blue fill from left wall window */}
      <pointLight position={[-4, 2.2, -1.2]} color="#B8D8FF" intensity={3} distance={12} decay={2} />

      {/* Monitor screen glow — subtle blue fill near desk */}
      <pointLight position={[0, 1.3, -2.6]} color="#4FC3F7" intensity={0.7} distance={2.8} decay={2} />

      {/* Desk lamp warm spot */}
      <pointLight position={[1.05, 1.18, -3.35]} color="#FFE8C0" intensity={1.4} distance={2.2} decay={2} />

      {/* ═══ FLOOR ═════════════════════════════════════════════════ */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#C9C7C1" roughness={0.88} metalness={0} />
      </mesh>

      {/* ═══ CEILING ═══════════════════════════════════════════════ */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1.0} metalness={0} />
      </mesh>

      {/* ═══ WALLS ═════════════════════════════════════════════════ */}
      {/* Back wall */}
      <mesh receiveShadow position={[0, 1.5, -4.5]}>
        <planeGeometry args={[9, 3]} />
        <meshStandardMaterial color="#F5F3EE" roughness={0.95} metalness={0} />
      </mesh>
      {/* Left wall */}
      <mesh receiveShadow rotation={[0, Math.PI / 2, 0]} position={[-4.5, 1.5, 0]}>
        <planeGeometry args={[9, 3]} />
        <meshStandardMaterial color="#F5F3EE" roughness={0.95} metalness={0} />
      </mesh>
      {/* Right wall */}
      <mesh receiveShadow rotation={[0, -Math.PI / 2, 0]} position={[4.5, 1.5, 0]}>
        <planeGeometry args={[9, 3]} />
        <meshStandardMaterial color="#F0EEE9" roughness={0.95} metalness={0} />
      </mesh>

      {/* ═══ BASEBOARD TRIM ════════════════════════════════════════ */}
      <mesh position={[0, 0.055, -4.48]}>
        <boxGeometry args={[9, 0.11, 0.025]} />
        <meshStandardMaterial color="#ECEAE4" roughness={0.9} />
      </mesh>
      <mesh position={[-4.48, 0.055, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[9, 0.11, 0.025]} />
        <meshStandardMaterial color="#ECEAE4" roughness={0.9} />
      </mesh>
      <mesh position={[4.48, 0.055, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[9, 0.11, 0.025]} />
        <meshStandardMaterial color="#ECEAE4" roughness={0.9} />
      </mesh>

      {/* ═══ WINDOW — left wall, large NYC pane ════════════════════ */}
      {/* Outer frame box — embedded flush with wall */}
      <mesh castShadow position={[-4.46, 1.85, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[2.9, 2.1, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.05} />
      </mesh>
      {/* Glass pane */}
      <mesh position={[-4.43, 1.85, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.72, 1.92]} />
        <meshStandardMaterial
          color="#C8E4FF"
          transparent
          opacity={0.42}
          roughness={0.0}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Horizontal divider */}
      <mesh position={[-4.435, 1.85, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[2.72, 0.05, 0.025]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      {/* Vertical divider */}
      <mesh position={[-4.435, 1.85, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.05, 1.92, 0.025]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      {/* Sky / city outside the window */}
      <mesh position={[-6.2, 1.85, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial
          color="#87C5E8"
          emissive="#5AAED4"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* ═══ DESK ══════════════════════════════════════════════════ */}
      {/* Desktop surface */}
      <mesh castShadow receiveShadow position={[0, 0.76, -3.1]}>
        <boxGeometry args={[2.6, 0.045, 0.88]} />
        <meshStandardMaterial color="#141414" roughness={0.22} metalness={0.12} />
      </mesh>
      {/* Left side panel leg */}
      <mesh castShadow receiveShadow position={[-1.23, 0.38, -3.1]}>
        <boxGeometry args={[0.045, 0.76, 0.88]} />
        <meshStandardMaterial color="#141414" roughness={0.22} metalness={0.12} />
      </mesh>
      {/* Right side panel leg */}
      <mesh castShadow receiveShadow position={[1.23, 0.38, -3.1]}>
        <boxGeometry args={[0.045, 0.76, 0.88]} />
        <meshStandardMaterial color="#141414" roughness={0.22} metalness={0.12} />
      </mesh>
      {/* Back modesty panel */}
      <mesh position={[0, 0.38, -3.54]}>
        <boxGeometry args={[2.6, 0.76, 0.04]} />
        <meshStandardMaterial color="#141414" roughness={0.22} metalness={0.12} />
      </mesh>

      {/* ═══ MONITOR 1 — left ══════════════════════════════════════ */}
      {/* Bezel */}
      <mesh castShadow position={[-0.58, 1.24, -3.52]}>
        <boxGeometry args={[0.66, 0.40, 0.030]} />
        <meshStandardMaterial color="#111111" roughness={0.35} metalness={0.35} />
      </mesh>
      {/* Screen emissive */}
      <mesh position={[-0.58, 1.24, -3.506]}>
        <boxGeometry args={[0.60, 0.34, 0.008]} />
        <meshStandardMaterial
          color="#0A1628"
          emissive="#4FC3F7"
          emissiveIntensity={0.58}
          roughness={0.04}
          metalness={0.1}
        />
      </mesh>
      {/* Stand neck */}
      <mesh position={[-0.58, 0.94, -3.48]}>
        <boxGeometry args={[0.042, 0.28, 0.042]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.45} metalness={0.4} />
      </mesh>
      {/* Stand base */}
      <mesh receiveShadow position={[-0.58, 0.785, -3.38]}>
        <boxGeometry args={[0.26, 0.026, 0.20]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.45} metalness={0.4} />
      </mesh>

      {/* ═══ MONITOR 2 — right ═════════════════════════════════════ */}
      {/* Bezel */}
      <mesh castShadow position={[0.58, 1.24, -3.52]}>
        <boxGeometry args={[0.66, 0.40, 0.030]} />
        <meshStandardMaterial color="#111111" roughness={0.35} metalness={0.35} />
      </mesh>
      {/* Screen emissive */}
      <mesh position={[0.58, 1.24, -3.506]}>
        <boxGeometry args={[0.60, 0.34, 0.008]} />
        <meshStandardMaterial
          color="#0A1628"
          emissive="#4FC3F7"
          emissiveIntensity={0.58}
          roughness={0.04}
          metalness={0.1}
        />
      </mesh>
      {/* Stand neck */}
      <mesh position={[0.58, 0.94, -3.48]}>
        <boxGeometry args={[0.042, 0.28, 0.042]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.45} metalness={0.4} />
      </mesh>
      {/* Stand base */}
      <mesh receiveShadow position={[0.58, 0.785, -3.38]}>
        <boxGeometry args={[0.26, 0.026, 0.20]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.45} metalness={0.4} />
      </mesh>

      {/* ═══ KEYBOARD (Module 4 will replace with interactive version) ═ */}
      <mesh castShadow receiveShadow position={[0, 0.793, -2.92]}>
        <boxGeometry args={[0.45, 0.019, 0.165]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.55} metalness={0.06} />
      </mesh>

      {/* ═══ MOUSE ═════════════════════════════════════════════════ */}
      <mesh castShadow position={[0.65, 0.787, -2.92]}>
        <boxGeometry args={[0.068, 0.026, 0.118]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} metalness={0.12} />
      </mesh>

      {/* ═══ DESK LAMP ═════════════════════════════════════════════ */}
      {/* Base */}
      <mesh receiveShadow position={[1.05, 0.784, -3.4]}>
        <cylinderGeometry args={[0.055, 0.07, 0.048, 8]} />
        <meshStandardMaterial color="#D0D0D0" roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Stem */}
      <mesh position={[1.05, 1.03, -3.4]}>
        <cylinderGeometry args={[0.013, 0.013, 0.44, 6]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Shade */}
      <mesh position={[1.05, 1.26, -3.36]}>
        <coneGeometry args={[0.135, 0.16, 8, 1, true]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* ═══ CHAIR ═════════════════════════════════════════════════ */}
      {/* Seat cushion */}
      <mesh castShadow receiveShadow position={[0, 0.52, -2.12]}>
        <boxGeometry args={[0.60, 0.072, 0.56]} />
        <meshStandardMaterial color="#282828" roughness={0.72} metalness={0} />
      </mesh>
      {/* Back rest */}
      <mesh castShadow position={[0, 1.02, -2.38]}>
        <boxGeometry args={[0.58, 0.80, 0.068]} />
        <meshStandardMaterial color="#242424" roughness={0.72} metalness={0} />
      </mesh>
      {/* Center hydraulic post */}
      <mesh position={[0, 0.27, -2.12]}>
        <cylinderGeometry args={[0.033, 0.044, 0.52, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.35} metalness={0.55} />
      </mesh>
      {/* Star base disk */}
      <mesh receiveShadow position={[0, 0.04, -2.12]}>
        <cylinderGeometry args={[0.27, 0.27, 0.042, 10]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.35} metalness={0.55} />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-0.34, 0.72, -2.18]}>
        <boxGeometry args={[0.052, 0.042, 0.36]} />
        <meshStandardMaterial color="#282828" roughness={0.65} metalness={0} />
      </mesh>
      {/* Right armrest */}
      <mesh position={[0.34, 0.72, -2.18]}>
        <boxGeometry args={[0.052, 0.042, 0.36]} />
        <meshStandardMaterial color="#282828" roughness={0.65} metalness={0} />
      </mesh>

      {/* ═══ FLOOR PLANT — right back corner ══════════════════════ */}
      {/* Terracotta pot */}
      <mesh castShadow receiveShadow position={[3.6, 0.23, -3.5]}>
        <cylinderGeometry args={[0.20, 0.14, 0.46, 12]} />
        <meshStandardMaterial color="#C07040" roughness={0.82} metalness={0} />
      </mesh>
      {/* Soil top */}
      <mesh position={[3.6, 0.47, -3.5]}>
        <cylinderGeometry args={[0.19, 0.19, 0.022, 12]} />
        <meshStandardMaterial color="#2A180A" roughness={1.0} metalness={0} />
      </mesh>
      {/* Main trunk */}
      <mesh position={[3.6, 0.92, -3.5]}>
        <cylinderGeometry args={[0.026, 0.033, 0.88, 6]} />
        <meshStandardMaterial color="#3D6B2A" roughness={0.88} metalness={0} />
      </mesh>
      {/* Top foliage — main cluster */}
      <mesh castShadow position={[3.6, 1.55, -3.5]}>
        <sphereGeometry args={[0.42, 9, 8]} />
        <meshStandardMaterial color="#2E6020" roughness={0.88} metalness={0} />
      </mesh>
      {/* Side foliage 1 */}
      <mesh castShadow position={[3.4, 1.30, -3.3]}>
        <sphereGeometry args={[0.25, 8, 7]} />
        <meshStandardMaterial color="#377228" roughness={0.88} metalness={0} />
      </mesh>
      {/* Side foliage 2 */}
      <mesh castShadow position={[3.82, 1.24, -3.68]}>
        <sphereGeometry args={[0.22, 8, 7]} />
        <meshStandardMaterial color="#2A5A1E" roughness={0.88} metalness={0} />
      </mesh>
    </>
  )
})

export default MainRoom
