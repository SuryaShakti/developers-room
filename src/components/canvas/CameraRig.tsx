import { memo } from 'react'
import { useScrollCamera } from '../../hooks/useScrollCamera'

const CameraRig = memo(function CameraRig() {
  useScrollCamera()
  return null
})

export default CameraRig
