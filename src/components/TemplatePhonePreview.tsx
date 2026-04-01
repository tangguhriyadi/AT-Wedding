'use client'

import { useState } from 'react'
import { TEMPLATES } from '@/components/templates'
import type { TemplateProps } from '@/types/invitation'
import InvitationCover from '@/components/InvitationCover'

const demoProps: TemplateProps = {
  brideName: 'Siti',
  groomName: 'Budi',
  weddingDate: '2026-06-15',
  weddingTime: '10:00',
  venue: 'Gedung Serbaguna Mulia',
  venueAddress: 'Jl. Sudirman No. 10, Jakarta',
  akadVenue: 'Masjid Al-Ikhlas',
  akadTime: '08:00',
  photos: ['/prewed-1.jpg', '/prewed-2.jpg', '/prewed-3.jpg'],
  message: 'Bersama keluarga & kerabat, kami mengundang Bapak/Ibu untuk hadir di hari bahagia kami.',
}

const templatePreviews: Record<string, { bg: string; accent: string; icon: string }> = {
  elegant: { bg: 'linear-gradient(135deg, #F9F5EE 0%, #EFE8D8 100%)', accent: '#C4973C', icon: '❦' },
  modern:  { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',  accent: '#e94560', icon: '◆' },
  rustic:  { bg: 'linear-gradient(135deg, #f5ebe0 0%, #ddb892 100%)',  accent: '#7a5c3a', icon: '✿' },
}

function PhoneFrame({ templateId, size = 'small' }: { templateId: string; size?: 'small' | 'large' }) {
  const tpl = TEMPLATES.find((t) => t.id === templateId)
  const preview = templatePreviews[templateId] ?? templatePreviews.elegant

  const isLarge = size === 'large'
  const width = isLarge ? 280 : 160
  const height = isLarge ? 560 : 320
  const borderRadius = isLarge ? 44 : 36
  const padding = isLarge ? '16px 12px' : '14px 10px'
  const screenRadius = isLarge ? 34 : 26
  const islandW = isLarge ? 64 : 48
  const islandH = isLarge ? 16 : 12
  const zoom = isLarge ? 0.66 : 0.38

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: '#1c1c1e',
        borderRadius,
        padding,
        boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)',
        flexShrink: 0,
      }}
    >
      {/* Volume buttons */}
      <div style={{ position: 'absolute', left: '-4px', top: isLarge ? 90 : 72, width: '4px', height: isLarge ? 34 : 28, background: '#3a3a3c', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: '-4px', top: isLarge ? 136 : 108, width: '4px', height: isLarge ? 34 : 28, background: '#3a3a3c', borderRadius: '2px 0 0 2px' }} />
      {/* Power button */}
      <div style={{ position: 'absolute', right: '-4px', top: isLarge ? 112 : 90, width: '4px', height: isLarge ? 44 : 36, background: '#3a3a3c', borderRadius: '0 2px 2px 0' }} />

      {/* Screen */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: screenRadius,
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
        }}
      >
        {/* Dynamic island */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: islandW,
            height: islandH,
            background: '#1c1c1e',
            borderRadius: '7px',
            zIndex: 3,
          }}
        />

        {/* Scrollable content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflowY: isLarge ? 'auto' : 'hidden',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
          }}
        >
          {tpl ? (
            <div style={{ zoom, pointerEvents: 'none' }}>
              <tpl.component {...demoProps} />
            </div>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: preview.bg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              paddingTop: '1.5rem',
            }}>
              <span style={{ fontSize: '2.5rem', color: preview.accent, opacity: 0.7 }}>{preview.icon}</span>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', fontStyle: 'italic', color: preview.accent }}>Nama & Nama</span>
            </div>
          )}
        </div>

        {/* Cover — only in large (modal) mode */}
        {isLarge && (
          <InvitationCover
            contained
            compact
            brideName={demoProps.brideName}
            groomName={demoProps.groomName}
            weddingDate={demoProps.weddingDate}
            templateId={templateId}
            coverPhoto={demoProps.photos?.[0]}
          />
        )}

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: isLarge ? 56 : 40,
            height: '4px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '2px',
            zIndex: 3,
          }}
        />
      </div>
    </div>
  )
}

export default function TemplatePhonePreview({
  templateId,
  name,
  description,
}: {
  templateId: string
  name: string
  description: string
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const accent = (templatePreviews[templateId] ?? templatePreviews.elegant).accent

  return (
    <>
      {/* Clickable phone (small) with hover overlay */}
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer', display: 'inline-flex', position: 'relative' }}
      >
        <PhoneFrame templateId={templateId} size="small" />

        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '36px',
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <span
            style={{
              background: accent,
              color: '#fff',
              padding: '0.45rem 1.1rem',
              borderRadius: '2px',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            Preview
          </span>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontStyle: 'italic', color: '#fff', margin: 0 }}>{name}</p>
              <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', margin: '0.25rem 0 0' }}>{description}</p>
            </div>

            <PhoneFrame templateId={templateId} size="large" />

            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '0.5rem 2rem',
                borderRadius: '2px',
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  )
}
