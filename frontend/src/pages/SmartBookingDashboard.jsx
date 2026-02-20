import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ── Space definitions ──────────────────────────────────────
const SPACES = [
  {
    id: "conference-a",
    name: "Conference Room A",
    capacity: 12,
    price: 500,
    icon: "🪑",
    desc: "Ideal for meetings & workshops",
  },
  {
    id: "tech-lab",
    name: "Tech Lab",
    capacity: 20,
    price: 750,
    icon: "💻",
    desc: "Equipped workstations & high-speed internet",
  },
  {
    id: "event-hall",
    name: "Event Hall",
    capacity: 80,
    price: 2000,
    icon: "🎪",
    desc: "Large venue for events & exhibitions",
  },
];

// ── Time slots ─────────────────────────────────────────────
const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00",
];

// ── Status config ──────────────────────────────────────────
const STATUS_CFG = {
  confirmed: { label: "Confirmed", color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)" },
  pending:   { label: "Pending",   color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)" },
  cancelled: { label: "Cancelled", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
};

// ── Payment Modal ──────────────────────────────────────────
const PaymentModal = ({ space, onConfirm, onCancel, loading }) => (
  <div className="pay-overlay">
    <div className="pay-card">
      <div className="pay-header">
        <div className="pay-logo">
          <svg viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="rgba(37,99,235,0.12)"/>
            <path d="M8 16c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" stroke="#2563eb" strokeWidth="1.5"/>
            <path d="M13 16c0-1.657 1.343-3 3-3" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="16" cy="16" r="2" fill="#2563eb"/>
          </svg>
        </div>
        <div>
          <p className="pay-method">M-Pesa Payment</p>
          <p className="pay-sub">Lipa Na M-Pesa</p>
        </div>
      </div>

      <div className="pay-amount">
        <span className="pay-currency">KES</span>
        <span className="pay-value">{space?.price?.toLocaleString()}</span>
      </div>

      <div className="pay-detail">
        <span className="pay-detail-label">Space</span>
        <span className="pay-detail-val">{space?.name}</span>
      </div>
      <div className="pay-detail">
        <span className="pay-detail-label">Paybill</span>
        <span className="pay-detail-val">247247</span>
      </div>
      <div className="pay-detail">
        <span className="pay-detail-label">Account No.</span>
        <span className="pay-detail-val">SwahiliPot</span>
      </div>

      <p className="pay-note">
        A push notification will be sent to your phone. Enter your M-Pesa PIN to complete.
      </p>

      <div className="pay-actions">
        <button className="pay-cancel-btn" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button className="pay-confirm-btn" onClick={onConfirm} disabled={loading}>
          {loading ? <span className="spinner" /> : "Confirm Payment"}
        </button>
      </div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────
const SmartBookingDashboard = () => {
  const { bookings, addBooking } = useBooking();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=details, 2=review
  const [formData, setFormData] = useState({
    name: user?.name !== "Admin" ? (user?.name || "") : "",
    email: user?.email || "",
    phone: "",
    space: "",
    date: "",
    time: "",
    occasion: "",
    guests: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("book"); // "book" | "mybookings"

  const selectedSpace = SPACES.find((s) => s.id === formData.space);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.space || !formData.date || !formData.time) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handlePay = () => setShowPayment(true);

  const handlePayConfirm = () => {
    setPayLoading(true);
    // Simulate M-Pesa processing delay
    setTimeout(() => {
      const result = addBooking({
        ...formData,
        spaceName: selectedSpace?.name,
        price: selectedSpace?.price,
        userId: user?.email || "guest",
      });

      setPayLoading(false);
      setShowPayment(false);

      if (!result.success) {
        showToast(result.message || "Booking failed. Slot may be taken.", "error");
        return;
      }

      showToast("Payment successful! Your booking is confirmed. 🎉", "success");
      setFormData({ name: "", email: "", phone: "", space: "", date: "", time: "", occasion: "", guests: "" });
      setStep(1);
      setActiveTab("mybookings");
    }, 1800);
  };

  // Filter bookings to current user (skip for admin who sees all)
  const myBookings = user?.role === "admin"
    ? bookings
    : bookings.filter((b) => b.userId === (user?.email || "guest"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sbd-root">
      <style>{`

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── CSS Variables ── */
        :root {
          --b900: #0a1628; --b800: #0d2044; --b700: #1a3a6b;
          --b600: #1e4d9b; --b500: #2563eb; --b400: #3b82f6;
          --b300: #93c5fd; --b100: #dbeafe; --b50: #eff6ff;
          --g50: #f8fafc; --g100: #f1f5f9; --g200: #e2e8f0;
          --g400: #94a3b8; --g600: #475569; --g800: #1e293b;
        }

        /* ── Root ── */
        .sbd-root {
          min-height: 100vh;
          background: var(--g100);
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: var(--g800);
          position: relative;
          overflow-x: hidden;
        }
        .sbd-root::before { display: none; }
        .sbd-root::after  { display: none; }

        /* ── Topbar: deep navy ── */
        .topbar {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2rem;
          background: var(--b900);
          box-shadow: 0 2px 16px rgba(10,22,40,0.45);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .topbar-brand { display: flex; align-items: center; gap: 0.75rem; }
        .topbar-logo { width: 36px; height: 36px; color: var(--b300); }
        .topbar-logo svg { width: 100%; height: 100%; }
        .topbar-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #ffffff; }
        .topbar-right { display: flex; align-items: center; gap: 0.75rem; }
        .topbar-greeting { font-size: 0.83rem; color: rgba(255,255,255,0.45); }
        .topbar-btn {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.875rem;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem; color: rgba(255,255,255,0.7);
          cursor: pointer; transition: all 0.15s;
        }
        .topbar-btn:hover { background: rgba(255,255,255,0.15); color: #ffffff; }
        .topbar-btn.admin { background: rgba(74,222,128,0.12); border-color: rgba(74,222,128,0.3); color: #4ade80; }
        .topbar-btn.admin:hover { background: rgba(74,222,128,0.2); }

        /* ── Page ── */
        .sbd-page { position: relative; z-index: 5; max-width: 1100px; margin: 0 auto; padding: 2.5rem 2rem; }

        /* ── Page header ── */
        .page-header { margin-bottom: 2.5rem; }
        .page-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--b500); margin-bottom: 0.5rem;
        }
        .page-eyebrow::before { content: ''; width: 18px; height: 2px; background: var(--b500); border-radius: 1px; display: inline-block; }
        .page-title { font-family: 'Playfair Display', serif; font-size: 2.25rem; font-weight: 700; color: var(--g800); line-height: 1.15; }
        .page-sub { margin-top: 0.5rem; font-size: 0.9rem; color: var(--g400); }

        /* ── Tabs ── */
        .tabs {
          display: flex; gap: 0.25rem; padding: 0.25rem;
          background: #ffffff; border: 1px solid var(--g200);
          border-radius: 12px; margin-bottom: 2rem; width: fit-content;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .tab {
          padding: 0.5rem 1.25rem; border-radius: 9px;
          font-size: 0.875rem; font-weight: 600; color: var(--g400);
          cursor: pointer; border: none; background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.15s;
        }
        .tab.active { background: var(--b500); color: #ffffff; box-shadow: 0 2px 10px rgba(37,99,235,0.35); }
        .tab:hover:not(.active) { color: var(--b500); background: var(--b50); }

        /* ── Layout ── */
        .sbd-layout { display: grid; grid-template-columns: 1fr 340px; gap: 1.75rem; align-items: start; }
        @media (max-width: 860px) { .sbd-layout { grid-template-columns: 1fr; } }

        /* ── Form card ── */
        .form-card {
          background: #ffffff; border: 1px solid var(--g200);
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(37,99,235,0.08);
        }
        .form-card-header {
          padding: 1.5rem 2rem; border-bottom: 1px solid var(--b100);
          display: flex; align-items: center; justify-content: space-between;
          background: var(--b50);
          border-top: 3px solid var(--b500);
        }
        .form-step-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--b500); font-weight: 700; }
        .form-step-title { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: var(--g800); margin-top: 2px; }
        .step-dots { display: flex; gap: 6px; align-items: center; }
        .step-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--b100); transition: all 0.2s; }
        .step-dot.active { background: var(--b500); box-shadow: 0 0 8px rgba(37,99,235,0.4); }

        .form-body { padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; background: #ffffff; }

        /* Space selector */
        .spaces-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .space-option {
          padding: 1rem; border: 1.5px solid var(--g200); border-radius: 12px;
          cursor: pointer; background: #ffffff; transition: all 0.15s; text-align: center;
        }
        .space-option:hover { border-color: var(--b400); background: var(--b50); }
        .space-option.selected { border-color: var(--b500) !important; background: var(--b50) !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .space-emoji { font-size: 1.5rem; margin-bottom: 0.35rem; }
        .space-name { font-size: 0.78rem; font-weight: 600; color: var(--g800); line-height: 1.3; }
        .space-price { font-size: 0.72rem; color: var(--b500); margin-top: 3px; font-weight: 600; }

        /* Fields */
        .field { display: flex; flex-direction: column; gap: 0.4rem; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .field label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--g600); font-weight: 700; }
        .field input, .field select, .field textarea {
          background: #ffffff; border: 1.5px solid var(--g200); border-radius: 10px;
          padding: 0.7rem 1rem; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; color: var(--g800); outline: none;
          transition: border-color 0.15s, box-shadow 0.15s; width: 100%; -webkit-appearance: none;
        }
        .field input::placeholder { color: var(--g400); }
        .field input:focus, .field select:focus { border-color: var(--b500); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
        .field select option { background: #ffffff; color: var(--g800); }

        /* Time slots */
        .time-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .time-slot {
          padding: 0.4rem 0.875rem; border: 1.5px solid var(--g200); border-radius: 8px;
          font-size: 0.83rem; color: var(--g600); cursor: pointer;
          background: #ffffff; transition: all 0.15s; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500;
        }
        .time-slot:hover { border-color: var(--b400); color: var(--b500); background: var(--b50); }
        .time-slot.selected { border-color: var(--b500); background: var(--b500); color: #ffffff; box-shadow: 0 2px 8px rgba(37,99,235,0.3); }

        /* Form footer */
        .form-footer {
          padding: 1.5rem 2rem; border-top: 1px solid var(--b100); background: var(--b50);
          display: flex; justify-content: space-between; align-items: center; gap: 1rem;
        }
        .btn-back {
          padding: 0.7rem 1.5rem; background: #ffffff;
          border: 1.5px solid var(--g200); border-radius: 10px;
          color: var(--g600); font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.15s;
        }
        .btn-back:hover { border-color: var(--b400); color: var(--b500); }
        .btn-next {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.75rem 1.5rem; background: var(--b500); border: none; border-radius: 10px;
          color: #ffffff; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 16px rgba(37,99,235,0.35); transition: all 0.15s;
        }
        .btn-next:hover { background: var(--b400); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.45); }
        .btn-next svg { width: 16px; height: 16px; transition: transform 0.15s; }
        .btn-next:hover svg { transform: translateX(3px); }

        /* Review */
        .review-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .review-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.75rem 1rem; background: var(--b50);
          border: 1px solid var(--b100); border-radius: 8px;
        }
        .review-key { font-size: 0.8rem; color: var(--g400); }
        .review-val { font-size: 0.88rem; color: var(--g800); font-weight: 600; }
        .review-total {
          padding: 1rem; background: var(--b600); border: 1px solid var(--b700);
          border-radius: 10px; display: flex; justify-content: space-between;
          align-items: center; margin-top: 0.25rem;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }
        .review-total-label { font-size: 0.85rem; color: rgba(255,255,255,0.6); }
        .review-total-amount { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #ffffff; }

        /* ── Sidebar cards ── */
        .sidebar-stack { display: flex; flex-direction: column; gap: 1.25rem; }
        .info-card {
          background: #ffffff; border: 1px solid var(--g200);
          border-radius: 16px; padding: 1.5rem;
          box-shadow: 0 2px 12px rgba(37,99,235,0.06);
        }
        .info-card-title {
          font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--g800);
          margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--b100);
        }
        .space-detail { display: flex; flex-direction: column; gap: 0.6rem; }
        .space-detail-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.83rem; }
        .sd-key { color: var(--g400); }
        .sd-val { color: var(--g800); font-weight: 600; }

        .hours-grid { display: flex; flex-direction: column; gap: 0.4rem; }
        .hours-row { display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--g400); padding: 0.35rem 0; border-bottom: 1px solid var(--g100); }
        .hours-row:last-child { border-bottom: none; }
        .hours-open { color: #16a34a; font-weight: 600; }

        /* ── My Bookings ── */
        .bookings-list { display: flex; flex-direction: column; gap: 1rem; }
        .booking-item {
          background: #ffffff; border: 1px solid var(--g200); border-left: 3px solid var(--b500);
          border-radius: 14px; padding: 1.25rem 1.5rem;
          display: grid; grid-template-columns: 1fr auto; gap: 0.75rem; align-items: center;
          transition: all 0.15s; animation: fadeIn 0.3s ease both;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .booking-item:hover { border-color: var(--b400); box-shadow: 0 4px 16px rgba(37,99,235,0.1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .bi-name { font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--g800); margin-bottom: 4px; }
        .bi-meta { font-size: 0.8rem; color: var(--g400); display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 4px; }
        .bi-meta span { display: flex; align-items: center; gap: 4px; }
        .status-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.625rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; border: 1px solid; }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

        .empty-state {
          padding: 3rem; text-align: center; color: var(--g400); font-size: 0.9rem;
          border: 1.5px dashed var(--b100); border-radius: 16px; background: var(--b50);
        }
        .empty-emoji { font-size: 2.5rem; margin-bottom: 0.75rem; }

        /* ── Payment modal ── */
        .pay-overlay {
          position: fixed; inset: 0; background: rgba(10,22,40,0.75);
          backdrop-filter: blur(6px); display: flex; align-items: center;
          justify-content: center; z-index: 100; padding: 1rem;
        }
        .pay-card {
          background: #ffffff; border: 1px solid var(--g200); border-radius: 20px;
          padding: 2rem; width: 100%; max-width: 380px;
          display: flex; flex-direction: column; gap: 1.25rem;
          box-shadow: 0 24px 64px rgba(10,22,40,0.25); animation: fadeIn 0.25s ease both;
          border-top: 4px solid var(--b500);
        }
        .pay-header { display: flex; align-items: center; gap: 0.875rem; }
        .pay-logo { width: 44px; height: 44px; flex-shrink: 0; }
        .pay-logo svg { width: 100%; height: 100%; }
        .pay-method { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--g800); }
        .pay-sub { font-size: 0.78rem; color: var(--g400); margin-top: 2px; }

        .pay-amount {
          display: flex; align-items: baseline; gap: 0.375rem;
          padding: 1.25rem; background: var(--b50);
          border: 1.5px solid var(--b100); border-radius: 12px; justify-content: center;
        }
        .pay-currency { font-size: 0.9rem; color: var(--b400); font-weight: 600; }
        .pay-value { font-family: 'Playfair Display', serif; font-size: 2.25rem; font-weight: 700; color: var(--b600); }

        .pay-detail { display: flex; justify-content: space-between; align-items: center; font-size: 0.83rem; padding: 0.4rem 0; border-bottom: 1px solid var(--g100); }
        .pay-detail:last-of-type { border-bottom: none; }
        .pay-detail-label { color: var(--g400); }
        .pay-detail-val { color: var(--g800); font-weight: 600; }

        .pay-note { font-size: 0.8rem; color: var(--g400); line-height: 1.5; padding: 0.75rem 1rem; background: var(--b50); border-radius: 8px; border: 1px solid var(--b100); }

        .pay-actions { display: flex; gap: 0.75rem; }
        .pay-cancel-btn {
          flex: 1; padding: 0.75rem; background: #ffffff;
          border: 1.5px solid var(--g200); border-radius: 10px;
          color: var(--g600); font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.15s;
        }
        .pay-cancel-btn:hover:not(:disabled) { border-color: #ef4444; color: #ef4444; }
        .pay-confirm-btn {
          flex: 2; display: flex; align-items: center; justify-content: center;
          padding: 0.75rem; background: var(--b500); border: none; border-radius: 10px;
          color: #ffffff; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 16px rgba(37,99,235,0.35); transition: all 0.15s;
        }
        .pay-confirm-btn:hover:not(:disabled) { background: var(--b400); }
        .pay-confirm-btn:disabled, .pay-cancel-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Toast ── */
        .toast {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 200;
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.875rem 1.25rem; border-radius: 12px;
          font-size: 0.875rem; font-weight: 500; max-width: 360px;
          animation: slideUp 0.3s ease both; box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }
        .toast.success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; }
        .toast.error   { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        /* ── Spinner ── */
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.35); border-top-color: #ffffff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Topbar */}
      <header className="topbar">
        <div className="topbar-brand">
          <div className="topbar-logo">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 4C24 4 10 12 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 12 24 4 24 4Z" fill="currentColor" opacity="0.15"/>
              <path d="M24 10C24 10 14 17 14 26C14 31.523 18.477 36 24 36C29.523 36 34 31.523 34 26C34 17 24 10 24 10Z" fill="currentColor" opacity="0.3"/>
              <circle cx="24" cy="26" r="8" fill="currentColor"/>
              <path d="M20 26C20 23.791 21.791 22 24 22" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="topbar-name">Swahili Pot</span>
        </div>
        <div className="topbar-right">
          {user?.name && (
            <span className="topbar-greeting">
              Hey, {user.name} 👋
            </span>
          )}
          {user?.role === "admin" && (
            <button className="topbar-btn admin" onClick={() => navigate("/admin-panel")}>
              ⚙ Admin Panel
            </button>
          )}
          <button className="topbar-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Page */}
      <div className="sbd-page">
        <div className="page-header">
          <p className="page-eyebrow">Hub Spaces · Mombasa, Kenya</p>
          <h1 className="page-title">Reserve Your Space</h1>
          <p className="page-sub">Book a space at Swahili Pot and pay securely via M-Pesa.</p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className={`tab ${activeTab === "book" ? "active" : ""}`} onClick={() => setActiveTab("book")}>
            Make a Booking
          </button>
          <button className={`tab ${activeTab === "mybookings" ? "active" : ""}`} onClick={() => setActiveTab("mybookings")}>
            {user?.role === "admin" ? "All Bookings" : "My Bookings"}
            {myBookings.length > 0 && (
              <span style={{ marginLeft: "6px", background: "rgba(37,99,235,0.15)", color: "#2563eb", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px" }}>
                {myBookings.length}
              </span>
            )}
          </button>
        </div>

        {/* ── BOOK TAB ── */}
        {activeTab === "book" && (
          <div className="sbd-layout">
            {/* Form */}
            <div className="form-card">
              <div className="form-card-header">
                <div>
                  <div className="form-step-label">
                    Step {step} of 2 — {step === 1 ? "Details" : "Review & Pay"}
                  </div>
                  <div className="form-step-title">
                    {step === 1 ? "Fill in your booking details" : "Confirm your reservation"}
                  </div>
                </div>
                <div className="step-dots">
                  <div className={`step-dot ${step >= 1 ? "active" : ""}`} />
                  <div className={`step-dot ${step >= 2 ? "active" : ""}`} />
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={handleNext}>
                  <div className="form-body">
                    {/* Space selector */}
                    <div className="field">
                      <label>Select Space *</label>
                      <div className="spaces-grid">
                        {SPACES.map((s) => (
                          <div
                            key={s.id}
                            className={`space-option ${formData.space === s.id ? "selected" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, space: s.id }))}
                          >
                            <div className="space-emoji">{s.icon}</div>
                            <div className="space-name">{s.name}</div>
                            <div className="space-price">KES {s.price.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="field-row">
                      <div className="field">
                        <label>Full Name *</label>
                        <input name="name" type="text" placeholder="e.g. Amara Osei" value={formData.name} onChange={handleChange} />
                      </div>
                      <div className="field">
                        <label>Phone</label>
                        <input name="phone" type="tel" placeholder="+254 7XX XXX XXX" value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="field">
                      <label>Email</label>
                      <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="field">
                      <label>Date *</label>
                      <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="field">
                      <label>Select Time *</label>
                      <div className="time-grid">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`time-slot ${formData.time === t ? "selected" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, time: t }))}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="field">
                      <label>Occasion (optional)</label>
                      <input name="occasion" type="text" placeholder="e.g. Workshop, Meeting, Event…" value={formData.occasion} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-footer">
                    <button type="submit" className="btn-next">
                      Review Booking
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div>
                  <div className="form-body">
                    <div className="review-grid">
                      <div className="review-row">
                        <span className="review-key">Name</span>
                        <span className="review-val">{formData.name}</span>
                      </div>
                      {formData.email && (
                        <div className="review-row">
                          <span className="review-key">Email</span>
                          <span className="review-val">{formData.email}</span>
                        </div>
                      )}
                      <div className="review-row">
                        <span className="review-key">Space</span>
                        <span className="review-val">{selectedSpace?.icon} {selectedSpace?.name}</span>
                      </div>
                      <div className="review-row">
                        <span className="review-key">Date</span>
                        <span className="review-val">
                          {new Date(formData.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                      <div className="review-row">
                        <span className="review-key">Time</span>
                        <span className="review-val">{formData.time}</span>
                      </div>
                      {formData.occasion && (
                        <div className="review-row">
                          <span className="review-key">Occasion</span>
                          <span className="review-val">{formData.occasion}</span>
                        </div>
                      )}
                      <div className="review-total">
                        <span className="review-total-label">Total (M-Pesa)</span>
                        <span className="review-total-amount">KES {selectedSpace?.price?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-footer">
                    <button className="btn-back" onClick={handleBack}>← Back</button>
                    <button className="btn-next" onClick={handlePay}>
                      Pay via M-Pesa
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="sidebar-stack">
              {selectedSpace ? (
                <div className="info-card">
                  <p className="info-card-title">{selectedSpace.icon} {selectedSpace.name}</p>
                  <div className="space-detail">
                    <div className="space-detail-row">
                      <span className="sd-key">Capacity</span>
                      <span className="sd-val">Up to {selectedSpace.capacity} people</span>
                    </div>
                    <div className="space-detail-row">
                      <span className="sd-key">Rate</span>
                      <span className="sd-val">KES {selectedSpace.price.toLocaleString()} / session</span>
                    </div>
                    <div className="space-detail-row">
                      <span className="sd-key">Description</span>
                      <span className="sd-val">{selectedSpace.desc}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="info-card" style={{ color: "var(--g400)", textAlign: "center", fontSize: "0.85rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🏛️</div>
                  Select a space to see details
                </div>
              )}

              <div className="info-card">
                <p className="info-card-title">Opening Hours</p>
                <div className="hours-grid">
                  {[
                    ["Monday – Friday", "08:00 – 18:00", true],
                    ["Saturday",        "09:00 – 16:00", true],
                    ["Sunday",          "Closed",        false],
                  ].map(([day, hrs, open]) => (
                    <div key={day} className="hours-row">
                      <span>{day}</span>
                      <span className={open ? "hours-open" : ""}>{hrs}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-card" style={{ fontSize: "0.82rem", color: "var(--g600)", lineHeight: "1.6" }}>
                <p className="info-card-title">Payment Info</p>
                Payment is processed securely via M-Pesa.<br />
                You'll receive a push notification to your phone.<br /><br />
                <strong style={{ color: "var(--b500)" }}>Paybill:</strong> 247247<br />
                <strong style={{ color: "var(--b500)" }}>Account:</strong> SwahiliPot
              </div>
            </div>
          </div>
        )}

        {/* ── MY BOOKINGS TAB ── */}
        {activeTab === "mybookings" && (
          <div>
            {myBookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-emoji">📅</div>
                <p>No bookings yet.</p>
                <p style={{ marginTop: "4px", fontSize: "0.8rem" }}>Switch to the booking tab to reserve a space.</p>
              </div>
            ) : (
              <div className="bookings-list">
                {myBookings.map((b, i) => {
                  const st = STATUS_CFG[b.status] || STATUS_CFG.pending;
                  return (
                    <div key={i} className="booking-item" style={{ animationDelay: `${i * 60}ms` }}>
                      <div>
                        <div className="bi-name">{b.spaceName || b.space}</div>
                        <div className="bi-meta">
                          <span>👤 {b.name}</span>
                          <span>📅 {new Date(b.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                          <span>🕐 {b.time}</span>
                          {b.occasion && <span>🎯 {b.occasion}</span>}
                          {b.price && <span style={{ color: "var(--b500)", fontWeight: 600 }}>KES {Number(b.price).toLocaleString()}</span>}
                        </div>
                      </div>
                      <span
                        className="status-pill"
                        style={{ color: st.color, background: st.bg, borderColor: st.border }}
                      >
                        <span className="status-dot" />
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* M-Pesa Payment Modal */}
      {showPayment && (
        <PaymentModal
          space={selectedSpace}
          onConfirm={handlePayConfirm}
          onCancel={() => setShowPayment(false)}
          loading={payLoading}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}
    </div>
  );
};

export default SmartBookingDashboard;
