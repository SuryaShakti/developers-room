import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store/useStore'
import { scrollCurve, lookAtCurve } from '../utils/curve'

const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

export function useScrollCamera() {
  const camera = useThree((state) => state.camera)

  // Target comes from Lenis via Zustand. Current is the smoothed value we advance each frame.
  // Both are refs — never read inside useFrame from React state directly.
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const keyboardVisibleRef = useRef(false)
  const activeRoomRef = useRef('main')

  useEffect(() =>
    useStore.subscribe(
      (s) => s.scrollProgress,
      (v) => {
        targetRef.current = v
        if (activeRoomRef.current !== 'main') return
        const shouldShow = v > 0.72
        if (shouldShow !== keyboardVisibleRef.current) {
          keyboardVisibleRef.current = shouldShow
          useStore.getState().setKeyboardVisible(shouldShow)
        }
      }
    )
  , [])

  useEffect(() =>
    useStore.subscribe(
      (s) => s.activeRoom,
      (v) => { activeRoomRef.current = v }
    )
  , [])

  // Set camera to start of curve immediately on mount (prevents single-frame pop)
  useEffect(() => {
    camera.position.copy(scrollCurve.getPoint(0))
    camera.lookAt(lookAtCurve.getPoint(0))
  }, [camera])

  useFrame((_, delta) => {
    if (activeRoomRef.current !== 'main') return

    currentRef.current = THREE.MathUtils.damp(
      currentRef.current,
      targetRef.current,
      6,
      delta
    )

    const p = Math.max(0, Math.min(1, currentRef.current))

    _pos.copy(scrollCurve.getPoint(p))
    _look.copy(lookAtCurve.getPoint(p))

    camera.position.copy(_pos)
    camera.lookAt(_look)
  })
}
