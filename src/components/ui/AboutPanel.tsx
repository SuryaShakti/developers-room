import { useStore } from '../../store/useStore'

const panelStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '0 6vw',
  pointerEvents: 'none',
  zIndex: 10,
}

const cardStyle: React.CSSProperties = {
  maxWidth: '480px',
  pointerEvents: 'auto',
}

const nameStyle: React.CSSProperties = {
  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#0D0D0D',
  lineHeight: 1.05,
  marginBottom: '0.25rem',
}

const roleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#4FC3F7',
  marginBottom: '2rem',
}

const bodyStyle: React.CSSProperties = {
  fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
  lineHeight: 1.75,
  color: '#333333',
  marginBottom: '1.5rem',
}

const statsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  marginBottom: '2rem',
}

const statStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const statNumStyle: React.CSSProperties = {
  fontSize: '1.6rem',
  fontWeight: 700,
  color: '#0D0D0D',
  lineHeight: 1,
}

const statLabelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#888888',
  marginTop: '0.2rem',
}

const stackStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '0.5rem',
  marginBottom: '2.5rem',
}

const tagStyle: React.CSSProperties = {
  padding: '0.3rem 0.75rem',
  borderRadius: '4px',
  border: '1px solid #E0E0E0',
  fontSize: '0.78rem',
  fontWeight: 500,
  color: '#555555',
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(4px)',
}

const ctaStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
}

const btnPrimaryStyle: React.CSSProperties = {
  padding: '0.65rem 1.4rem',
  background: '#0D0D0D',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
}

const btnSecondaryStyle: React.CSSProperties = {
  ...btnPrimaryStyle,
  background: 'transparent',
  color: '#0D0D0D',
  border: '1px solid #CCCCCC',
}

const STACK = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Redux', 'Jotai', 'MongoDB', 'Three.js']

export default function AboutPanel() {
  const activeRoom = useStore((s) => s.activeRoom)

  if (activeRoom !== 'about') return null

  return (
    <div style={panelStyle}>
      <div style={cardStyle}>
        <h1 style={nameStyle}>Surya<br />Shakti</h1>
        <p style={roleStyle}>Frontend Engineer</p>

        <p style={bodyStyle}>
          3+ years building at the intersection of performance and craft.
          Currently at SpectatrAI, Gurgaon — shipping AI-powered platforms
          that move at the speed of thought.
        </p>

        <p style={bodyStyle}>
          I shipped a 6-month roadmap in 20 days. Not by cutting corners —
          by knowing exactly which corners don't exist.
        </p>

        <div style={statsStyle}>
          <div style={statStyle}>
            <span style={statNumStyle}>50k+</span>
            <span style={statLabelStyle}>Users</span>
          </div>
          <div style={statStyle}>
            <span style={statNumStyle}>60%</span>
            <span style={statLabelStyle}>Faster</span>
          </div>
          <div style={statStyle}>
            <span style={statNumStyle}>&lt;200ms</span>
            <span style={statLabelStyle}>Interactions</span>
          </div>
        </div>

        <div style={stackStyle}>
          {STACK.map((s) => (
            <span key={s} style={tagStyle}>{s}</span>
          ))}
        </div>

        <div style={ctaStyle}>
          <a href="https://github.com/SuryaShakti" target="_blank" rel="noopener noreferrer" style={btnPrimaryStyle}>
            View Work
          </a>
          <a href="mailto:suryashakti.dev@gmail.com" style={btnSecondaryStyle}>
            Say Hello
          </a>
        </div>
      </div>
    </div>
  )
}
