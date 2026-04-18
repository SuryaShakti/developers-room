import { CatmullRomCurve3, Vector3 } from 'three'

/**
 * Camera spline — calibrated to dark battlestation room.
 * Desk surface y=0.76, keyboard y=0.793, desk z=-3.5 center.
 * Starts wide above the entrance, descends to keyboard close-up.
 */
export const scrollCurve = new CatmullRomCurve3(
  [
    new Vector3(0, 3.8, 10),     // arrival — above room, wide panoramic
    new Vector3(0, 3.0, 6),      // entering, descending
    new Vector3(0, 2.2, 2),      // mid-room, heading toward desk
    new Vector3(0, 1.5, -0.5),   // above desk area, monitors visible
    new Vector3(0, 1.08, -1.8),  // approaching keyboard level
    new Vector3(0, 0.96, -2.4),  // final — just above keyboard
  ],
  false,
  'catmullrom',
  0.5
)

/**
 * LookAt spline — where the camera points at each scroll position.
 */
export const lookAtCurve = new CatmullRomCurve3(
  [
    new Vector3(0.6, 1.4, 0),     // looking toward desk/monitors from entrance
    new Vector3(0.6, 1.2, -1.5),  // mid-room, angled toward setup
    new Vector3(0.5, 1.0, -3.0),  // looking at desk surface
    new Vector3(0.3, 0.95, -3.6), // looking at monitors
    new Vector3(0.1, 0.84, -3.2), // pulling focus to keyboard zone
    new Vector3(0, 0.80, -2.92),  // locked on keyboard
  ],
  false,
  'catmullrom',
  0.5
)
