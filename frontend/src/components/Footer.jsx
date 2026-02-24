const Footer = () => {
  const socials = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/swahilipothub/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://web.facebook.com/Swahilipothub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@swahilipothub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@swahilipothubfoundation",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29.94 29.94 0 001 12a29.94 29.94 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29.94 29.94 0 0023 12a29.94 29.94 0 00-.46-5.58z"/>
          <polygon fill="#0a1628" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
        </svg>
      ),
    },
    {
      name: "Twitter / X",
      url: "https://twitter.com/swahilipothub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/swahilipot-hub/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="sp-footer">
      <style>{`
        .sp-footer {
          background: #0a1628;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 3rem 2rem 1.5rem;
          font-family: 'DM Sans', 'Plus Jakarta Sans', sans-serif;
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        /* Brand */
        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .footer-logo-icon {
          width: 36px; height: 36px;
          color: #93c5fd;
        }
        .footer-logo-icon svg { width: 100%; height: 100%; }
        .footer-logo-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }
        .footer-tagline {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          text-align: center;
        }

        /* Divider */
        .footer-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* Social links */
        .footer-socials-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          text-align: center;
        }
        .footer-socials {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .social-link:hover {
          background: rgba(37,99,235,0.2);
          border-color: rgba(59,130,246,0.4);
          color: #93c5fd;
          transform: translateY(-2px);
        }
        .social-icon {
          width: 16px; height: 16px;
          flex-shrink: 0;
        }

        /* Bottom bar */
        .footer-bottom {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
        }
        .footer-bottom-links {
          display: flex;
          gap: 1.25rem;
        }
        .footer-bottom-links a {
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-bottom-links a:hover { color: rgba(255,255,255,0.5); }

        @media (max-width: 600px) {
          .social-link span { display: none; }
          .social-link { padding: 0.6rem; border-radius: 10px; }
          .social-icon { width: 18px; height: 18px; }
          .footer-bottom { justify-content: center; text-align: center; }
          .footer-bottom-links { justify-content: center; }
        }
      `}</style>

      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 4C24 4 10 12 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 12 24 4 24 4Z" fill="currentColor" opacity="0.2"/>
                <path d="M24 10C24 10 14 17 14 26C14 31.523 18.477 36 24 36C29.523 36 34 31.523 34 26C34 17 24 10 24 10Z" fill="currentColor" opacity="0.4"/>
                <circle cx="24" cy="26" r="8" fill="currentColor"/>
                <path d="M20 26C20 23.791 21.791 22 24 22" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="footer-logo-name">Swahilipot Hub</span>
          </div>
          <p className="footer-tagline">Empowering Youth Through Technology & Arts · Mombasa, Kenya</p>
        </div>

        <div className="footer-divider" />

        {/* Social links */}
        <p className="footer-socials-label">Follow us on social media</p>
        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={s.name}
            >
              <span className="social-icon">{s.icon}</span>
              <span>{s.name}</span>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Swahilipot Hub Foundation. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="mailto:info@swahilipot.org">info@swahilipot.org</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
