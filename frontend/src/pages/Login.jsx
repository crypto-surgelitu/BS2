import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { login }    = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();

  const successMessage = location.state?.message || "";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // ✅ No setTimeout — call login() directly, then navigate
    const result = login(email.trim(), password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    // Navigate immediately — user state is already set synchronously
    if (result.role === "admin") {
      navigate("/admin-panel", { replace: true });
    } else {
      navigate("/booking", { replace: true });
    }
  };

  return (
    <div className="login-root">
      <div className="bg-layer">
        <div className="bg-grid" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <div className="login-wrapper">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 4C24 4 10 12 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 12 24 4 24 4Z" fill="currentColor" opacity="0.2"/>
              <path d="M24 10C24 10 14 17 14 26C14 31.523 18.477 36 24 36C29.523 36 34 31.523 34 26C34 17 24 10 24 10Z" fill="currentColor" opacity="0.4"/>
              <circle cx="24" cy="26" r="8" fill="currentColor"/>
              <path d="M20 26C20 23.791 21.791 22 24 22" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Swahilipot Hub</span>
            <span className="brand-sub">Booking System</span>
          </div>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="card-header">
            <h1>Welcome back</h1>
            <p>Sign in to book your space</p>
          </div>

          {successMessage && (
            <div className="success-msg">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6.5 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 6.5L10 11L17.5 6.5M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  id="email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" required autoComplete="email"
                />
              </div>
            </div>

            <div className="field">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <span className="forgot-link">Forgot password?</span>
              </div>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="9" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  id="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" required autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="error-msg" role="alert">
                <svg viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className={`login-btn ${loading ? "loading" : ""}`} disabled={loading}>
              {loading
                ? <span className="spinner" />
                : (<>Sign In <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>)
              }
            </button>
          </form>

          <div className="divider"><span>Don't have an account?</span></div>
          <button className="signup-btn" onClick={() => navigate("/signup")}>Create a free account →</button>
          <p className="card-footer">Swahilipot Hub &mdash; Mombasa, Kenya</p>
        </div>

        {/* Admin hint */}
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem", marginTop: "-0.5rem" }}>
          Admin? Use <span style={{ color: "rgba(147,197,253,0.5)" }}>admin@email.com / 1234</span>
        </p>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .login-root {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: #0a1628; font-family: 'Plus Jakarta Sans','DM Sans',sans-serif;
          position: relative; overflow: hidden; padding: 2rem;
        }
        .bg-layer { position: absolute; inset: 0; pointer-events: none; }
        .bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35; }
        .blob-1 { width: 480px; height: 480px; background: radial-gradient(circle, #2563eb 0%, transparent 70%); top: -120px; right: -80px; }
        .blob-2 { width: 360px; height: 360px; background: radial-gradient(circle, #1e4d9b 0%, transparent 70%); bottom: -80px; left: -60px; }
        .login-wrapper {
          position: relative; z-index: 10; width: 100%; max-width: 420px;
          display: flex; flex-direction: column; align-items: center; gap: 2rem;
          animation: fadeUp 0.8s ease both;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .brand { display: flex; align-items: center; gap: 0.875rem; }
        .brand-icon { width: 48px; height: 48px; color: #93c5fd; flex-shrink: 0; }
        .brand-icon svg { width: 100%; height: 100%; }
        .brand-text { display: flex; flex-direction: column; }
        .brand-name { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #fff; line-height: 1.1; }
        .brand-sub { font-size: 0.72rem; font-weight: 500; color: rgba(255,255,255,0.4); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }
        .login-card {
          width: 100%;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px; padding: 2.5rem; backdrop-filter: blur(16px);
          box-shadow: 0 0 0 1px rgba(59,130,246,0.08) inset, 0 32px 64px rgba(0,0,0,0.4);
        }
        .card-header { margin-bottom: 2rem; text-align: center; }
        .card-header h1 { font-family: 'Playfair Display', serif; font-size: 1.875rem; font-weight: 700; color: #fff; margin: 0 0 0.375rem; }
        .card-header p { font-size: 0.9rem; color: rgba(255,255,255,0.4); margin: 0; }
        .login-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .field { display: flex; flex-direction: column; gap: 0.5rem; }
        .label-row { display: flex; align-items: center; justify-content: space-between; }
        label { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; text-transform: uppercase; }
        .forgot-link { font-size: 0.78rem; color: #93c5fd; cursor: pointer; transition: color 0.15s; }
        .forgot-link:hover { color: #bfdbfe; }
        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 0.875rem; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: rgba(255,255,255,0.25); pointer-events: none; }
        input {
          width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 0.75rem 0.875rem 0.75rem 2.75rem;
          font-family: 'Plus Jakarta Sans','DM Sans',sans-serif; font-size: 0.95rem; color: #fff;
          outline: none; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { border-color: rgba(59,130,246,0.6); background: rgba(255,255,255,0.1); box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
        .error-msg { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: rgba(220,60,60,0.12); border: 1px solid rgba(220,60,60,0.3); border-radius: 8px; color: #fca5a5; font-size: 0.85rem; }
        .error-msg svg { width: 16px; height: 16px; flex-shrink: 0; }
        .success-msg { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: rgba(22,163,74,0.12); border: 1px solid rgba(22,163,74,0.3); border-radius: 8px; color: #86efac; font-size: 0.85rem; margin-bottom: 1rem; }
        .success-msg svg { width: 16px; height: 16px; flex-shrink: 0; }
        .login-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          width: 100%; padding: 0.875rem 1.5rem; background: #2563eb; border: none;
          border-radius: 10px; font-family: inherit; font-size: 1rem; font-weight: 600;
          color: #fff; cursor: pointer; margin-top: 0.5rem;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(37,99,235,0.45);
        }
        .login-btn svg { width: 18px; height: 18px; transition: transform 0.2s; }
        .login-btn:hover:not(:disabled) { background: #3b82f6; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(37,99,235,0.55); }
        .login-btn:hover:not(:disabled) svg { transform: translateX(3px); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .spinner { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.25); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .divider { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0 0; color: rgba(255,255,255,0.2); font-size: 0.8rem; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
        .signup-btn { width: 100%; margin-top: 0.75rem; padding: 0.8rem; background: transparent; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; font-family: inherit; font-size: 0.9rem; font-weight: 500; color: rgba(255,255,255,0.65); cursor: pointer; transition: all 0.2s; }
        .signup-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.25); color: #fff; }
        .card-footer { margin: 1.5rem 0 0; text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.18); }
      `}</style>
    </div>
  );
};

export default Login;

