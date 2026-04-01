import Link from 'next/link'
import { TEMPLATES } from '@/components/templates'

const templatePreviews: Record<string, { bg: string; accent: string; icon: string }> = {
  elegant: { bg: 'linear-gradient(135deg, #F9F5EE 0%, #EFE8D8 100%)', accent: '#C4973C', icon: '❦' },
  modern:  { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',  accent: '#e94560', icon: '◆' },
  rustic:  { bg: 'linear-gradient(135deg, #f5ebe0 0%, #ddb892 100%)',  accent: '#7a5c3a', icon: '✿' },
}

const steps = [
  {
    number: '01',
    title: 'Pilih Template',
    desc: 'Pilih dari koleksi template undangan kami yang cantik — Elegan, Modern, atau Rustic.',
    icon: '🎨',
  },
  {
    number: '02',
    title: 'Isi Data',
    desc: 'Masukkan nama pasangan, tanggal, lokasi, dan foto pernikahan Anda dengan mudah.',
    icon: '✏️',
  },
  {
    number: '03',
    title: 'Bagikan',
    desc: 'Dapatkan tautan unik dan bagikan undangan digital Anda kepada seluruh keluarga dan tamu.',
    icon: '💌',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--ivory)', color: 'var(--text-dark)' }}>

      {/* ── NAV ──────────────────────────────────── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(249, 245, 238, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(196, 151, 60, 0.15)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1.6rem',
            fontWeight: 600,
            fontStyle: 'italic',
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em',
          }}
        >
          AT <span style={{ color: 'var(--gold)' }}>Wedding</span>
        </span>
        <Link
          href="/create"
          style={{
            background: 'var(--gold)',
            color: '#fff',
            padding: '0.55rem 1.4rem',
            borderRadius: '2px',
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Buat Undangan
        </Link>
      </nav>

      {/* ── HERO ─────────────────────────────────── */}
      <section
        style={{
          minHeight: '92svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '6rem 1.5rem 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background monogram watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(200px, 40vw, 520px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(196, 151, 60, 0.04)',
              lineHeight: 1,
            }}
          >
            ♡
          </span>
        </div>

        {/* Label */}
        <p
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
          }}
        >
          Platform Undangan Digital Pernikahan
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--text-dark)',
            maxWidth: '900px',
            margin: '0 auto 1.5rem',
          }}
        >
          Buat Undangan Pernikahan
          <br />
          <span style={{ color: 'var(--gold)' }}>Digital yang Indah</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'var(--text-mid)',
            maxWidth: '580px',
            lineHeight: 1.7,
            margin: '0 auto 3rem',
          }}
        >
          Pilih template cantik, isi data pasangan Anda, dan bagikan tautan undangan unik kepada semua tamu dalam hitungan menit.
        </p>

        {/* CTA */}
        <Link
          href="/create"
          style={{
            display: 'inline-block',
            background: 'var(--gold)',
            color: '#fff',
            padding: '1rem 2.5rem',
            borderRadius: '2px',
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(196, 151, 60, 0.35)',
          }}
        >
          Buat Undangan Sekarang →
        </Link>

        <p
          style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            letterSpacing: '0.1em',
          }}
        >
          GRATIS · CEPAT · MUDAH
        </p>
      </section>

      {/* ── TEMPLATE GALLERY ─────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--parchment)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section heading */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '0.75rem',
              }}
            >
              Koleksi Template
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text-dark)',
                margin: 0,
              }}
            >
              Pilih Gaya Undangan Anda
            </h2>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {TEMPLATES.map((tpl) => {
              const preview = templatePreviews[tpl.id] ?? templatePreviews.elegant
              return (
                <div
                  key={tpl.id}
                  style={{
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow: '0 2px 24px rgba(42, 33, 24, 0.08)',
                  }}
                >
                  {/* Preview thumbnail */}
                  <div
                    style={{
                      height: '200px',
                      background: preview.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '4rem',
                        color: preview.accent,
                        opacity: 0.6,
                      }}
                    >
                      {preview.icon}
                    </span>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: '1.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: '1.1rem',
                          fontStyle: 'italic',
                          color: preview.accent,
                          opacity: 0.8,
                        }}
                      >
                        Nama & Nama
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        color: 'var(--text-dark)',
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {tpl.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-geist-sans)',
                        fontSize: '0.85rem',
                        color: 'var(--text-mid)',
                        lineHeight: 1.6,
                        margin: '0 0 1.25rem',
                      }}
                    >
                      {tpl.description}
                    </p>
                    <Link
                      href="/create"
                      style={{
                        display: 'inline-block',
                        border: `1px solid ${preview.accent}`,
                        color: preview.accent,
                        padding: '0.5rem 1.25rem',
                        borderRadius: '2px',
                        fontFamily: 'var(--font-geist-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                      }}
                    >
                      Gunakan Template
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Section heading */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '0.75rem',
              }}
            >
              Cara Kerja
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text-dark)',
                margin: 0,
              }}
            >
              Tiga Langkah Mudah
            </h2>
          </div>

          {/* Steps */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                style={{
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                  background: 'var(--parchment)',
                  borderRadius: '4px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: 'var(--gold)',
                    marginBottom: '1rem',
                  }}
                >
                  {step.number}
                </span>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>
                  {step.icon}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'var(--text-dark)',
                    margin: '0 0 0.75rem',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '0.875rem',
                    color: 'var(--text-mid)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────── */}
      <section
        style={{
          padding: '8rem 1.5rem',
          background: 'linear-gradient(160deg, var(--text-dark) 0%, #3D2E1E 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span
            style={{
              display: 'block',
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              color: 'var(--gold)',
            }}
          >
            ❦
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--ivory)',
              margin: '0 0 1.25rem',
            }}
          >
            Siap Membuat Undangan?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.25rem',
              color: 'rgba(249, 245, 238, 0.65)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            Bergabunglah dengan ribuan pasangan yang telah mempercayakan undangan digital pernikahan mereka kepada AT Wedding.
          </p>
          <Link
            href="/create"
            style={{
              display: 'inline-block',
              background: 'var(--gold)',
              color: '#fff',
              padding: '1.1rem 3rem',
              borderRadius: '2px',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(196, 151, 60, 0.4)',
            }}
          >
            Mulai Buat Undangan Gratis →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer
        style={{
          background: 'var(--text-dark)',
          borderTop: '1px solid rgba(196, 151, 60, 0.12)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'rgba(249, 245, 238, 0.35)',
            margin: '0 0 0.5rem',
          }}
        >
          AT Wedding
        </p>
        <p
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.7rem',
            color: 'rgba(249, 245, 238, 0.2)',
            letterSpacing: '0.12em',
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} AT Wedding · Platform Undangan Digital Pernikahan
        </p>
      </footer>

    </div>
  )
}
