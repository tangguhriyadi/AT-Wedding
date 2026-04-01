'use client'

import { useState, useEffect } from 'react'

const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`
}

const themeStyles: Record<string, { bg: string; accent: string; text: string }> = {
  elegant: { bg: 'linear-gradient(180deg, #1e1510 0%, #3a2a1a 60%, #2c1f14 100%)', accent: '#C4973C', text: '#f5efe6' },
  modern:  { bg: 'linear-gradient(180deg, #0a0a14 0%, #1a1a2e 60%, #16213e 100%)', accent: '#e94560', text: '#f0f0f8' },
  rustic:  { bg: 'linear-gradient(180deg, #1e140c 0%, #3a2414 60%, #2d1c0e 100%)', accent: '#c4a882', text: '#f5ede0' },
}

interface Props {
  brideName: string
  groomName: string
  weddingDate: string
  templateId: string
  coverPhoto?: string
  contained?: boolean
  compact?: boolean
  children?: React.ReactNode
}

export default function InvitationCover({ brideName, groomName, weddingDate, templateId, coverPhoto, contained = false, compact = false, children }: Props) {
  const [state, setState] = useState<'visible' | 'animating' | 'hidden'>('visible')
  const theme = themeStyles[templateId] ?? themeStyles.elegant

  useEffect(() => {
    if (contained) return
    if (state !== 'hidden') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [state, contained])

  function handleOpen() {
    setState('animating')
    setTimeout(() => setState('hidden'), 750)
  }

  const bgStyle = coverPhoto
    ? { background: `linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.68)), url(${coverPhoto}) center/cover no-repeat` }
    : { background: theme.bg }

  return (
    <>
      {children}

      {state !== 'hidden' && (
        <div
          style={{
            position: contained ? 'absolute' : 'fixed',
            inset: 0,
            zIndex: 100,
            ...bgStyle,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            transform: state === 'animating' ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          {/* Top decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: compact ? '1rem' : '2.5rem' }}>
            <div style={{ width: '40px', height: '1px', background: theme.accent, opacity: 0.6 }} />
            <span style={{ color: theme.accent, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-geist-sans)', opacity: 0.85 }}>
              Undangan Pernikahan
            </span>
            <div style={{ width: '40px', height: '1px', background: theme.accent, opacity: 0.6 }} />
          </div>

          {/* Decorative icon */}
          <div style={{ color: theme.accent, fontSize: compact ? '1.1rem' : '1.75rem', marginBottom: compact ? '0.75rem' : '1.75rem', opacity: 0.7 }}>❦</div>

          {/* Bride name */}
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: compact ? '1.6rem' : 'clamp(2.4rem, 8vw, 4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: theme.text,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            {brideName}
          </p>

          {/* Ampersand */}
          <p style={{
            fontFamily: 'var(--font-dancing)',
            fontSize: compact ? '1.2rem' : 'clamp(1.8rem, 6vw, 3rem)',
            color: theme.accent,
            margin: compact ? '0.1rem 0' : '0.25rem 0',
            lineHeight: 1,
          }}>
            &amp;
          </p>

          {/* Groom name */}
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: compact ? '1.6rem' : 'clamp(2.4rem, 8vw, 4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: theme.text,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            {groomName}
          </p>

          {/* Date */}
          <div style={{ margin: compact ? '0.75rem 0 0' : '2rem 0 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '1px', background: theme.accent, opacity: 0.5 }} />
            <p style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: theme.text,
              opacity: 0.6,
              margin: 0,
              textTransform: 'uppercase',
            }}>
              {formatDate(weddingDate)}
            </p>
            <div style={{ width: '24px', height: '1px', background: theme.accent, opacity: 0.5 }} />
          </div>

          {/* Open button */}
          <button
            onClick={handleOpen}
            style={{
              marginTop: compact ? '1.25rem' : '3rem',
              background: 'transparent',
              border: `1px solid ${theme.accent}`,
              color: theme.accent,
              padding: compact ? '0.5rem 1.25rem' : '0.85rem 2.5rem',
              borderRadius: '2px',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: compact ? '0.6rem' : '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.accent
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = theme.accent
            }}
          >
            <span>✉</span>
            <span>Buka Undangan</span>
          </button>

          {/* Bottom hint */}
          <p style={{
            position: 'absolute',
            bottom: '2rem',
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: theme.text,
            opacity: 0.3,
            margin: 0,
            textTransform: 'uppercase',
          }}>
            Kepada Yth. Bapak/Ibu/Saudara/i Tamu Undangan
          </p>
        </div>
      )}
    </>
  )
}
