# CLAUDE.md — Developer's Room Portfolio

This file gives Claude Code full context for this project so every session starts informed.
Read this before writing a single line of code.

---

## Project Identity

**Name:** The Developer's Room
**Owner:** Surya Shakti — Frontend Engineer, Gurgaon, India
**Goal:** Build the most original developer portfolio on the web — a 3D cinematic storytelling experience

**The concept in one sentence:** The visitor lands in Surya's developer room, scrolls toward the desk, zooms into the keyboard, and navigates to immersive 3D rooms by clicking keys.

---

## Reference Documents

All docs live in `/docs/`:

- `01_ideation_and_conversations.pdf` — Full ideation history, concept evolution, all AI reviews
- `02_mvp_scope_and_architecture.pdf` — Technical blueprint, MVP scope, module plan, 10-step checklist
- `PRD_v1.docx` — Complete Production Requirements Document (full copy, room designs, Easter eggs, cinematic script)

**Before any significant architectural decision:** check the PRD. The vision is fully defined.

---

## Current Build Phase

**PHASE 1 — MODULE 1: Core Setup**

Goal: Working canvas, performance baseline, zero broken state.

### What has been done:
- [x] Project initialized (Vite + React + TS, all deps installed)
- [x] Canvas configured (antialias: false, dpr [1,1.5], PCFSoftShadowMap)
- [x] Zustand store created (flat shape + subscribeWithSelector)
- [x] Lenis initialized (history.scrollRestoration = 'manual', progress → store)
- [x] r3f-perf added (<Perf> dev-only in Canvas)
- [x] Camera curve defined (CatmullRomCurve3 + lookAt curve in utils/curve.ts)
- [x] useScrollCamera hook stub created (Module 2)
- [x] Placeholder room rendering (test cube, desk box, keyboard box, gridHelper)
- [ ] GLTF inspected and compressed
- [ ] Deployed to Vercel

Update this checklist as you complete each step.

---

## Architecture Rules (Non-Negotiable)

### The Boundary Rule
```
src/components/canvas/   ← R3F components ONLY (useFrame, Three.js, meshes)
src/components/ui/       ← Pure React ONLY (zero R3F imports)
```
If a component imports from both sides, it is in the wrong place.

### Zustand Store Shape
```typescript
{
  activeRoom: 'main' | 'about' | 'skills' | 'projects' | 'contact',
  isTransitioning: boolean,
  scrollProgress: number,    // 0–1, Lenis-driven
  keyboardVisible: boolean,
}
```
**Never** use React Context for 3D state. Context re-renders the entire tree on every state change.

### useFrame Pattern
```typescript
// NEVER read from React state inside useFrame
// ALWAYS use a ref synced via useEffect

const scrollProgressRef = useRef(0)

useEffect(() =>
  useStore.subscribe(
    s => s.scrollProgress,
    v => { scrollProgressRef.current = v }
  )
, [])

useFrame(() => {
  camera.position.copy(curve.getPoint(scrollProgressRef.current))
})
```

### Canvas Config
```tsx
<Canvas
  gl={{ antialias: false }}      // Use SMAA postprocessing instead
  dpr={[1, 1.5]}                 // Cap pixel ratio
  shadows={{ type: PCFSoftShadowMap }}
>
```

---

## Performance Budgets (Hard Limits)

| Metric | Limit |
|--------|-------|
| Draw calls per frame | ≤ 50 |
| Main room triangles | ≤ 80k |
| Per room triangles | ≤ 60k |
| Total texture VRAM | ≤ 80MB |
| Target FPS | 60fps on M1 MacBook Air |

**If these are exceeded, stop and optimize before adding more features.**

---

## Animation Tool Assignment

| Tool | Owns |
|------|------|
| GSAP + ScrollTrigger | Scroll-driven camera movement |
| R3F useFrame | Continuous mesh animations (float, pulse, idle) |
| React Spring (@react-spring/three) | State-driven mesh transitions (hover glow, key press) |

**Rule:** GSAP never runs inside useFrame. They have different tick cycles.

---

## Asset Pipeline

All assets must pass through this pipeline before import:

