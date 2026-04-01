const C = {
  font: "var(--font-cormorant)",
  sans: "var(--font-geist-sans)",
  gold: "var(--gold)",
  goldLight: "var(--gold-light)",
  ivory: "var(--ivory)",
  parchment: "var(--parchment)",
  dark: "var(--text-dark)",
  mid: "var(--text-mid)",
  light: "var(--text-light)",
};

const schedule = [
  {
    time: "3:30 PM",
    event: "Guest Arrival",
    icon: "✿",
    desc: "Welcome drinks and aperitivo served on the lakeside terrace",
  },
  {
    time: "4:00 PM",
    event: "Wedding Ceremony",
    icon: "❦",
    desc: "Exchange of vows at the breathtaking Villa del Balbianello",
  },
  {
    time: "5:30 PM",
    event: "Cocktail Hour",
    icon: "❋",
    desc: "Champagne, canapés, and lake views as the sun begins to set",
  },
  {
    time: "7:00 PM",
    event: "Dinner & Dancing",
    icon: "❀",
    desc: "Candlelit dinner and celebration at Grand Hotel Villa d'Este",
  },
];

const galleryIcons = ["✿", "❦", "❋", "❀", "✾", "❁"];

export default function Home() {
  return (
    <div style={{ background: C.ivory, color: C.dark }}>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 2rem",
          overflow: "hidden",
        }}
      >
        {/* Watermark monogram */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: C.font,
              fontSize: "clamp(220px, 45vw, 560px)",
              fontWeight: 300,
              color: "rgba(196, 151, 60, 0.045)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              fontStyle: "italic",
            }}
          >
            AT
          </span>
        </div>

        {/* Top botanical ornament */}
        <div className="w-fade-in w-d1" style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <span
            className="w-botanical"
            style={{ fontSize: "1.8rem", color: C.gold, display: "inline-block" }}
          >
            ❦
          </span>
        </div>

        {/* Pre-text */}
        <p
          className="w-label w-fade-in-up w-d2"
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Together with their families
        </p>

        {/* Names */}
        <div className="w-fade-in-up w-d3" style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: C.font,
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: C.dark,
              margin: 0,
            }}
          >
            Amelia
          </h1>

          {/* Ampersand row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              justifyContent: "center",
              margin: "1.5rem 0",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "clamp(40px, 8vw, 100px)",
                background: `linear-gradient(90deg, transparent, ${C.gold})`,
              }}
            />
            <span
              className="gold-text"
              style={{
                fontFamily: C.font,
                fontSize: "clamp(2.2rem, 6vw, 5rem)",
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              &amp;
            </span>
            <div
              style={{
                height: "1px",
                width: "clamp(40px, 8vw, 100px)",
                background: `linear-gradient(90deg, ${C.gold}, transparent)`,
              }}
            />
          </div>

          <h1
            style={{
              fontFamily: C.font,
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: C.dark,
              margin: 0,
            }}
          >
            Thomas
          </h1>
        </div>

        {/* Ornamental divider */}
        <div className="w-fade-in-up w-d4" style={{ width: "min(200px, 50vw)", margin: "2.5rem auto 0" }}>
          <div className="w-ornament" style={{ justifyContent: "center" }}>
            <span style={{ fontSize: "0.6rem" }}>✦</span>
          </div>
        </div>

        {/* Date & location */}
        <div className="w-fade-in-up w-d5" style={{ textAlign: "center", marginTop: "2rem" }}>
          <p
            style={{
              fontFamily: C.font,
              fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: C.mid,
              margin: "0 0 0.6rem",
            }}
          >
            Saturday, September 14, 2026
          </p>
          <p
            className="w-label"
            style={{ color: C.gold, letterSpacing: "0.3em" }}
          >
            Villa del Balbianello · Lake Como, Italy
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="w-fade-in w-d7"
          style={{
            position: "absolute",
            bottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            className="w-label"
            style={{ color: C.light, fontSize: "0.6rem" }}
          >
            Scroll
          </span>
          <div className="w-scroll-line" />
        </div>
      </section>

      {/* ════════════════════════════════════════
          DETAILS
      ════════════════════════════════════════ */}
      <section style={{ padding: "7rem 2rem", background: C.parchment }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="w-label" style={{ marginBottom: "1rem" }}>The Celebration</span>
            <h2
              style={{
                fontFamily: C.font,
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: C.dark,
                margin: 0,
              }}
            >
              Join Us
            </h2>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Ceremony */}
            <div
              className="w-card"
              style={{
                borderRadius: "2px",
                padding: "clamp(2rem, 5vw, 3.5rem)",
                textAlign: "center",
              }}
            >
              <span
                className="w-botanical"
                style={{
                  display: "block",
                  color: C.gold,
                  fontSize: "2rem",
                  marginBottom: "1.25rem",
                }}
              >
                ❁
              </span>
              <span className="w-label" style={{ marginBottom: "0.75rem" }}>Ceremony</span>
              <h3
                style={{
                  fontFamily: C.font,
                  fontSize: "1.9rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: C.dark,
                  margin: "0.5rem 0 1.25rem",
                }}
              >
                Villa del Balbianello
              </h3>
              <p
                style={{
                  color: C.mid,
                  lineHeight: 1.9,
                  fontFamily: C.font,
                  fontSize: "1.05rem",
                }}
              >
                Via Comoedia 5<br />
                Lenno, Lake Como<br />
                22016 CO, Italy
              </p>
              <div
                style={{
                  width: "36px",
                  height: "1px",
                  background: C.gold,
                  margin: "1.75rem auto",
                }}
              />
              <p
                style={{
                  fontFamily: C.font,
                  fontSize: "1.5rem",
                  color: C.dark,
                  fontStyle: "italic",
                }}
              >
                4:00 <span style={{ fontSize: "1rem" }}>PM</span>
              </p>
            </div>

            {/* Reception */}
            <div
              className="w-card"
              style={{
                borderRadius: "2px",
                padding: "clamp(2rem, 5vw, 3.5rem)",
                textAlign: "center",
              }}
            >
              <span
                className="w-botanical-2"
                style={{
                  display: "block",
                  color: C.gold,
                  fontSize: "2rem",
                  marginBottom: "1.25rem",
                }}
              >
                ❋
              </span>
              <span className="w-label" style={{ marginBottom: "0.75rem" }}>Reception</span>
              <h3
                style={{
                  fontFamily: C.font,
                  fontSize: "1.9rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: C.dark,
                  margin: "0.5rem 0 1.25rem",
                }}
              >
                Grand Hotel Villa d&#8217;Este
              </h3>
              <p
                style={{
                  color: C.mid,
                  lineHeight: 1.9,
                  fontFamily: C.font,
                  fontSize: "1.05rem",
                }}
              >
                Via Regina 40<br />
                Cernobbio, Lake Como<br />
                22012 CO, Italy
              </p>
              <div
                style={{
                  width: "36px",
                  height: "1px",
                  background: C.gold,
                  margin: "1.75rem auto",
                }}
              />
              <p
                style={{
                  fontFamily: C.font,
                  fontSize: "1.5rem",
                  color: C.dark,
                  fontStyle: "italic",
                }}
              >
                7:00 <span style={{ fontSize: "1rem" }}>PM</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SCHEDULE
      ════════════════════════════════════════ */}
      <section style={{ padding: "7rem 2rem", background: C.ivory }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <span className="w-label" style={{ marginBottom: "1rem" }}>The Day Unfolds</span>
            <h2
              style={{
                fontFamily: C.font,
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: C.dark,
                margin: 0,
              }}
            >
              Schedule
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1px",
                background: `linear-gradient(to bottom, transparent, ${C.gold} 15%, ${C.gold} 85%, transparent)`,
                transform: "translateX(-50%)",
              }}
            />

            {schedule.map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "1fr 56px 1fr",
                    alignItems: "center",
                    marginBottom: i < schedule.length - 1 ? "3.5rem" : 0,
                    gap: "1.5rem",
                  }}
                >
                  {/* Left slot */}
                  <div style={{ textAlign: "right" }}>
                    {isRight && (
                      <>
                        <span
                          className="w-label"
                          style={{ marginBottom: "0.35rem", display: "block" }}
                        >
                          {item.time}
                        </span>
                        <h3
                          style={{
                            fontFamily: C.font,
                            fontSize: "1.45rem",
                            fontWeight: 500,
                            color: C.dark,
                            margin: "0 0 0.3rem",
                          }}
                        >
                          {item.event}
                        </h3>
                        <p
                          style={{
                            color: C.light,
                            fontSize: "0.9rem",
                            lineHeight: 1.65,
                            margin: 0,
                            fontFamily: C.font,
                          }}
                        >
                          {item.desc}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="w-timeline-dot">{item.icon}</div>

                  {/* Right slot */}
                  <div style={{ textAlign: "left" }}>
                    {!isRight && (
                      <>
                        <span
                          className="w-label"
                          style={{ marginBottom: "0.35rem", display: "block" }}
                        >
                          {item.time}
                        </span>
                        <h3
                          style={{
                            fontFamily: C.font,
                            fontSize: "1.45rem",
                            fontWeight: 500,
                            color: C.dark,
                            margin: "0 0 0.3rem",
                          }}
                        >
                          {item.event}
                        </h3>
                        <p
                          style={{
                            color: C.light,
                            fontSize: "0.9rem",
                            lineHeight: 1.65,
                            margin: 0,
                            fontFamily: C.font,
                          }}
                        >
                          {item.desc}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GALLERY
      ════════════════════════════════════════ */}
      <section style={{ padding: "7rem 2rem", background: C.parchment }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="w-label" style={{ marginBottom: "1rem" }}>Our Story</span>
            <h2
              style={{
                fontFamily: C.font,
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: C.dark,
                margin: 0,
              }}
            >
              Moments
            </h2>
          </div>

          {/* Gallery grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto auto",
              gap: "0.75rem",
            }}
          >
            {galleryIcons.map((icon, i) => {
              const hues = [32, 20, 40, 28, 36, 25];
              const lights = [83, 78, 85, 80, 82, 77];
              const tall = i === 1 || i === 4;
              return (
                <div
                  key={i}
                  className="w-gallery-cell"
                  style={{
                    aspectRatio: tall ? "3 / 4" : "4 / 3",
                    background: `linear-gradient(135deg, hsl(${hues[i]}, 28%, ${lights[i]}%), hsl(${hues[i] + 10}, 32%, ${lights[i] - 4}%))`,
                    gridRow: tall ? "span 1" : undefined,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(196, 151, 60, 0.25)",
                      fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {icon}
                  </span>
                </div>
              );
            })}
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontFamily: C.font,
              fontStyle: "italic",
              color: C.light,
              fontSize: "1.1rem",
            }}
          >
            Photos coming soon &mdash; we cannot wait to share them with you
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          RSVP
      ════════════════════════════════════════ */}
      <section
        style={{
          padding: "8rem 2rem",
          background: `linear-gradient(160deg, ${C.dark} 0%, #3D2E1E 100%)`,
          color: C.ivory,
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <span
            className="w-botanical"
            style={{
              display: "block",
              color: C.gold,
              fontSize: "2rem",
              marginBottom: "1.5rem",
            }}
          >
            ❦
          </span>

          <span
            className="w-label"
            style={{ marginBottom: "1rem", color: C.gold }}
          >
            Kindly Reply By
          </span>

          <h2
            style={{
              fontFamily: C.font,
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: C.ivory,
              margin: "0.25rem 0",
            }}
          >
            August 1, 2026
          </h2>

          <div
            style={{
              width: "60px",
              height: "1px",
              background: C.gold,
              margin: "2.5rem auto",
              opacity: 0.6,
            }}
          />

          <p
            style={{
              fontFamily: C.font,
              fontSize: "1.25rem",
              color: "rgba(249, 245, 238, 0.65)",
              lineHeight: 1.85,
              marginBottom: "3rem",
            }}
          >
            We would be truly honored by your presence as we begin our new
            chapter together. Please let us know if you are able to join us in
            celebrating this joyous occasion.
          </p>

          <a
            href="mailto:rsvp@ameliaandthomas.com?subject=RSVP%20%E2%80%94%20Amelia%20%26%20Thomas%20Wedding"
            className="w-rsvp-btn"
          >
            RSVP Now
          </a>

          <p
            style={{
              fontFamily: C.sans,
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(249, 245, 238, 0.3)",
              marginTop: "2rem",
            }}
          >
            rsvp@ameliaandthomas.com
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer
        style={{
          background: C.dark,
          borderTop: "1px solid rgba(196, 151, 60, 0.15)",
          padding: "2.5rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          className="w-ornament"
          style={{ maxWidth: "300px", margin: "0 auto 1.25rem" }}
        >
          <span style={{ fontSize: "0.7rem" }}>✦</span>
        </div>
        <p
          style={{
            fontFamily: C.font,
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "rgba(249, 245, 238, 0.35)",
            margin: 0,
          }}
        >
          Amelia &amp; Thomas &middot; September 14, 2026
        </p>
      </footer>

    </div>
  );
}
