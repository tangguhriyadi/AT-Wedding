import { TemplateProps } from '@/types/invitation'

export default function RusticTemplate({
  brideName,
  groomName,
  weddingDate,
  weddingTime,
  venue,
  venueAddress,
  akadVenue,
  akadTime,
  googleMapsUrl,
  photos,
  message,
}: TemplateProps) {
  const fontScript = 'var(--font-dancing), cursive'
  const fontBody = 'var(--font-cormorant), Georgia, serif'
  const fontSans = 'var(--font-geist-sans), Arial, sans-serif'

  const warmWhite = '#FAF6EF'
  const parchment = '#F0E6D0'
  const brown = '#5C3D1E'
  const brownLight = '#8B6040'
  const brownDark = '#3B2410'
  const sage = '#6B7A5E'
  const sageDark = '#4A5740'
  const terracotta = '#C4714A'

  return (
    <div
      style={{
        background: warmWhite,
        color: brown,
        fontFamily: fontBody,
        minHeight: '100vh',
      }}
    >
      {/* ── HERO ─────────────────────────────── */}
      <section
        style={{
          background: `linear-gradient(160deg, ${parchment} 0%, ${warmWhite} 60%, ${parchment} 100%)`,
          padding: '80px 24px 72px',
          textAlign: 'center',
          borderBottom: `2px solid ${sage}30`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative leaf/floral accents */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: 72,
            color: `${sage}20`,
            lineHeight: 1,
            transform: 'rotate(-20deg) translate(-10px, -10px)',
            userSelect: 'none',
          }}
        >
          🌿
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: 72,
            color: `${sage}20`,
            lineHeight: 1,
            transform: 'rotate(20deg) translate(10px, -10px) scaleX(-1)',
            userSelect: 'none',
          }}
        >
          🌿
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '10%',
            fontSize: 48,
            color: `${terracotta}15`,
            lineHeight: 1,
            transform: 'rotate(15deg)',
            userSelect: 'none',
          }}
        >
          🌸
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: '10%',
            fontSize: 48,
            color: `${terracotta}15`,
            lineHeight: 1,
            transform: 'rotate(-15deg)',
            userSelect: 'none',
          }}
        >
          🌸
        </div>

        {/* Label */}
        <p
          style={{
            fontFamily: fontSans,
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: sage,
            marginBottom: 16,
          }}
        >
          Undangan Pernikahan
        </p>

        {/* Twig divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, color: sage }}>
          <span style={{ fontSize: 16 }}>🍃</span>
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: sage, opacity: 0.3 }} />
          <span style={{ fontSize: 20, color: terracotta }}>❀</span>
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: sage, opacity: 0.3 }} />
          <span style={{ fontSize: 16, transform: 'scaleX(-1)', display: 'inline-block' }}>🍃</span>
        </div>

        {/* Couple names in script */}
        <h1
          style={{
            fontFamily: fontScript,
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 700,
            color: brownDark,
            margin: 0,
            lineHeight: 1,
          }}
        >
          {brideName}
        </h1>
        <p
          style={{
            fontFamily: fontBody,
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: brownLight,
            margin: '12px 0',
            letterSpacing: '0.1em',
          }}
        >
          dan
        </p>
        <h1
          style={{
            fontFamily: fontScript,
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 700,
            color: brownDark,
            margin: 0,
            lineHeight: 1,
          }}
        >
          {groomName}
        </h1>

        {/* Bottom twig divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, color: sage }}>
          <span style={{ fontSize: 16 }}>🍃</span>
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: sage, opacity: 0.3 }} />
          <span style={{ fontSize: 20, color: terracotta }}>❀</span>
          <span style={{ flex: 1, maxWidth: 60, height: 1, background: sage, opacity: 0.3 }} />
          <span style={{ fontSize: 16, transform: 'scaleX(-1)', display: 'inline-block' }}>🍃</span>
        </div>
      </section>

      {/* ── DATE & TIME ───────────────────────── */}
      <section
        style={{
          padding: '64px 24px',
          textAlign: 'center',
          borderBottom: `1px solid ${sage}25`,
        }}
      >
        <p
          style={{
            fontFamily: fontSans,
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: sage,
            marginBottom: 32,
          }}
        >
          Tanggal &amp; Waktu
        </p>

        {/* Date box */}
        <div
          style={{
            display: 'inline-block',
            background: parchment,
            border: `1px solid ${sage}40`,
            padding: '32px 56px',
            maxWidth: 400,
            width: '100%',
            position: 'relative',
            marginBottom: (akadTime || weddingTime) ? 20 : 0,
          }}
        >
          <div style={{ position: 'absolute', inset: 6, border: `1px dashed ${sage}30`, pointerEvents: 'none' }} />
          <h2 style={{ fontFamily: fontScript, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: brownDark, margin: 0, fontWeight: 600 }}>
            {weddingDate}
          </h2>
        </div>

        {/* Times */}
        {(akadTime || weddingTime) && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {akadTime && (
              <div style={{ background: parchment, border: `1px solid ${sage}30`, padding: '16px 32px', minWidth: 140, textAlign: 'center' }}>
                <p style={{ fontFamily: fontSans, fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: sage, marginBottom: 6 }}>Akad</p>
                <p style={{ fontFamily: fontBody, fontSize: '1.1rem', fontStyle: 'italic', color: brownLight, margin: 0 }}>{akadTime}</p>
              </div>
            )}
            {weddingTime && (
              <div style={{ background: parchment, border: `1px solid ${sage}30`, padding: '16px 32px', minWidth: 140, textAlign: 'center' }}>
                <p style={{ fontFamily: fontSans, fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: sage, marginBottom: 6 }}>
                  {akadTime ? 'Resepsi' : 'Waktu'}
                </p>
                <p style={{ fontFamily: fontBody, fontSize: '1.1rem', fontStyle: 'italic', color: brownLight, margin: 0 }}>{weddingTime}</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── VENUE ─────────────────────────────── */}
      <section
        style={{
          padding: '64px 24px',
          textAlign: 'center',
          borderBottom: `1px solid ${sage}25`,
          background: `linear-gradient(135deg, ${parchment}60, transparent)`,
        }}
      >
        <p
          style={{
            fontFamily: fontSans,
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: sage,
            marginBottom: 20,
          }}
        >
          Lokasi
        </p>

        <div style={{ fontSize: 28, color: `${terracotta}60`, marginBottom: 16 }}>🏡</div>

        {/* Akad venue */}
        {akadVenue && (
          <div style={{ marginBottom: venue ? 32 : 0 }}>
            <p style={{ fontFamily: fontSans, fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: sage, marginBottom: 8 }}>Akad</p>
            <h2 style={{ fontFamily: fontScript, fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)', color: brownDark, margin: '0 0 8px', fontWeight: 600 }}>
              {akadVenue}
            </h2>
          </div>
        )}

        {/* Divider */}
        {akadVenue && venue && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, color: terracotta }}>
            <span style={{ flex: 1, maxWidth: 40, height: 1, background: `${sage}40` }} />
            <span style={{ fontSize: 14 }}>❀</span>
            <span style={{ flex: 1, maxWidth: 40, height: 1, background: `${sage}40` }} />
          </div>
        )}

        {/* Resepsi venue */}
        {venue && (
          <div>
            {akadVenue && (
              <p style={{ fontFamily: fontSans, fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: sage, marginBottom: 8 }}>Resepsi</p>
            )}
            <h2
              style={{
                fontFamily: fontScript,
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                color: brownDark,
                margin: '0 0 12px',
                fontWeight: 600,
              }}
            >
              {venue}
            </h2>
            {venueAddress && (
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: brownLight,
                  maxWidth: 440,
                  margin: '0 auto',
                  lineHeight: 1.8,
                }}
              >
                {venueAddress}
              </p>
            )}
          </div>
        )}

        {/* Google Maps button */}
        {googleMapsUrl && (
          <div style={{ marginTop: 24 }}>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: `1px solid ${sage}`,
                color: sage,
                fontFamily: fontSans,
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '10px 24px',
                textDecoration: 'none',
                background: parchment,
              }}
            >
              🗺 Buka Google Maps
            </a>
          </div>
        )}

        {/* Leaf separator */}
        <div style={{ marginTop: 24, color: sage, fontSize: 14, letterSpacing: '0.5em' }}>
          🍂 🍁 🍂
        </div>
      </section>

      {/* ── PHOTO GALLERY ─────────────────────── */}
      {photos && photos.length > 0 && (
        <section
          style={{
            padding: '64px 24px',
            borderBottom: `1px solid ${sage}25`,
          }}
        >
          <p
            style={{
              fontFamily: fontSans,
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: sage,
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
              gap: 8,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  border: `3px solid ${parchment}`,
                  boxShadow: `0 4px 16px ${brown}15`,
                  transform: i % 2 === 0 ? 'rotate(-0.8deg)' : 'rotate(0.8deg)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={`Foto ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
              fontFamily: fontSans,
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: sage,
              marginBottom: 24,
            }}
          >
            Pesan Kami
          </p>

          <div style={{ fontSize: 24, marginBottom: 16, color: `${terracotta}80` }}>🌻</div>

          <blockquote
            style={{
              fontFamily: fontScript,
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              color: brownDark,
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.7,
              position: 'relative',
              padding: '0 24px',
              fontWeight: 500,
            }}
          >
            {message}
          </blockquote>
        </section>
      )}

      {/* ── FOOTER ────────────────────────────── */}
      <footer
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          borderTop: `1px solid ${sage}30`,
          background: parchment,
        }}
      >
        <div style={{ fontSize: 20, color: `${sage}60`, marginBottom: 12, letterSpacing: '0.3em' }}>
          🍃 🌸 🍃
        </div>
        <p
          style={{
            fontFamily: fontScript,
            fontSize: '1.6rem',
            color: brownDark,
            fontWeight: 600,
          }}
        >
          {brideName} &amp; {groomName}
        </p>
        <p
          style={{
            fontFamily: fontSans,
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: sageDark,
            marginTop: 8,
            opacity: 0.7,
          }}
        >
          Dengan Penuh Cinta
        </p>
      </footer>
    </div>
  )
}