1. Export from Blender/Spline as GLTF
2. Draco compress with `gltf-transform optimize model.glb output.glb --compress draco`
3. Convert textures to KTX2: `gltf-transform etc1s model.glb output.glb`
4. Inspect at **gltf.report** — fix any issues
5. Generate typed R3F component with **gltfjsx**: `npx gltfjsx output.glb`
6. Add `useGLTF.preload('/models/output.glb')` at module level

**Never import a raw GLTF you haven't inspected.**

---

## What NOT to Do

### Performance Killers
- Multiple `EffectComposer` instances — ONE at canvas root, always
- Raycasting on complex geometry — use invisible flat hit-plane overlays over keys
- Uncompressed textures in production
- `useState` inside components that call `useFrame`
- Unmounting `<Canvas>` during transitions — loses GPU context

### Architecture Breakers
- `useThree` / `useFrame` outside the `<Canvas>` context
- React Context for scroll/animation state
- `<Html>` from drei for content panels — use positioned divs outside Canvas
- Inline `{}` or `[]` literals as props to R3F components — breaks React.memo

### Time Wasters (Not in MVP)
- Easter eggs (zero in V1)
- GLSL transition shader (fade only for V1)
- Avatar rigging
- Audio system
- Mobile optimization (parallel track, not a blocker)

---

## V1 MVP Scope

### Included
- Main room (static, no avatar)
- Scroll camera: room entrance → keyboard close-up
- Keyboard hub: 4 interactive keys with hover glow
- About room: camera auto-pans, real copy from PRD
- Transition: white fade (500ms CSS, not GLSL)
- Keyboard reappears at end of About room
- Deployed Vercel URL

### Everything Else → V2+
Skills room, Projects room, Contact room, avatar, GLSL shader, audio, Easter eggs, mini-map, mobile experience.

---

## Module Build Order

```
MODULE 1 — Core Setup           ← YOU ARE HERE
MODULE 2 — Scroll Camera Engine
MODULE 3 — Main Room Environment
MODULE 4 — Keyboard Interaction
MODULE 5 — Transition + About Room + Deploy
```

Do not start Module N+1 until Module N is tested and working.

---

## Folder Structure

```
src/
  components/
    canvas/
      MainRoom.tsx
      KeyboardHub.tsx
      AboutRoom.tsx
      TransitionEffect.tsx
    ui/
      SkipButton.tsx
      LoadingScreen.tsx
  hooks/
    useScrollCamera.ts
    useRoomState.ts
  store/
    useStore.ts
  assets/
    models/         # Draco-compressed GLTF
    textures/       # KTX2
  utils/
    curve.ts        # CatmullRomCurve3 definition
    constants.ts
  App.tsx
  main.tsx

docs/
  01_ideation_and_conversations.pdf
  02_mvp_scope_and_architecture.pdf
  PRD_v1.docx

OVERVIEW.md
CLAUDE.md          ← this file
```

---

## PRD Key Sections (Quick Reference)

| Section | Content |
|---------|---------|
| 1 | Vision & Three Laws |
| 2 | Audience psychology, emotional arc |
| 3 | Information architecture, URL routing |
| 4 | Cinematic script — camera paths, lighting, props, sound |
| 5 | Room copy — all written text for About, Skills, Projects, Contact |
| 6 | Time machine transition spec (V2 GLSL version) |
| 7 | Tech architecture, performance budgets |
| 8 | Easter eggs (V2+) |
| 9 | Phased build plan |

**The About Room copy in Section 5 is production-ready. Use it verbatim.**

---

## About Surya (for personalization context)

- **Role:** Frontend Engineer at SpectatrAI, Gurgaon
- **Experience:** 3+ years, React/Next.js/TypeScript specialist
- **Key achievement:** Shipped a 6-month platform in 20 days using AI-assisted development
- **Other numbers:** 50k+ users, 60% performance improvement, sub-200ms interactions
- **Stack:** React, TypeScript, Next.js, Redux, Jotai, Node.js, MongoDB
- **Contact:** suryashakti.dev@gmail.com | github.com/suryashakti

---

*Last updated: April 2026 — Phase 1 start*
