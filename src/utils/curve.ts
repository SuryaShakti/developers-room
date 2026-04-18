import { CatmullRomCurve3, Vector3 } from 'three'

/**
 * Camera spline — calibrated to the actual room geometry:
 *   Floor y=0, desk surface y=0.76, keyboard y=0.793, desk at z=-3.1
 * Starts above the room entrance, descends to keyboard close-up.
 */
export const scrollCurve = new CatmullRomCurve3(
  [
    new Vector3(0, 3.8, 10),    // arrival — above room, wide panoramic
    new Vector3(0, 3.0, 6),     // entering, descending
    new Vector3(0, 2.0, 2),     // mid-room, heading toward desk
    new Vector3(0, 1.4, -0.5),  // above desk area
    new Vector3(0, 1.05, -1.8), // approaching keyboard level
    new Vector3(0, 0.95, -2.5), // final — just above keyboard, slight angle
  ],
  false,
  'catmullrom',
  0.5
)

/**
 * LookAt spline — where the camera points at each scroll position.
 * Leads slightly ahead of the camera position for a natural follow feel.
 */
export const lookAtCurve = new CatmullRomCurve3(
  [
    new Vector3(0, 1.5, 2),      // looking toward the desk from entrance
    new Vector3(0, 1.2, -1.0),   // looking at mid-room / desk direction
    new Vector3(0, 1.0, -2.5),   // looking at desk surface
    new Vector3(0, 0.9, -3.1),   // looking at monitors
    new Vector3(0, 0.82, -3.0),  // pulling focus to keyboard
    new Vector3(0, 0.79, -2.9),  // locked on keyboard
  ],
  false,
  'catmullrom',
  0.5
)
