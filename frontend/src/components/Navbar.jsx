import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User as UserIcon, Shield, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const { user, logout }          = useAuth();
  const location                  = useLocation();
  const navigate                  = useNavigate();

  // Shrink/shadow navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const links = [
    { name: "Home",        path: "/" },
    { name: "Our Spaces",  path: "/venues" },
    { name: "About Us",    path: "/about" },
    { name: "My Bookings", path: "/dashboard" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          transition: background 0.3s, box-shadow 0.3s, padding 0.3s;
        }
        .nav-root.scrolled {
          background: rgba(10,22,40,0.97);
          box-shadow: 0 2px 24px rgba(10,22,40,0.55);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        .nav-root.top {
          background: rgba(10,22,40,0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }
        .nav-logo-icon {
          width: 38px; height: 38px;
          background: #2563eb;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          letter-spacing: -0.5px;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(37,99,235,0.45);
        }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .nav-logo-sub {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-top: 2px;
        }

        /* ── Desktop Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          position: relative;
          transition: color 0.15s;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0; right: 0;
          height: 1.5px;
          background: #3b82f6;
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.2s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link.active { color: #fff; font-weight: 600; }
        .nav-link.active::after { transform: scaleX(1); }

        /* ── Right Actions ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .nav-user-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 0.35rem 0.75rem;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: background 0.15s;
        }
        .nav-user-chip:hover { background: rgba(255,255,255,0.12); }

        .nav-admin-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.35);
          border-radius: 8px;
          padding: 0.35rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #93c5fd;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: background 0.15s;
        }
        .nav-admin-chip:hover { background: rgba(37,99,235,0.25); }

        .nav-logout-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.45);
          padding: 0.4rem;
          border-radius: 8px;
          transition: color 0.15s, background 0.15s;
          display: flex;
          align-items: center;
        }
        .nav-logout-btn:hover {
          color: #f87171;
          background: rgba(248,113,113,0.1);
        }

        .nav-signin-link {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          transition: color 0.15s, background 0.15s;
        }
        .nav-signin-link:hover { color: #fff; background: rgba(255,255,255,0.07); }

        .nav-signup-link {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          padding: 0.4rem 0.9rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.05);
          transition: all 0.15s;
        }
        .nav-signup-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #2563eb;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.5rem 1.1rem;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37,99,235,0.4);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: #3b82f6;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.55);
        }
        .nav-cta:active { transform: translateY(0); }

        /* ── Hamburger ── */
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.75);
          padding: 0.4rem;
          border-radius: 8px;
          transition: color 0.15s, background 0.15s;
        }
        .nav-hamburger:hover { color: #fff; background: rgba(255,255,255,0.08); }

        /* ── Mobile Menu ── */
        .mobile-menu {
          background: rgba(10,22,40,0.98);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 1.25rem 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .mobile-link {
          display: block;
          padding: 0.75rem 0.75rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(37,99,235,0.12);
          color: #fff;
        }
        .mobile-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0.75rem 0;
        }
        .mobile-actions { display: flex; flex-direction: column; gap: 0.5rem; }
        .mobile-user-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.75rem;
          color: rgba(255,255,255,0.75);
          font-size: 0.88rem;
          font-weight: 600;
        }
        .mobile-cta {
          display: block;
          text-align: center;
          background: #2563eb;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.85rem 1rem;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(37,99,235,0.4);
          margin-top: 0.5rem;
          transition: background 0.15s;
        }
        .mobile-cta:hover { background: #3b82f6; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-actions { display: none; }
          .nav-hamburger { display: flex; }
          .nav-inner { padding: 0 1.25rem; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">SP</div>
            <div className="nav-logo-text">
              <span className="nav-logo-name">Swahilipot</span>
              <span className="nav-logo-sub">Space Booking</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="nav-actions">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/admin-panel" className="nav-admin-chip">
                    <Shield size={12} />
                    Admin
                  </Link>
                )}
                <Link to="/dashboard" className="nav-user-chip">
                  <UserIcon size={14} />
                  {user.name?.split(" ")[0] || "Account"}
                </Link>
                <button onClick={handleLogout} className="nav-logout-btn" title="Sign out">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login"  className="nav-signin-link">Sign In</Link>
                <Link to="/signup" className="nav-signup-link">Sign Up</Link>
              </>
            )}
            <Link to="/booking" className="nav-cta">
              <Calendar size={14} />
              Book a Space
            </Link>
          </div>

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`mobile-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mobile-divider" />

            <div className="mobile-actions">
              {user ? (
                <>
                  <div className="mobile-user-row">
                    <UserIcon size={16} style={{ color: "#3b82f6" }} />
                    {user.name}
                  </div>
                  {user.role === "admin" && (
                    <Link to="/admin-panel" onClick={() => setIsOpen(false)} className="mobile-link" style={{ color: "#93c5fd" }}>
                      <Shield size={14} style={{ display: "inline", marginRight: 6 }} />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="mobile-link"
                    style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "rgba(248,113,113,0.9)", width: "100%" }}
                  >
                    <LogOut size={14} style={{ display: "inline", marginRight: 6 }} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"  onClick={() => setIsOpen(false)} className="mobile-link">Sign In</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="mobile-link">Sign Up</Link>
                </>
              )}
              <Link to="/booking" onClick={() => setIsOpen(false)} className="mobile-cta">
                Book a Space
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

