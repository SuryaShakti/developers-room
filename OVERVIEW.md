# The Developer's Room
### Surya Shakti — Portfolio Experience

> *"The portfolio IS the case study. Anyone who visits this and understands what they're looking at will already know I can deliver."*

---

## What This Is

A first-of-its-kind 3D cinematic portfolio experience.

The visitor lands in a developer's room — a modern bachelor apartment, late night, Gurgaon. As they scroll, the camera glides toward the desk, past the monitors, until it zooms in on the keyboard. The keyboard is the navigation system. Each key is a portal to a different world: About, Skills, Projects, Contact. Click a key → a time-machine flash transition → an entirely new immersive 3D room.

This is not a portfolio website. It is a world.

---

## Core Concept at a Glance

```
Landing Scene (The Room)
    │
    │  [scroll]
    ▼
Keyboard Hub (navigation)
    │
    ├── [A key] ──► About Room
    ├── [S key] ──► Skills Lab
    ├── [P key] ──► Projects Gallery
    └── [C key] ──► Contact Room
```

---

## The Three Laws of This Experience

1. **Motion is Meaning** — Nothing moves arbitrarily. Every animation communicates something about Surya before a single word is read.
2. **Discovery Beats Explanation** — Visitors are never told what to do. They're compelled to do it.
3. **The Portfolio IS the Case Study** — Building this proves the skills it describes.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript + Vite |
| 3D Rendering | React Three Fiber + Three.js |
| Helpers | @react-three/drei |
| Scroll Engine | Lenis + GSAP ScrollTrigger |
| State | Zustand |
| Transitions | React Spring (mesh properties) |
| Postprocessing | @react-three/postprocessing |
| GPU Detection | detect-gpu |
| Dev Tools | r3f-perf |
| Deploy | Vercel |

---

## Current Phase

**Phase 1 — Core Setup + Scroll Camera Engine**

MVP target: Main room + scroll + keyboard hub + About room, deployed at a real URL.

See `CLAUDE.md` for full context and build instructions.

---

## Key Numbers (from Surya's actual work)

- **20 days** — time to ship a platform scoped at 6 months (SpectatrAI)
- **50,000+** — active users served on the sports platform
- **60%** — AI chatbot performance improvement
- **Sub-200ms** — interaction response times on real-time sports modules
- **5,000+** — users on the Braynix AI Resume Builder

---

## Docs Reference

| File | Purpose |
|------|---------|
| `docs/01_ideation_and_conversations.pdf` | Full ideation journey — first vision to concept selection |
| `docs/02_mvp_scope_and_architecture.pdf` | Technical blueprint — MVP scope, architecture, module plan |
| `docs/PRD_v1.docx` | Complete Production Requirements Document |
| `CLAUDE.md` | Instructions for AI-assisted development |
| `OVERVIEW.md` | This file |
