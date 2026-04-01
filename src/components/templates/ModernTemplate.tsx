import { TemplateProps } from '@/types/invitation'

export default function ModernTemplate({
  brideName,
  groomName,
  weddingDate,
  weddingTime,
  venue,
  venueAddress,
  photos,
  message,
}: TemplateProps) {
  const fontSans = 'var(--font-montserrat), var(--font-geist-sans), Arial, sans-serif'
  const accent = '#1A1A2E'
  const accentBright = '#E94560'
  const white = '#FFFFFF'
  const offWhite = '#F8F8F8'
  const gray = '#6B7280'
  const lightGray = '#E5E7EB'

  return (
    <div
      style={{
        background: white,
        color: accent,
        fontFamily: fontSans,
        minHeight: '100vh',
      }}
    >
      {/* ── HERO ─────────────────────────────── */}
      <section
        style={{
          background: accent,
          color: white,
          padding: '0',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background geometric accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: `${accentBright}12`,
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `1px solid ${accentBright}30`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: `1px solid ${accentBright}50`,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '64px 24px' }}>
          {/* Label */}
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: accentBright,
              marginBottom: 40,
              fontWeight: 600,
            }}
          >
            Undangan Pernikahan
          </p>

          {/* Line above */}
          <div
            style={{
              width: 40,
              height: 3,
              background: accentBright,
              margin: '0 auto 32px',
            }}
          />

          {/* Names */}
          <h1
            style={{
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              color: white,
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            {brideName}
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              margin: '16px 0',
            }}
          >
            <div style={{ flex: 1, maxWidth: 60, height: 1, background: `${white}30` }} />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: accentBright, fontWeight: 600 }}>
              &amp;
            </span>
            <div style={{ flex: 1, maxWidth: 60, height: 1, background: `${white}30` }} />
          </div>
          <h1
            style={{
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              color: white,
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            {groomName}
          </h1>

          {/* Line below */}
          <div
            style={{
              width: 40,
              height: 3,
              background: accentBright,
              margin: '32px auto 0',
            }}
          />
        </div>
      </section>

      {/* ── DATE & TIME ───────────────────────── */}
      <section
        style={{
          padding: '80px 24px',
          textAlign: 'center',
          borderBottom: `1px solid ${lightGray}`,
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: accentBright,
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          Tanggal &amp; Waktu
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'stretch',
            gap: 0,
            maxWidth: 480,
            width: '100%',
            border: `2px solid ${accent}`,
          }}
        >
          <div
            style={{
              background: accent,
              color: white,
              padding: '32px 40px',
              flex: 1,
            }}
          >
            <p
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: accentBright,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Tanggal
            </p>
            <p
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {weddingDate}
            </p>
          </div>
          <div
            style={{
              width: 2,
              background: accentBright,
            }}
          />
          <div
            style={{
              background: offWhite,
              color: accent,
              padding: '32px 40px',
              flex: 1,
            }}
          >
            <p
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: gray,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Waktu
            </p>
            <p
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {weddingTime}
            </p>
          </div>
        </div>
      </section>

      {/* ── VENUE ─────────────────────────────── */}
      <section
        style={{
          padding: '80px 24px',
          textAlign: 'center',
          borderBottom: `1px solid ${lightGray}`,
          background: offWhite,
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: accentBright,
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          Lokasi
        </p>

        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            maxWidth: 560,
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 4,
              height: '100%',
              background: accentBright,
            }}
          />
          <div style={{ paddingLeft: 28, textAlign: 'left' }}>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: accent,
                margin: '0 0 12px',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
              }}
            >
              {venue}
            </h2>
            {venueAddress && (
              <p
                style={{
                  fontSize: '0.9rem',
                  color: gray,
                  margin: 0,
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                {venueAddress}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ─────────────────────── */}
      {photos && photos.length > 0 && (
        <section
          style={{
            padding: '80px 24px',
            borderBottom: `1px solid ${lightGray}`,
          }}
        >
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: accentBright,
              fontWeight: 600,
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            Galeri Foto
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 4,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: i % 3 === 0 ? '1/1' : '4/3',
                  overflow: 'hidden',
                  background: lightGray,
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
            padding: '80px 24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: accentBright,
              fontWeight: 600,
              marginBottom: 40,
            }}
          >
            Pesan Kami
          </p>

          <div
            style={{
              maxWidth: 600,
              margin: '0 auto',
              padding: '40px',
              background: accent,
              color: white,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: accentBright,
              }}
            />
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              &ldquo;{message}&rdquo;
            </p>
            <div
              style={{
                width: 30,
                height: 2,
                background: accentBright,
                margin: '24px auto 0',
              }}
            />
          </div>
        </section>
      )}

      {/* ── FOOTER ────────────────────────────── */}
      <footer
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          background: accent,
          color: white,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ flex: 1, maxWidth: 60, height: 1, background: `${white}20` }} />
          <div style={{ width: 6, height: 6, background: accentBright, transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, maxWidth: 60, height: 1, background: `${white}20` }} />
        </div>
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: `${white}60`,
            fontWeight: 600,
          }}
        >
          {brideName} &amp; {groomName}
        </p>
      </footer>
    </div>
  )
}
