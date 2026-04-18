import { CatmullRomCurve3, Vector3 } from 'three'

/**
 * Camera spline: room entrance (far, high) → desk approach → keyboard close-up (low, tight).
 * Control points are placeholders — finalize in Module 3 once room geometry exists.
 */
export const scrollCurve = new CatmullRomCurve3(
  [
    new Vector3(0, 3.5, 14),   // arrival — wide room view
    new Vector3(0, 3.0, 10),   // gliding in
    new Vector3(0, 2.5, 6),    // approaching desk area
    new Vector3(0, 1.8, 3),    // over desk
    new Vector3(0, 0.8, 1),    // descending to keyboard level
    new Vector3(0, 0.3, 0),    // keyboard close-up, top-down angle
  ],
  false,
  'catmullrom',
  0.5
)

export const lookAtCurve = new CatmullRomCurve3(
  [
    new Vector3(0, 1, 8),
    new Vector3(0, 1, 4),
    new Vector3(0, 0.5, 2),
    new Vector3(0, 0.2, 1),
    new Vector3(0, 0, 0),
    new Vector3(0, -0.2, -0.5),
  ],
  false,
  'catmullrom',
  0.5
)
