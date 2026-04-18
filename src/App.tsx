import { Canvas } from '@react-three/fiber'
import { PCFSoftShadowMap } from 'three'
import { Perf } from 'r3f-perf'
import MainRoom from './components/canvas/MainRoom'

// Defined outside component — stable references, never break React.memo on Canvas children
const canvasGl = { antialias: false } as const
const canvasDpr: [number, number] = [1, 1.5]
const canvasShadows = { type: PCFSoftShadowMap } as const
const canvasCamera = { position: [0, 2, 10] as [number, number, number], fov: 60 }
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
        <MainRoom />
      </Canvas>

      {/* Scroll spacer — creates the scrollable document height Lenis reads from */}
      <div style={scrollSpacerStyle} aria-hidden="true" />
    </>
  )
}
