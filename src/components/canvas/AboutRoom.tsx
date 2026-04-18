import { memo, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

// Cinematic side-angle entry, slowly drifts to a front-desk settle
const START_POS = new THREE.Vector3(3.2, 1.8, 0.4)
const START_LOOK = new THREE.Vector3(-0.4, 1.0, -3.2)
const END_POS = new THREE.Vector3(0.6, 1.25, -0.9)
const END_LOOK = new THREE.Vector3(0, 0.95, -3.1)

const AboutRoomCamera = memo(function AboutRoomCamera() {
  const camera = useThree((s) => s.camera)
  const tRef = useRef(0)
  const activeRef = useRef(true)

  useEffect(() => {
    camera.position.copy(START_POS)
    camera.lookAt(START_LOOK)
    useStore.getState().setKeyboardVisible(true)
    return () => {
      activeRef.current = false
      useStore.getState().setKeyboardVisible(false)
    }
  }, [camera])

  useEffect(() =>
    useStore.subscribe(
      (s) => s.activeRoom,
      (v) => { activeRef.current = v === 'about' }
    )
  , [])

  useFrame((_, delta) => {
    if (!activeRef.current) return
    tRef.current = THREE.MathUtils.damp(tRef.current, 1, 0.28, delta)
    const t = tRef.current

    _pos.lerpVectors(START_POS, END_POS, t)
    _look.lerpVectors(START_LOOK, END_LOOK, t)

    camera.position.copy(_pos)
    camera.lookAt(_look)
  })

  return null
})

export default AboutRoomCamera
