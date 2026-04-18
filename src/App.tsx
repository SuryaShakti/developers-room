import { Canvas } from '@react-three/fiber'
import { PCFSoftShadowMap } from 'three'
import { Perf } from 'r3f-perf'
import MainRoom from './components/canvas/MainRoom'
import CameraRig from './components/canvas/CameraRig'
import CurvePath from './components/canvas/CurvePath'
import KeyboardHub from './components/canvas/KeyboardHub'

// All props defined outside component — stable references, never break React.memo
const canvasGl = { antialias: false } as const
const canvasDpr: [number, number] = [1, 1.5]
const canvasShadows = { type: PCFSoftShadowMap } as const
// Initial position matches scrollCurve.getPoint(0) — no single-frame pop on mount
const canvasCamera = { position: [0, 3.8, 10] as [number, number, number], fov: 60 }
const canvasStyle = { position: 'fixed' as const, top: 0, left: 0, width: '100%', height: '100%' }
const scrollSpacerStyle = { height: '300vh', pointerEvents: 'none' as const }

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
        {import.meta.env.DEV && <Perf position="top-left" />}
        {import.meta.env.DEV && <CurvePath />}

        <CameraRig />
        <MainRoom />
        <KeyboardHub />
      </Canvas>

      {/* Scroll spacer — creates the scrollable document height Lenis reads from */}
      <div style={scrollSpacerStyle} aria-hidden="true" />
    </>
  )
}
