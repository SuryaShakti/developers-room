import { memo, useMemo } from 'react'
import { Line } from '@react-three/drei'
import { scrollCurve, lookAtCurve } from '../../utils/curve'

// Dev-only overlay — shows both splines in the scene so you can judge the camera path.
// Remove from Canvas once curves are dialed in during Module 3.
const CurvePath = memo(function CurvePath() {
  const scrollPoints = useMemo(() => scrollCurve.getPoints(80), [])
  const lookAtPoints = useMemo(() => lookAtCurve.getPoints(80), [])

  return (
    <>
      <Line points={scrollPoints} color="#00ff88" lineWidth={2} />
      <Line points={lookAtPoints} color="#ff4444" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
    </>
  )
})

export default CurvePath
