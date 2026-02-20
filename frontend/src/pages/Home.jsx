import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ── Photos (Unsplash - free, reliable) ────────────────────
const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1800&q=85",
  conference: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80",
  techlab: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  eventHall: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  about1: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  about2: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  g1: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75",
  g2: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=75",
  g3: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=75",
  g4: "https://images.unsplash.com/photo-1558403194-611308249627?w=600&q=75",
  g5: "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=600&q=75",
};

const SPACES = [
  { name: "Conference Room A", cap: "Up to 12 people", price: "KES 500", img: PHOTOS.conference, icon: "🪑", tag: "Most Booked", desc: "Fully equipped boardroom with projector, whiteboard & high-speed Wi-Fi." },
  { name: "Tech Lab", cap: "Up to 20 people", price: "KES 750", img: PHOTOS.techlab, icon: "💻", tag: "Innovation", desc: "Workstations, dual monitors, soldering stations & fibre internet." },
  { name: "Event Hall", cap: "Up to 80 people", price: "KES 2,000", img: PHOTOS.eventHall, icon: "🎪", tag: "Large Venue", desc: "Spacious hall with stage, PA system & flexible seating arrangements." },
];

const STATS = [
  { val: "3,000+", lbl: "Members" },
  { val: "150+", lbl: "Events Hosted" },
  { val: "8+", lbl: "Years Running" },
  { val: "20+", lbl: "Partners" },
];

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBook = () => {
    if (user) navigate("/booking");
    else navigate("/signup");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1e293b", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --b900: #0a1628; --b800: #0d2044; --b700: #1a3a6b;
          --b600: #1e4d9b; --b500: #2563eb; --b400: #3b82f6;
          --b300: #93c5fd; --b100: #dbeafe; --b50:  #eff6ff;
          --g50:  #f8fafc; --g100: #f1f5f9; --g200: #e2e8f0;
          --g400: #94a3b8; --g600: #475569; --g800: #1e293b;
        }

        /* NAVBAR */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 3rem;
          background: rgba(10,22,40,0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .nav-brand { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
        .nav-logo { width: 38px; height: 38px; color: #93c5fd; }
        .nav-logo svg { width: 100%; height: 100%; }
        .nav-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #ffffff; }
        .nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .nav-link {
          padding: 0.45rem 1rem; border-radius: 8px;
          font-size: 0.875rem; color: rgba(255,255,255,0.55);
          cursor: pointer; border: none; background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500;
          transition: color 0.15s, background 0.15s;
        }
        .nav-link:hover { color: #ffffff; background: rgba(255,255,255,0.08); }
        .nav-cta {
          padding: 0.5rem 1.25rem; background: #2563eb;
          border: none; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; font-weight: 600;
          color: #ffffff; cursor: pointer;
          box-shadow: 0 2px 14px rgba(37,99,235,0.45);
          transition: background 0.15s, transform 0.15s;
        }
        .nav-cta:hover { background: #3b82f6; transform: translateY(-1px); }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden;
        }
        .hero-photo {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          animation: zoomOut 10s ease forwards;
        }
        @keyframes zoomOut { from { transform: scale(1.08); } to { transform: scale(1.0); } }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 45%, rgba(10,22,40,0.3) 100%);
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 56px 56px; pointer-events: none;
        }
        .hero-content {
          position: relative; z-index: 5;
          padding: 0 4rem; max-width: 700px; margin-top: 5rem;
          animation: heroSlide 1s ease both;
        }
        @keyframes heroSlide { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 1rem;
          background: rgba(37,99,235,0.15); border: 1px solid rgba(59,130,246,0.4);
          border-radius: 9999px; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #93c5fd; margin-bottom: 1.5rem;
          animation: heroSlide 1s 0.15s ease both;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.75rem, 5.5vw, 4.75rem);
          font-weight: 700; color: #ffffff;
          line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 1.25rem;
          animation: heroSlide 1s 0.25s ease both;
        }
        .hero-title em { font-style: italic; color: #93c5fd; }
        .hero-sub {
          font-size: 1rem; color: rgba(255,255,255,0.55); line-height: 1.75;
          max-width: 480px; margin-bottom: 2.5rem;
          animation: heroSlide 1s 0.4s ease both;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; animation: heroSlide 1s 0.55s ease both; }
        .btn-hero-blue {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.95rem 2.25rem; background: #2563eb;
          border: none; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 700;
          color: #ffffff; cursor: pointer;
          box-shadow: 0 6px 28px rgba(37,99,235,0.5); transition: all 0.2s;
        }
        .btn-hero-blue:hover { background: #3b82f6; transform: translateY(-2px); box-shadow: 0 10px 36px rgba(37,99,235,0.6); }
        .btn-hero-ghost {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.95rem 2.25rem; background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 500;
          color: rgba(255,255,255,0.8); cursor: pointer; backdrop-filter: blur(4px); transition: all 0.2s;
        }
        .btn-hero-ghost:hover { background: rgba(255,255,255,0.15); color: #ffffff; border-color: rgba(255,255,255,0.35); }

        .hero-scroll {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          z-index: 5; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          color: rgba(255,255,255,0.25); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
          animation: heroSlide 1s 0.9s ease both;
        }
        .scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, rgba(59,130,246,0.7), transparent); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

        /* STATS */
        .stats-bar {
          background: #ffffff; border-bottom: 1px solid #e2e8f0;
          display: grid; grid-template-columns: repeat(4,1fr); text-align: center;
          box-shadow: 0 2px 12px rgba(37,99,235,0.06);
        }
        .stat-item { padding: 2rem 1rem; border-right: 1px solid #e2e8f0; }
        .stat-item:last-child { border-right: none; }
        .stat-val { font-family: 'Playfair Display', serif; font-size: 2.1rem; font-weight: 700; color: #2563eb; }
        .stat-lbl { font-size: 0.75rem; color: #94a3b8; margin-top: 4px; letter-spacing: 0.06em; text-transform: uppercase; }

        /* SECTIONS */
        .section { padding: 6rem 4rem; max-width: 1240px; margin: 0 auto; }
        .spaces-bg { background: #f8fafc; }
        .about-bg  { background: #ffffff; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
        .gallery-bg { background: #f8fafc; }
        .cta-wrap  { padding: 0 4rem 6rem; background: #f8fafc; }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #2563eb; margin-bottom: 0.6rem;
        }
        .eyebrow::before { content: ''; width: 18px; height: 2px; background: #2563eb; border-radius: 1px; display: inline-block; }
        .sec-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.75rem); font-weight: 700; color: #1e293b; line-height: 1.15; margin-bottom: 0.75rem; }
        .sec-sub { font-size: 0.9rem; color: #94a3b8; line-height: 1.75; max-width: 480px; }

        /* SPACE CARDS */
        .spaces-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3rem; }
        .space-card {
          border-radius: 18px; overflow: hidden; background: #ffffff;
          border: 1px solid #e2e8f0; cursor: pointer;
          transition: transform 0.35s, border-color 0.25s, box-shadow 0.35s;
          display: flex; flex-direction: column;
          box-shadow: 0 2px 12px rgba(37,99,235,0.05);
        }
        .space-card:hover { transform: translateY(-7px); border-color: #3b82f6; box-shadow: 0 20px 48px rgba(37,99,235,0.15); }
        .space-img-wrap { position: relative; height: 210px; overflow: hidden; }
        .space-img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85) saturate(0.9); transition: transform 0.5s, filter 0.4s; }
        .space-card:hover .space-img-wrap img { transform: scale(1.07); filter: brightness(0.95) saturate(1.05); }
        .space-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 55%); }
        .space-tag {
          position: absolute; top: 1rem; left: 1rem;
          padding: 0.28rem 0.75rem; background: rgba(37,99,235,0.2); border: 1px solid rgba(59,130,246,0.5);
          border-radius: 9999px; font-size: 0.7rem; font-weight: 600; color: #bfdbfe; backdrop-filter: blur(6px);
        }
        .space-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .space-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #1e293b; margin-bottom: 0.4rem; }
        .space-desc { font-size: 0.82rem; color: #94a3b8; line-height: 1.65; flex: 1; margin-bottom: 1.25rem; }
        .space-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid #dbeafe; }
        .space-cap { font-size: 0.78rem; color: #94a3b8; }
        .space-price { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #2563eb; font-weight: 700; }

        /* ABOUT */
        .about-split { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .collage { position: relative; height: 500px; }
        .col-main {
          position: absolute; top: 0; left: 0; width: 70%; height: 73%;
          border-radius: 18px; overflow: hidden; border: 1px solid #e2e8f0;
          box-shadow: 0 20px 60px rgba(37,99,235,0.12);
        }
        .col-accent {
          position: absolute; bottom: 0; right: 0; width: 58%; height: 55%;
          border-radius: 18px; overflow: hidden; border: 1px solid #e2e8f0;
          box-shadow: 0 16px 48px rgba(37,99,235,0.1);
        }
        .col-main img, .col-accent img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.88) saturate(0.9); }
        .col-badge {
          position: absolute; bottom: 4rem; left: -1.25rem;
          background: #2563eb; border-radius: 14px; padding: 1rem 1.25rem;
          box-shadow: 0 8px 32px rgba(37,99,235,0.45); z-index: 10;
        }
        .col-badge-num { font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 700; color: #ffffff; line-height: 1; }
        .col-badge-lbl { font-size: 0.7rem; color: rgba(255,255,255,0.7); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.08em; }
        .about-text { display: flex; flex-direction: column; gap: 1.25rem; }
        .about-body { font-size: 0.95rem; color: #475569; line-height: 1.85; }
        .features { display: flex; flex-direction: column; gap: 0.7rem; margin-top: 0.5rem; }
        .feature { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.875rem; color: #475569; line-height: 1.55; }
        .feat-dot {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0; margin-top: 1px;
          background: #eff6ff; border: 1px solid #dbeafe;
          display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #2563eb;
        }

        /* GALLERY */
        .gallery-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 220px 220px; gap: 0.75rem; margin-top: 3rem;
        }
        .gal-item { border-radius: 14px; overflow: hidden; position: relative; cursor: pointer; }
        .gal-item:first-child { grid-row: span 2; border-radius: 18px; }
        .gal-item img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.82) saturate(0.85); transition: transform 0.45s, filter 0.35s; }
        .gal-item:hover img { transform: scale(1.06); filter: brightness(0.97) saturate(1.05); }
        .gal-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,22,40,0.35) 0%, transparent 55%); pointer-events: none; }

        /* CTA */
        .cta-banner {
          position: relative; overflow: hidden; border-radius: 24px; padding: 5rem 3rem; text-align: center;
          background: #0a1628; border: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 24px 80px rgba(10,22,40,0.25);
        }
        .cta-photo { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.1; filter: saturate(0.4); }
        .cta-glow {
          position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 350px;
          background: radial-gradient(ellipse, rgba(37,99,235,0.25) 0%, transparent 65%); pointer-events: none;
        }
        .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 700; color: #ffffff; margin-bottom: 1rem; position: relative; }
        .cta-sub { font-size: 0.95rem; color: rgba(255,255,255,0.45); max-width: 420px; margin: 0 auto 2.5rem; line-height: 1.75; position: relative; }
        .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; }

        @media (max-width: 900px) {
          .section { padding: 4rem 1.5rem; }
          .navbar { padding: 1rem 1.5rem; }
          .hero-content { padding: 0 1.5rem; }
          .spaces-grid { grid-template-columns: 1fr; }
          .about-split { grid-template-columns: 1fr; gap: 3rem; }
          .cta-wrap { padding: 0 1.5rem 4rem; }
        }
        @media (max-width: 700px) {
          .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
        }
        @media (max-width: 640px) {
          .nav-links .nav-link { display: none; }
          .stats-bar { grid-template-columns: repeat(2,1fr); }
          .stat-item:nth-child(2) { border-right: none; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="nav-logo">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 4C24 4 10 12 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 12 24 4 24 4Z" fill="currentColor" opacity="0.2" />
              <path d="M24 10C24 10 14 17 14 26C14 31.523 18.477 36 24 36C29.523 36 34 31.523 34 26C34 17 24 10 24 10Z" fill="currentColor" opacity="0.4" />
              <circle cx="24" cy="26" r="8" fill="currentColor" />
              <path d="M20 26C20 23.791 21.791 22 24 22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="nav-name">Swahilipot Hub</span>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" })}>Our Spaces</button>
          <button className="nav-link" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>About</button>
          <button className="nav-link" onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}>Gallery</button>
          {user?.role === "admin" && (
            <button className="nav-link" onClick={() => navigate("/admin-panel")}>Admin</button>
          )}
          {user ? (
            <button className="nav-cta" onClick={() => navigate("/booking")}>My Dashboard</button>
          ) : (
            <>
              <button className="nav-link" onClick={() => navigate("/login")}>Login</button>
              <button className="nav-cta" onClick={() => navigate("/signup")}>Book Now</button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-photo" style={{ backgroundImage: `url('${PHOTOS.hero}')` }} />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow"><span>📍</span> Karibu Swahili Pot · Mombasa, Kenya</div>
          <h1 className="hero-title">Book the Perfect<br /><em>Venue</em> for Your<br />Event</h1>
          <p className="hero-sub">Reserve elegant spaces for meetings, workshops, corporate functions, and community gatherings. Simple, reliable, and memorable.</p>
          <div className="hero-actions">
            <button className="btn-hero-blue" onClick={handleBook}>📅 Book a Venue</button>
            <button className="btn-hero-ghost" onClick={() => document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" })}>Explore Spaces →</button>
          </div>
        </div>
        <div className="hero-scroll"><div className="scroll-line" />Scroll</div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {STATS.map((s, i) => (
          <Reveal key={s.lbl} delay={i * 80}>
            <div className="stat-item">
              <div className="stat-val">{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* SPACES */}
      <div id="spaces" className="spaces-bg">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Our Spaces</p>
            <h2 className="sec-title">Find Your Perfect Space</h2>
            <p className="sec-sub">From intimate boardrooms to large event halls — we have the right space for every occasion.</p>
          </Reveal>
          <div className="spaces-grid">
            {SPACES.map((s, i) => (
              <Reveal key={s.name} delay={i * 100}>
                <div className="space-card" onClick={handleBook}>
                  <div className="space-img-wrap">
                    <img src={s.img} alt={s.name} loading="lazy" />
                    <div className="space-img-overlay" />
                    <span className="space-tag">{s.tag}</span>
                  </div>
                  <div className="space-body">
                    <div className="space-name">{s.icon} {s.name}</div>
                    <div className="space-desc">{s.desc}</div>
                    <div className="space-footer">
                      <span className="space-cap">👥 {s.cap}</span>
                      <span className="space-price">{s.price} / session</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" className="about-bg">
        <div className="section">
          <div className="about-split">
            <Reveal delay={0}>
              <div className="collage">
                <div className="col-main"><img src={PHOTOS.about1} alt="Team collaboration" loading="lazy" /></div>
                <div className="col-accent"><img src={PHOTOS.about2} alt="Workshop session" loading="lazy" /></div>
                <div className="col-badge">
                  <div className="col-badge-num">8+</div>
                  <div className="col-badge-lbl">Years of Innovation</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="about-text">
                <p className="eyebrow">About Swahilipot</p>
                <h2 className="sec-title">The Heart of the<br />Kenyan Coast</h2>
                <p className="about-body">Swahilipot Hub is a creative and innovation space rooted in Mombasa, dedicated to empowering young people through technology, arts, and entrepreneurship. Since 2017, we've been building a vibrant ecosystem for makers, thinkers, and changemakers across East Africa.</p>
                <div className="features">
                  {[
                    ["✦", "High-speed fibre internet across all spaces"],
                    ["✦", "Professional AV equipment & projectors"],
                    ["✦", "Flexible booking — hourly, daily, or weekly"],
                    ["✦", "Secure M-Pesa payment integration"],
                    ["✦", "On-site support team always available"],
                  ].map(([dot, text]) => (
                    <div key={text} className="feature">
                      <div className="feat-dot">{dot}</div>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <button className="btn-hero-blue" onClick={handleBook}>Book Your Space Today</button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div id="gallery" className="gallery-bg">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h2 className="sec-title">Life at Swahilipot</h2>
            <p className="sec-sub">A glimpse into the energy, creativity, and community that makes our hub unique.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="gallery-grid">
              {[PHOTOS.g1, PHOTOS.g2, PHOTOS.g3, PHOTOS.g4, PHOTOS.g5].map((src, i) => (
                <div key={i} className="gal-item">
                  <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-wrap">
        <Reveal>
          <div className="cta-banner">
            <div className="cta-photo" style={{ backgroundImage: `url('${PHOTOS.eventHall}')` }} />
            <div className="cta-glow" />
            <h2 className="cta-title">Ready to Make Your<br />Event Unforgettable?</h2>
            <p className="cta-sub">Join 3,000+ members who trust Swahilipot for their meetings, workshops, and events. Book in minutes. Pay via M-Pesa.</p>
            <div className="cta-actions">
              <button className="btn-hero-blue" onClick={handleBook}>📅 Reserve a Space</button>
              <button className="btn-hero-ghost" onClick={() => navigate("/login")}>Check My Booking →</button>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
};

export default HomePage;
