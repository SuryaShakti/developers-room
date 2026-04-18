import { useEffect, useState } from 'react'
import { useStore } from '../../store/useStore'

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: '#FFFFFF',
  zIndex: 9999,
  transition: 'opacity 280ms ease',
  pointerEvents: 'none',
}

export default function TransitionEffect() {
  const isTransitioning = useStore((s) => s.isTransitioning)
  const setIsTransitioning = useStore((s) => s.setIsTransitioning)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (!isTransitioning) return

    setOpacity(1)

    const fadeOut = setTimeout(() => {
      setOpacity(0)
      const done = setTimeout(() => setIsTransitioning(false), 300)
      return () => clearTimeout(done)
    }, 480)

    return () => clearTimeout(fadeOut)
  }, [isTransitioning, setIsTransitioning])

  return <div style={{ ...overlayStyle, opacity }} aria-hidden="true" />
}
