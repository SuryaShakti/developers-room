import { useStore } from './store/useStore'
import { Canvas } from '@react-three/fiber'
import { PCFSoftShadowMap } from 'three'
import { Perf } from 'r3f-perf'
import MainRoom from './components/canvas/MainRoom'
import CameraRig from './components/canvas/CameraRig'
import CurvePath from './components/canvas/CurvePath'
import KeyboardHub from './components/canvas/KeyboardHub'
import AboutRoomCamera from './components/canvas/AboutRoom'
import TransitionEffect from './components/ui/TransitionEffect'
import AboutPanel from './components/ui/AboutPanel'

// All props defined outside component — stable references, never break React.memo
const canvasGl = { antialias: false } as const
const canvasDpr: [number, number] = [1, 1.5]
const canvasShadows = { type: PCFSoftShadowMap } as const
const canvasCamera = { position: [0, 3.8, 10] as [number, number, number], fov: 60 }
const canvasStyle = { position: 'fixed' as const, top: 0, left: 0, width: '100%', height: '100%' }
const scrollSpacerStyle = { height: '300vh', pointerEvents: 'none' as const }

function SceneContent() {
  const activeRoom = useStore((s) => s.activeRoom)
  return (
    <>
      {import.meta.env.DEV && <Perf position="top-left" />}
      {import.meta.env.DEV && activeRoom === 'main' && <CurvePath />}

      {activeRoom === 'main' && <CameraRig />}
      {activeRoom === 'about' && <AboutRoomCamera />}

      <MainRoom />
      <KeyboardHub />
    </>
  )
}

export default function App() {
  return (
    <>
      <Canvas
        gl={canvasGl}
        dpr={canvasDpr}
        shadows={canvasShadows}
        camera={canvasCamera}
        style={canvasStyle}
      >
        <SceneContent />
      </Canvas>

      <AboutPanel />
      <TransitionEffect />

      {/* Scroll spacer — creates the scrollable document height Lenis reads from */}
      <div style={scrollSpacerStyle} aria-hidden="true" />
    </>
  )
}
