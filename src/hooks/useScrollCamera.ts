/**
 * Module 2 — Scroll Camera Engine
 *
 * Will wire: Lenis scrollProgress (Zustand) → GSAP ScrollTrigger.update() → camera.position along scrollCurve
 * Critical risk: feed Lenis onScroll into ScrollTrigger.update() manually — never let them tick independently.
 */
export {}
