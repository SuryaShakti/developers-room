import { memo } from 'react'
import * as THREE from 'three'

/**
 * Developer battlestation — Gurgaon night aesthetic.
 * Dark charcoal walls, near-black floor, monitor glow as primary light,
 * warm amber LED strip, city window on back wall, platform bed on left.
 * ~48 draw calls — within the ≤50 budget.
 */
const MainRoom = memo(function MainRoom() {
  return (
    <>
      {/* Scene background — prevents transparent canvas edges */}
      <color attach="background" args={['#050508']} />

      {/* ═══ LIGHTING — glow-driven, no directional shadow caster ═══ */}

      {/* Barely-visible ambient — deep purple-black base */}
      <ambientLight color="#0a0510" intensity={0.15} />

      {/* Monitor screen glow — PRIMARY light, cool blue */}
      <pointLight position={[0.5, 1.35, -3.2]} color="#3a6fff" intensity={2.2} distance={4.2} decay={2} />

      {/* LED strip behind monitors — warm amber */}
      <pointLight position={[0.6, 0.88, -4.0]} color="#ff8833" intensity={1.3} distance={2.6} decay={2} />

      {/* Under-desk RGB — purple accent strip */}
      <pointLight position={[0.6, 0.58, -3.1]} color="#7700ff" intensity={0.9} distance={3.0} decay={2} />

      {/* City window — cool deep blue bleed */}
      <pointLight position={[2.2, 1.6, -4.1]} color="#1a2a4a" intensity={1.0} distance={5.5} decay={2} />

      {/* Bed side — very dim warm fill so it's not invisible */}
      <pointLight position={[-3.2, 1.2, -1.8]} color="#3a1800" intensity={0.5} distance={4.0} decay={2} />

      {/* Coffee mug steam warmth */}
      <pointLight position={[-0.75, 0.95, -3.3]} color="#ff4400" intensity={0.28} distance={0.7} decay={2} />

      {/* ═══ ROOM SHELL ══════════════════════════════════════════════ */}

      {/* Floor — near-black warm concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#0d0c0b" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color="#0e0e0e" roughness={1.0} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.5, -4.5]}>
        <planeGeometry args={[9, 3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>

      {/* Left wall — DoubleSide so entrance angle doesn't bleed */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-4.5, 1.5, 0]}>
        <planeGeometry args={[9, 3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[4.5, 1.5, 0]}>
        <planeGeometry args={[9, 3]} />
        <meshStandardMaterial color="#181818" roughness={0.95} />
      </mesh>

      {/* ═══ NIGHT CITY WINDOW — back wall, right side ════════════════ */}

      {/* Frame */}
      <mesh position={[2.1, 1.55, -4.47]}>
        <boxGeometry args={[2.8, 2.5, 0.06]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Glass — deep navy, barely transparent */}
      <mesh position={[2.1, 1.55, -4.44]}>
        <planeGeometry args={[2.62, 2.3]} />
        <meshStandardMaterial
          color="#030810"
          emissive="#0a1830"
          emissiveIntensity={0.55}
          transparent
          opacity={0.92}
          roughness={0.0}
          metalness={0.25}
        />
      </mesh>

      {/* City backdrop — deep dark sky with distant glow */}
      <mesh position={[2.1, 1.55, -5.6]}>
        <planeGeometry args={[3.2, 3.0]} />
        <meshStandardMaterial
          color="#010610"
          emissive="#0c1f3f"
          emissiveIntensity={1.4}
        />
      </mesh>

      {/* City light cluster — simulated glow patch */}
      <mesh position={[2.4, 1.1, -5.5]}>
        <planeGeometry args={[1.2, 0.7]} />
        <meshStandardMaterial
          color="#050f1a"
          emissive="#1a3c60"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* ═══ DESK — corner setup, right-of-center ════════════════════ */}

      {/* Main surface — wide, pushed toward back wall */}
      <mesh position={[0.6, 0.76, -3.5]}>
        <boxGeometry args={[3.6, 0.045, 1.2]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.18} metalness={0.22} />
      </mesh>

      {/* Left leg panel */}
      <mesh position={[-1.18, 0.38, -3.5]}>
        <boxGeometry args={[0.045, 0.76, 1.2]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.18} metalness={0.22} />
      </mesh>

      {/* Right leg panel */}
      <mesh position={[2.38, 0.38, -3.5]}>
        <boxGeometry args={[0.045, 0.76, 1.2]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.18} metalness={0.22} />
      </mesh>

      {/* Back modesty panel */}
      <mesh position={[0.6, 0.38, -4.08]}>
        <boxGeometry args={[3.6, 0.76, 0.04]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.18} metalness={0.22} />
      </mesh>

      {/* Under-desk LED strip — purple glow edge */}
      <mesh position={[0.6, 0.748, -2.92]}>
        <boxGeometry args={[3.55, 0.007, 0.01]} />
        <meshStandardMaterial color="#000" emissive="#9900ff" emissiveIntensity={3.0} />
      </mesh>

      {/* ═══ MONITOR 1 — primary wide display ═══════════════════════ */}

      {/* Bezel */}
      <mesh position={[0.1, 1.38, -3.93]}>
        <boxGeometry args={[1.22, 0.70, 0.034]} />
        <meshStandardMaterial color="#080808" roughness={0.25} metalness={0.55} />
      </mesh>

      {/* Screen — glowing deep blue */}
      <mesh position={[0.1, 1.38, -3.915]}>
        <boxGeometry args={[1.12, 0.62, 0.008]} />
        <meshStandardMaterial
          color="#030c1c"
          emissive="#1a3a6a"
          emissiveIntensity={1.6}
          roughness={0.02}
          metalness={0.08}
        />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0.1, 0.945, -3.88]}>
        <boxGeometry args={[0.044, 0.28, 0.044]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0.1, 0.787, -3.76]}>
        <boxGeometry args={[0.30, 0.026, 0.24]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* ═══ MONITOR 2 — portrait (vertical) ════════════════════════ */}

      {/* Bezel */}
      <mesh position={[1.58, 1.38, -3.93]}>
        <boxGeometry args={[0.46, 0.74, 0.034]} />
        <meshStandardMaterial color="#080808" roughness={0.25} metalness={0.55} />
      </mesh>

      {/* Screen */}
      <mesh position={[1.58, 1.38, -3.915]}>
        <boxGeometry args={[0.38, 0.66, 0.008]} />
        <meshStandardMaterial
          color="#030c1c"
          emissive="#1a3a6a"
          emissiveIntensity={1.6}
          roughness={0.02}
          metalness={0.08}
        />
      </mesh>

      {/* Stand neck */}
      <mesh position={[1.58, 0.945, -3.88]}>
        <boxGeometry args={[0.044, 0.28, 0.044]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* Stand base */}
      <mesh position={[1.58, 0.787, -3.76]}>
        <boxGeometry args={[0.24, 0.026, 0.20]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* ═══ KEYBOARD ════════════════════════════════════════════════ */}
      <mesh position={[0, 0.793, -2.92]}>
        <boxGeometry args={[0.48, 0.018, 0.172]} />
        <meshStandardMaterial color="#111111" roughness={0.55} metalness={0.08} />
      </mesh>

      {/* ═══ MOUSE ═══════════════════════════════════════════════════ */}
      <mesh position={[0.72, 0.789, -2.92]}>
        <boxGeometry args={[0.072, 0.025, 0.122]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.38} metalness={0.12} />
      </mesh>

      {/* ═══ COFFEE MUG ══════════════════════════════════════════════ */}
      <mesh position={[-0.72, 0.812, -3.28]}>
        <cylinderGeometry args={[0.036, 0.030, 0.082, 10]} />
        <meshStandardMaterial color="#EEEEEE" roughness={0.28} metalness={0.04} />
      </mesh>
      {/* Glowing rim — suggests hot coffee */}
      <mesh position={[-0.72, 0.857, -3.28]}>
        <cylinderGeometry args={[0.034, 0.034, 0.005, 10]} />
        <meshStandardMaterial color="#000" emissive="#ff6020" emissiveIntensity={1.4} />
      </mesh>

      {/* ═══ HEADPHONES — resting on desk ═══════════════════════════ */}
      <mesh position={[-0.28, 0.834, -3.72]}>
        <boxGeometry args={[0.20, 0.030, 0.048]} />
        <meshStandardMaterial color="#181818" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[-0.37, 0.812, -3.72]}>
        <boxGeometry args={[0.052, 0.062, 0.052]} />
        <meshStandardMaterial color="#141414" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[-0.19, 0.812, -3.72]}>
        <boxGeometry args={[0.052, 0.062, 0.052]} />
        <meshStandardMaterial color="#141414" roughness={0.45} metalness={0.35} />
      </mesh>

      {/* ═══ iPHONE — face-down desk ═════════════════════════════════ */}
      <mesh position={[0.44, 0.787, -3.22]}>
        <boxGeometry args={[0.078, 0.009, 0.162]} />
        <meshStandardMaterial color="#1C1C1E" roughness={0.10} metalness={0.55} />
      </mesh>

      {/* ═══ DESK SUCCULENT — tiny, on desk surface ══════════════════ */}
      <mesh position={[-0.88, 0.802, -3.78]}>
        <cylinderGeometry args={[0.030, 0.024, 0.052, 8]} />
        <meshStandardMaterial color="#7a3a18" roughness={0.9} />
      </mesh>
      <mesh position={[-0.88, 0.852, -3.78]}>
        <sphereGeometry args={[0.044, 7, 6]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.92} />
      </mesh>

      {/* ═══ CHAIR — high-back, dark ══════════════════════════════════ */}
      <mesh position={[0, 0.50, -2.12]}>
        <boxGeometry args={[0.62, 0.07, 0.58]} />
        <meshStandardMaterial color="#181818" roughness={0.82} />
      </mesh>
      <mesh position={[0, 1.08, -2.40]}>
        <boxGeometry args={[0.60, 0.96, 0.07]} />
        <meshStandardMaterial color="#151515" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.26, -2.12]}>
        <cylinderGeometry args={[0.032, 0.044, 0.50, 7]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.28} metalness={0.62} />
      </mesh>
      <mesh position={[0, 0.03, -2.12]}>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 8]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.28} metalness={0.62} />
      </mesh>
      <mesh position={[-0.35, 0.70, -2.18]}>
        <boxGeometry args={[0.050, 0.040, 0.38]} />
        <meshStandardMaterial color="#181818" roughness={0.75} />
      </mesh>
      <mesh position={[0.35, 0.70, -2.18]}>
        <boxGeometry args={[0.050, 0.040, 0.38]} />
        <meshStandardMaterial color="#181818" roughness={0.75} />
      </mesh>

      {/* ═══ BED — low platform, against left wall ═══════════════════ */}
      <mesh position={[-3.2, 0.20, -2.3]}>
        <boxGeometry args={[2.5, 0.20, 2.0]} />
        <meshStandardMaterial color="#111111" roughness={0.65} metalness={0.08} />
      </mesh>
      <mesh position={[-3.2, 0.38, -2.3]}>
        <boxGeometry args={[2.3, 0.20, 1.82]} />
        <meshStandardMaterial color="#1c1614" roughness={0.95} />
      </mesh>
      <mesh position={[-3.2, 0.51, -3.15]}>
        <boxGeometry args={[1.7, 0.10, 0.44]} />
        <meshStandardMaterial color="#242020" roughness={0.95} />
      </mesh>
      <mesh position={[-3.1, 0.50, -1.6]}>
        <boxGeometry args={[1.9, 0.14, 0.65]} />
        <meshStandardMaterial color="#1a1818" roughness={0.95} />
      </mesh>

      {/* ═══ WALL POSTERS — back wall, left side ═════════════════════ */}
      <mesh position={[-3.4, 2.12, -4.47]}>
        <boxGeometry args={[0.65, 0.90, 0.018]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.8} />
      </mesh>
      <mesh position={[-3.4, 2.12, -4.46]}>
        <planeGeometry args={[0.57, 0.82]} />
        <meshStandardMaterial color="#080812" emissive="#151528" emissiveIntensity={0.35} />
      </mesh>

      <mesh position={[-2.55, 2.12, -4.47]}>
        <boxGeometry args={[0.65, 0.90, 0.018]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.8} />
      </mesh>
      <mesh position={[-2.55, 2.12, -4.46]}>
        <planeGeometry args={[0.57, 0.82]} />
        <meshStandardMaterial color="#081008" emissive="#152015" emissiveIntensity={0.35} />
      </mesh>

      <mesh position={[-1.65, 2.12, -4.47]}>
        <boxGeometry args={[0.58, 0.82, 0.018]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.8} />
      </mesh>
      <mesh position={[-1.65, 2.12, -4.46]}>
        <planeGeometry args={[0.50, 0.74]} />
        <meshStandardMaterial color="#100808" emissive="#201515" emissiveIntensity={0.35} />
      </mesh>
    </>
  )
})

export default MainRoom
