import { TemplateProps } from '@/types/invitation'

export default function ElegantTemplate({
  brideName,
  groomName,
  weddingDate,
  weddingTime,
  venue,
  venueAddress,
  photos,
  message,
}: TemplateProps) {
  const fontSerif = 'var(--font-playfair), var(--font-cormorant), Georgia, serif'
  const gold = '#D4AF37'
  const goldDark = '#8B6914'
  const cream = '#FFF8E7'
  const dark = '#2A1A0E'
  const mid = '#5C3D1E'

  return (
    <div
      style={{
        background: cream,
        color: dark,
        fontFamily: fontSerif,
        minHeight: '100vh',
      }}
    >
      {/* ── HERO ─────────────────────────────── */}
      <section
        style={{
          background: `linear-gradient(180deg, ${cream} 0%, #F5EDDA 100%)`,
          borderBottom: `1px solid ${gold}40`,
          padding: '80px 24px 64px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Corner ornaments */}
        <span
          style={{
            position: 'absolute', top: 16, left: 16,
            fontSize: 28, color: `${gold}60`, lineHeight: 1,
          }}
        >❧</span>
        <span
          style={{
            position: 'absolute', top: 16, right: 16,
            fontSize: 28, color: `${gold}60`, lineHeight: 1, transform: 'scaleX(-1)',
          }}
        >❧</span>

        {/* Undangan label */}
        <p
          style={{
            fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: gold,
            marginBottom: 24,
          }}
        >
          Undangan Pernikahan
        </p>

        {/* Ornament top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20, color: gold }}>
          <span style={{ fontSize: 10 }}>◆</span>
          <span style={{ flex: 1, maxWidth: 80, height: 1, background: `linear-gradient(90deg, transparent, ${gold})` }} />
          <span style={{ fontSize: 20 }}>✦</span>
          <span style={{ flex: 1, maxWidth: 80, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
          <span style={{ fontSize: 10 }}>◆</span>
        </div>

        {/* Couple names */}
        <h1
          style={{
            fontFamily: fontSerif,
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1,
            color: dark,
            margin: 0,
          }}
        >
          {brideName}
        </h1>
        <p style={{ color: gold, fontSize: '1.1rem', margin: '8px 0', letterSpacing: '0.2em' }}>&amp;</p>
        <h1
          style={{
            fontFamily: fontSerif,
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1,
            color: dark,
            margin: 0,
          }}
        >
          {groomName}
        </h1>

        {/* Ornament bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 20, color: gold }}>
          <span style={{ fontSize: 10 }}>◆</span>
          <span style={{ flex: 1, maxWidth: 80, height: 1, background: `linear-gradient(90deg, transparent, ${gold})` }} />
          <span style={{ fontSize: 20 }}>✦</span>
          <span style={{ flex: 1, maxWidth: 80, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
          <span style={{ fontSize: 10 }}>◆</span>
        </div>

        {/* Bottom ornaments */}
        <span
          style={{
            position: 'absolute', bottom: 16, left: 16,
            fontSize: 28, color: `${gold}60`, lineHeight: 1, transform: 'rotate(90deg)',
          }}
        >❧</span>
        <span
          style={{
            position: 'absolute', bottom: 16, right: 16,
            fontSize: 28, color: `${gold}60`, lineHeight: 1, transform: 'rotate(-90deg) scaleX(-1)',
          }}
        >❧</span>
      </section>

      {/* ── DATE & TIME ───────────────────────── */}
      <section
        style={{
          padding: '64px 24px',
          textAlign: 'center',
          borderBottom: `1px solid ${gold}25`,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: gold,
            marginBottom: 32,
          }}
        >
          Tanggal &amp; Waktu
        </p>

        <div
          style={{
            display: 'inline-block',
            border: `1px solid ${gold}50`,
            padding: '40px 56px',
            position: 'relative',
            background: `linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,237,218,0.5))`,
            maxWidth: 420,
            width: '100%',
          }}
        >
          {/* Border corner accents */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
            <span
              key={corner}
              style={{
                position: 'absolute',
                [corner.includes('top') ? 'top' : 'bottom']: -6,
                [corner.includes('left') ? 'left' : 'right']: -6,
                color: gold,
                fontSize: 12,
                lineHeight: 1,
              }}
            >◆</span>
          ))}

          <p
            style={{
              fontFamily: fontSerif,
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              fontWeight: 600,
              color: dark,
              margin: '0 0 8px',
            }}
          >
            {weddingDate}
          </p>
          <div style={{ width: 40, height: 1, background: gold, margin: '12px auto' }} />
          <p
            style={{
              fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              color: mid,
              margin: 0,
            }}
          >
            {weddingTime}
          </p>
        </div>
      </section>

      {/* ── VENUE ─────────────────────────────── */}
      <section
        style={{
          padding: '64px 24px',
          textAlign: 'center',
          borderBottom: `1px solid ${gold}25`,
          background: 'rgba(212,175,55,0.04)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: gold,
            marginBottom: 24,
          }}
        >
          Lokasi
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20, color: gold }}>
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: `linear-gradient(90deg, transparent, ${gold})` }} />
          <span>✦</span>
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
        </div>

        <h2
          style={{
            fontFamily: fontSerif,
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 500,
            color: dark,
            margin: '0 0 12px',
          }}
        >
          {venue}
        </h2>
        {venueAddress && (
          <p
            style={{
              fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
              fontSize: '0.875rem',
              color: mid,
              letterSpacing: '0.05em',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {venueAddress}
          </p>
        )}
      </section>

      {/* ── PHOTO GALLERY ─────────────────────── */}
      {photos && photos.length > 0 && (
        <section
          style={{
            padding: '64px 24px',
            borderBottom: `1px solid ${gold}25`,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: gold,
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            Galeri Foto
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 12,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  border: `1px solid ${gold}30`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={`Foto ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── MESSAGE ───────────────────────────── */}
      {message && (
        <section
          style={{
            padding: '64px 24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: gold,
              marginBottom: 24,
            }}
          >
            Pesan Kami
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28, color: gold }}>
            <span style={{ flex: 1, maxWidth: 60, height: 1, background: `linear-gradient(90deg, transparent, ${gold})` }} />
            <span>✦</span>
            <span style={{ flex: 1, maxWidth: 60, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
          </div>

          <blockquote
            style={{
              fontFamily: fontSerif,
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: mid,
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.9,
              position: 'relative',
              padding: '0 32px',
            }}
          >
            <span
              style={{
                position: 'absolute', top: -10, left: 0,
                fontSize: 60, color: `${gold}30`, fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
            >&ldquo;</span>
            {message}
            <span
              style={{
                position: 'absolute', bottom: -30, right: 0,
                fontSize: 60, color: `${gold}30`, fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
            >&rdquo;</span>
          </blockquote>
        </section>
      )}

      {/* ── FOOTER ────────────────────────────── */}
      <footer
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          borderTop: `1px solid ${gold}25`,
          background: `linear-gradient(180deg, transparent, rgba(212,175,55,0.06))`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: gold, marginBottom: 20 }}>
          <span style={{ fontSize: 10 }}>◆</span>
          <span style={{ flex: 1, maxWidth: 80, height: 1, background: `linear-gradient(90deg, transparent, ${gold})` }} />
          <span style={{ fontSize: 20 }}>✦</span>
          <span style={{ flex: 1, maxWidth: 80, height: 1, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
          <span style={{ fontSize: 10 }}>◆</span>
        </div>
        <p
          style={{
            fontFamily: fontSerif,
            fontSize: '1rem',
            fontStyle: 'italic',
            color: goldDark,
          }}
        >
          {brideName} &amp; {groomName}
        </p>
      </footer>
    </div>
  )
}
