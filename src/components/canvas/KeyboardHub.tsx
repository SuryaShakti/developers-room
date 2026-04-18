import { memo } from 'react'
import { Text } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { useStore } from '../../store/useStore'

type Room = 'about' | 'skills' | 'projects' | 'contact'

type KeyDef = {
  label: string
  x: number
  room: Room
  color: string
  sublabel: string
}

const KEY_DEFS: KeyDef[] = [
  { label: 'A', x: -0.135, room: 'about',    color: '#4FC3F7', sublabel: 'About'    },
  { label: 'S', x: -0.045, room: 'skills',   color: '#81C784', sublabel: 'Skills'   },
  { label: 'P', x:  0.045, room: 'projects', color: '#FFB74D', sublabel: 'Projects' },
  { label: 'C', x:  0.135, room: 'contact',  color: '#F06292', sublabel: 'Contact'  },
]

// Keyboard surface top = 0.793 + 0.019/2 = 0.8025; key half-height = 0.013/2
const KEY_Y = 0.8025 + 0.0065
const KEY_Z = -2.92

function Key({ label, x, room, color, sublabel }: KeyDef) {
  const setActiveRoom = useStore((s) => s.setActiveRoom)
  const setIsTransitioning = useStore((s) => s.setIsTransitioning)

  const [spring, api] = useSpring(() => ({
    emissiveIntensity: 0,
    config: { tension: 320, friction: 22 },
  }))

  return (
    <group position={[x, KEY_Y, KEY_Z]}>
      {/* Keycap */}
      <mesh
        onPointerOver={() => {
          api.start({ emissiveIntensity: 0.9 })
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          api.start({ emissiveIntensity: 0 })
          document.body.style.cursor = 'default'
        }}
        onClick={() => {
          setActiveRoom(room)
          setIsTransitioning(true)
        }}
      >
        <boxGeometry args={[0.068, 0.013, 0.062]} />
        <animated.meshStandardMaterial
          color="#1C1C1C"
          emissive={color}
          emissiveIntensity={spring.emissiveIntensity}
          roughness={0.45}
          metalness={0.12}
        />
      </mesh>

      {/* Key letter — engraved on top face */}
      <Text
        position={[0, 0.008, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.02}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        renderOrder={1}
      >
        {label}
      </Text>

      {/* Floating room label — appears above key, only readable up close */}
      <Text
        position={[0, 0.055, -0.048]}
        rotation={[-0.35, 0, 0]}
        fontSize={0.013}
        color={color}
        anchorX="center"
        anchorY="middle"
        renderOrder={2}
      >
        {sublabel}
      </Text>
    </group>
  )
}

const KeyboardHub = memo(function KeyboardHub() {
  const keyboardVisible = useStore((s) => s.keyboardVisible)

  if (!keyboardVisible) return null

  return (
    <>
      {KEY_DEFS.map((k) => (
        <Key key={k.label} {...k} />
      ))}
    </>
  )
})

export default KeyboardHub
