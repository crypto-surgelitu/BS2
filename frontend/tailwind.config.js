/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: "#2563eb",   // core blue
          light:   "#3b82f6",
          dark:    "#1e4d9b",
          muted:   "#1a3a6b",
          50:      "#eff6ff",
          100:     "#dbeafe",
          200:     "#bfdbfe",
          300:     "#93c5fd",
          400:     "#3b82f6",
          500:     "#2563eb",
          600:     "#1e4d9b",
          700:     "#1a3a6b",
          800:     "#0d2044",
          900:     "#0a1628",
        },
        secondary: {
          DEFAULT: "#0a1628",   // deep navy
          soft:    "#0d2044",
          card:    "#1a3a6b",
          raised:  "#1e4d9b",
        },
        surface: {
          DEFAULT: "rgba(255,255,255,0.06)",
          hover:   "rgba(255,255,255,0.1)",
          border:  "rgba(59,130,246,0.15)",
          glow:    "rgba(37,99,235,0.1)",
        },
        ink: {
          DEFAULT: "#1e293b",
          soft:    "#334155",
          muted:   "#475569",
          faint:   "#64748b",
          ghost:   "#94a3b8",
          light:   "#cbd5e1",
          pale:    "#e2e8f0",
          white:   "#f8fafc",
        },
        status: {
          confirmed: "#4ade80",
          pending:   "#fbbf24",
          cancelled: "#f87171",
        },
        gray: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },

      // ── Typography ───────────────────────────────────────
      fontFamily: {
        heading: ["'Playfair Display'", "Georgia", "serif"],
        body:    ["'Plus Jakarta Sans'", "'DM Sans'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },

      // ── Font Sizes ───────────────────────────────────────
      fontSize: {
        "2xs": ["0.68rem",  { lineHeight: "1rem" }],
        "xs":  ["0.75rem",  { lineHeight: "1.1rem" }],
        "sm":  ["0.875rem", { lineHeight: "1.4rem" }],
        "base":["0.95rem",  { lineHeight: "1.6rem" }],
        "lg":  ["1.1rem",   { lineHeight: "1.6rem" }],
        "xl":  ["1.25rem",  { lineHeight: "1.5rem" }],
        "2xl": ["1.5rem",   { lineHeight: "1.35rem" }],
        "3xl": ["1.875rem", { lineHeight: "1.2rem" }],
        "4xl": ["2.25rem",  { lineHeight: "1.1rem" }],
        "5xl": ["3rem",     { lineHeight: "1.05rem" }],
      },

      // ── Border Radius ────────────────────────────────────
      borderRadius: {
        "sm":   "6px",
        "md":   "10px",
        "lg":   "14px",
        "xl":   "20px",
        "2xl":  "24px",
        "pill": "9999px",
      },

      // ── Box Shadows ──────────────────────────────────────
      boxShadow: {
        "glow-sm":   "0 0 12px rgba(37,99,235,0.2)",
        "glow":      "0 0 24px rgba(37,99,235,0.25)",
        "glow-lg":   "0 0 48px rgba(37,99,235,0.35)",
        "card":      "0 4px 24px rgba(37,99,235,0.08)",
        "card-md":   "0 8px 32px rgba(37,99,235,0.12)",
        "card-lg":   "0 20px 60px rgba(10,22,40,0.15)",
        "modal":     "0 24px 80px rgba(10,22,40,0.25)",
        "btn":       "0 4px 16px rgba(37,99,235,0.35)",
        "btn-hover": "0 8px 28px rgba(37,99,235,0.5)",
        "nav":       "0 2px 16px rgba(10,22,40,0.45)",
        "white":     "0 1px 4px rgba(0,0,0,0.04)",
        "white-md":  "0 2px 12px rgba(37,99,235,0.06)",
      },

      // ── Background Images ─────────────────────────────────
      backgroundImage: {
        "blue-gradient":  "linear-gradient(135deg, #1e4d9b 0%, #2563eb 60%, #3b82f6 100%)",
        "blue-shimmer":   "linear-gradient(90deg, #1e4d9b, #3b82f6, #1e4d9b)",
        "navy-gradient":  "linear-gradient(135deg, #0a1628 0%, #0d2044 100%)",
        "grid-pattern":   "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)",
        "blob-blue":      "radial-gradient(circle, #2563eb 0%, transparent 70%)",
        "blob-navy":      "radial-gradient(circle, #1a3a6b 0%, transparent 70%)",
        "top-line":       "linear-gradient(90deg, #1e4d9b, #3b82f6, transparent)",
        "hero-overlay":   "linear-gradient(105deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 45%, rgba(10,22,40,0.3) 100%)",
        "light-gradient": "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
      },

      // ── Background Size ──────────────────────────────────
      backgroundSize: {
        "grid": "48px 48px",
      },

      // ── Spacing extras ───────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "88": "22rem",
        "96": "24rem",
      },

      // ── Transitions ──────────────────────────────────────
      transitionDuration: {
        "150": "150ms",
        "250": "250ms",
        "350": "350ms",
      },

      // ── Animations ───────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%":   { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 6px rgba(74,222,128,0.4)" },
          "50%":       { boxShadow: "0 0 12px rgba(74,222,128,0.8)" },
        },
        "pulse-blue": {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "1" },
        },
        "spin": {
          "to": { transform: "rotate(360deg)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        "zoom-out": {
          "0%":   { transform: "scale(1.08)" },
          "100%": { transform: "scale(1.0)" },
        },
        "hero-slide": {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in":   "fade-in 0.35s ease both",
        "fade-up":   "fade-up 0.8s ease both",
        "slide-in":  "slide-in 0.3s ease both",
        "slide-up":  "slide-up 0.3s ease both",
        "pulse-glow":"pulse-glow 2s ease-in-out infinite",
        "pulse-blue":"pulse-blue 2s ease-in-out infinite",
        "spin":      "spin 0.7s linear infinite",
        "shimmer":   "shimmer 2s linear infinite",
        "zoom-out":  "zoom-out 10s ease forwards",
        "hero-slide":"hero-slide 1s ease both",
      },

      // ── Backdrop Blur ────────────────────────────────────
      backdropBlur: {
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "24px",
      },
    },
  },
  plugins: [],
};

