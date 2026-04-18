import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import { getGPUTier } from 'detect-gpu'
import { useStore } from './store/useStore'
import App from './App'
import './index.css'

// Prevent browser restoring scroll position on reload — must happen before Lenis init
history.scrollRestoration = 'manual'

// Lenis smooth scroll — single source of scroll truth
const lenis = new Lenis({ autoRaf: false })

lenis.on('scroll', () => {
  useStore.getState().setScrollProgress(lenis.progress)
})

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// GPU tier detection — results used in Module 3+ for quality fallbacks
getGPUTier().then((tier) => {
  if (import.meta.env.DEV) {
    console.info(`[GPU] Tier ${tier.tier} — ${tier.gpu ?? 'unknown GPU'}`)
  }
  if (tier.tier < 2) {
    console.warn('[GPU] Low-tier GPU detected — performance mode will activate in Module 3')
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
