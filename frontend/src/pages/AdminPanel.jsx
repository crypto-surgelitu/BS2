import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

const STATUS_CONFIG = {
  confirmed: { label: "Confirmed", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.25)" },
  pending:   { label: "Pending",   color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)" },
  cancelled: { label: "Cancelled", color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
};

// ── Icons ──────────────────────────────────────────────────
const Icon = ({ name, size = 18 }) => {
  const icons = {
    calendar: <path d="M6 2v2M14 2v2M3 8h14M5 4h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    trend: <><path d="M3 14l4-5 4 3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 6h2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    check: <><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    users: <><path d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM3 17v-1a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 11a3 3 0 010 6M19 17v-1a3 3 0 00-2-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
    logout: <path d="M14 8l4 4m0 0l-4 4m4-4H7M10 4H5a1 1 0 00-1 1v10a1 1 0 001 1h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
    search: <><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M15 15l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
    eye: <><path d="M1.5 9S4.5 3 9 3s7.5 6 7.5 6-3 6-7.5 6S1.5 9 1.5 9z" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></>,
    trash: <><path d="M4 6h12M7 6V4h6v2M8 10v5M12 10v5M5 6l1 11h8l1-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    close: <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>,
    menu: <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>,
    money: <><rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      {icons[name]}
    </svg>
  );
};

// ── Booking Detail Modal ───────────────────────────────────
const BookingModal = ({ booking, onClose, onStatusChange }) => {
  if (!booking) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-id">{booking.id || "—"}</span>
            <h2 className="modal-name">{booking.name}</h2>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="close" /></button>
        </div>

        <div className="modal-grid">
          <div className="modal-field">
            <span className="mf-label">Email</span>
            <span className="mf-value">{booking.email || "—"}</span>
          </div>
          <div className="modal-field">
            <span className="mf-label">Phone</span>
            <span className="mf-value">{booking.phone || "—"}</span>
          </div>
          <div className="modal-field">
            <span className="mf-label">Space</span>
            <span className="mf-value">{booking.spaceName || booking.space || "—"}</span>
          </div>
          <div className="modal-field">
            <span className="mf-label">Date</span>
            <span className="mf-value">
              {booking.date ? new Date(booking.date).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "—"}
            </span>
          </div>
          <div className="modal-field">
            <span className="mf-label">Time</span>
            <span className="mf-value">{booking.time || "—"}</span>
          </div>
          <div className="modal-field">
            <span className="mf-label">Occasion</span>
            <span className="mf-value">{booking.occasion || "—"}</span>
          </div>
          <div className="modal-field">
            <span className="mf-label">Amount Paid</span>
            <span className="mf-value" style={{ color: "#2563eb", fontWeight: 700 }}>
              {booking.price ? `KES ${Number(booking.price).toLocaleString()}` : "—"}
            </span>
          </div>
          <div className="modal-field">
            <span className="mf-label">Booked By</span>
            <span className="mf-value">{booking.userId || "—"}</span>
          </div>
        </div>

        <div className="modal-status-row">
          <span className="mf-label">Update Status</span>
          <div className="status-btns">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                className={`status-btn ${booking.status === key ? "active" : ""}`}
                style={{ "--sc": cfg.color, "--sb": cfg.bg, "--sbd": cfg.border }}
                onClick={() => onStatusChange(booking.id, key)}
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────
const AdminPanel = () => {
  const { setUser } = useContext(AuthContext);
  // ✅ Pull REAL bookings from BookingContext
  const { bookings, updateBookingStatus, deleteBooking } = useBooking();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  // ✅ Status change updates real BookingContext
  const handleStatusChange = (id, newStatus) => {
    updateBookingStatus(id, newStatus);
    setSelectedBooking((prev) => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
  };

  // ✅ Delete removes from real BookingContext
  const handleDelete = (id) => {
    deleteBooking(id);
    setSelectedBooking(null);
  };

  // ✅ Stats calculated from real bookings
  const totalBookings  = bookings.length;
  const confirmed      = bookings.filter((b) => b.status === "confirmed").length;
  const pending        = bookings.filter((b) => b.status === "pending").length;
  const totalRevenue   = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

  const STATS = [
    { label: "Total Bookings", value: String(totalBookings),  delta: "All time",  icon: "calendar" },
    { label: "Confirmed",      value: String(confirmed),      delta: `${totalBookings ? Math.round((confirmed/totalBookings)*100) : 0}%`, icon: "check" },
    { label: "Pending",        value: String(pending),        delta: "Awaiting",  icon: "trend" },
    { label: "Revenue (KES)",  value: totalRevenue.toLocaleString(), delta: "Confirmed", icon: "money" },
  ];

  // Filter bookings
  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      (b.name  || "").toLowerCase().includes(q) ||
      (b.email || "").toLowerCase().includes(q) ||
      (b.spaceName || b.space || "").toLowerCase().includes(q) ||
      (b.id    || "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="ap-root">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-root { min-height: 100vh; background: #f1f5f9; font-family: 'DM Sans', sans-serif; color: #1e293b; display: flex; overflow: hidden; }

        /* Sidebar */
        .sidebar { width: 240px; min-height: 100vh; background: #0a1628; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding: 1.75rem 1.25rem; gap: 2rem; flex-shrink: 0; transition: width 0.3s, padding 0.3s; overflow: hidden; }
        .sidebar.collapsed { width: 64px; padding: 1.75rem 0.75rem; }
        .sidebar-brand { display: flex; align-items: center; gap: 0.75rem; overflow: hidden; white-space: nowrap; }
        .sidebar-logo { width: 36px; height: 36px; color: #93c5fd; flex-shrink: 0; }
        .sidebar-logo svg { width: 100%; height: 100%; }
        .sidebar-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #ffffff; transition: opacity 0.2s; }
        .collapsed .sidebar-title { opacity: 0; pointer-events: none; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }
        .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0.875rem; border-radius: 10px; color: rgba(255,255,255,0.4); cursor: pointer; transition: background 0.15s, color 0.15s; white-space: nowrap; overflow: hidden; border: none; background: transparent; width: 100%; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; }
        .nav-item.active, .nav-item:hover { background: rgba(37,99,235,0.2); color: #93c5fd; }
        .nav-item.active { background: rgba(37,99,235,0.25); }
        .nav-label { transition: opacity 0.2s; }
        .collapsed .nav-label { opacity: 0; pointer-events: none; }
        .sidebar-logout { display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0.875rem; border-radius: 10px; color: rgba(255,255,255,0.35); cursor: pointer; transition: background 0.15s, color 0.15s; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; white-space: nowrap; overflow: hidden; width: 100%; }
        .sidebar-logout:hover { background: rgba(248,113,113,0.12); color: #fca5a5; }
        .collapsed .sidebar-logout span { opacity: 0; }

        /* Main */
        .ap-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        /* Topbar */
        .topbar { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; border-bottom: 1px solid #e2e8f0; background: #ffffff; flex-shrink: 0; gap: 1rem; }
        .topbar-left { display: flex; align-items: center; gap: 1rem; }
        .topbar-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: #1e293b; }
        .topbar-sub { font-size: 0.8rem; color: #94a3b8; margin-top: 1px; }
        .menu-toggle { background: #eff6ff; border: 1px solid #dbeafe; border-radius: 8px; padding: 0.5rem; color: #2563eb; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
        .menu-toggle:hover { background: #dbeafe; }
        .topbar-right { display: flex; align-items: center; gap: 0.75rem; }
        .admin-badge { display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.875rem; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 20px; font-size: 0.8rem; color: #2563eb; }
        .admin-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.6); }

        /* Content */
        .ap-content { flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1.75rem; }
        .ap-content::-webkit-scrollbar { width: 4px; }
        .ap-content::-webkit-scrollbar-thumb { background: #dbeafe; border-radius: 2px; }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2,1fr); } }
        .stat-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; position: relative; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #2563eb, #3b82f6, transparent); opacity: 0; transition: opacity 0.2s; }
        .stat-card:hover { border-color: #bfdbfe; box-shadow: 0 4px 16px rgba(37,99,235,0.1); }
        .stat-card:hover::before { opacity: 1; }
        .stat-icon { width: 36px; height: 36px; background: #eff6ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #2563eb; }
        .stat-body { display: flex; flex-direction: column; }
        .stat-value { font-family: 'Playfair Display', serif; font-size: 1.875rem; font-weight: 700; color: #1e293b; line-height: 1; }
        .stat-label { font-size: 0.8rem; color: #94a3b8; margin-top: 4px; }
        .stat-delta { font-size: 0.75rem; color: #16a34a; background: rgba(22,163,74,0.08); border: 1px solid rgba(22,163,74,0.2); border-radius: 6px; padding: 2px 7px; align-self: flex-start; }

        /* Empty state */
        .empty-state { text-align: center; padding: 4rem 2rem; color: #94a3b8; }
        .empty-state-icon { font-size: 3rem; margin-bottom: 1rem; }
        .empty-state p { font-size: 0.95rem; }
        .empty-state span { font-size: 0.82rem; color: #cbd5e1; margin-top: 4px; display: block; }

        /* Table */
        .table-section { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
        .table-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; gap: 1rem; flex-wrap: wrap; }
        .table-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1e293b; }
        .table-count { font-size: 0.78rem; color: #94a3b8; margin-left: 0.5rem; }
        .table-controls { display: flex; align-items: center; gap: 0.75rem; }
        .search-wrap { position: relative; }
        .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
        .search-input { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.75rem 0.5rem 2.25rem; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #1e293b; outline: none; width: 220px; transition: border-color 0.2s; }
        .search-input::placeholder { color: #cbd5e1; }
        .search-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
        .filter-select { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.75rem; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #475569; outline: none; cursor: pointer; }
        .filter-select:focus { border-color: #3b82f6; }

        .bookings-table { width: 100%; border-collapse: collapse; }
        .bookings-table th { padding: 0.75rem 1.5rem; text-align: left; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; border-bottom: 1px solid #f1f5f9; background: #f8fafc; white-space: nowrap; }
        .bookings-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; font-size: 0.875rem; vertical-align: middle; }
        .bookings-table tr:last-child td { border-bottom: none; }
        .bookings-table tbody tr { transition: background 0.15s; cursor: pointer; }
        .bookings-table tbody tr:hover { background: #f8fafc; }

        .td-id { color: #94a3b8; font-size: 0.78rem; font-family: monospace; }
        .td-name { color: #1e293b; font-weight: 600; }
        .td-sub { font-size: 0.78rem; color: #94a3b8; margin-top: 2px; }
        .td-date { color: #475569; white-space: nowrap; }
        .td-price { color: #2563eb; font-weight: 600; font-size: 0.85rem; }

        .status-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.625rem; border-radius: 6px; font-size: 0.78rem; font-weight: 500; border: 1px solid; white-space: nowrap; }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

        .row-actions { display: flex; align-items: center; gap: 0.375rem; opacity: 0; transition: opacity 0.15s; }
        .bookings-table tbody tr:hover .row-actions { opacity: 1; }

        .icon-btn { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.35rem; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s, border-color 0.15s; }
        .icon-btn:hover { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
        .icon-btn.danger:hover { background: rgba(248,113,113,0.08); color: #ef4444; border-color: rgba(248,113,113,0.25); }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(10,22,40,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1rem; }
        .modal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 2rem; width: 100%; max-width: 520px; box-shadow: 0 24px 64px rgba(10,22,40,0.2); display: flex; flex-direction: column; gap: 1.5rem; border-top: 4px solid #2563eb; }
        .modal-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .modal-id { font-family: monospace; font-size: 0.78rem; color: #94a3b8; display: block; margin-bottom: 4px; }
        .modal-name { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 1.25rem; }
        .modal-field { display: flex; flex-direction: column; gap: 4px; }
        .mf-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 600; }
        .mf-value { font-size: 0.9rem; color: #1e293b; font-weight: 500; }
        .modal-status-row { display: flex; flex-direction: column; gap: 0.75rem; }
        .status-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .status-btn { padding: 0.4rem 0.875rem; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.83rem; font-weight: 500; cursor: pointer; transition: all 0.15s; background: #f8fafc; border: 1px solid #e2e8f0; color: #94a3b8; }
        .status-btn.active { background: var(--sb); border-color: var(--sbd); color: var(--sc); }
        .status-btn:hover:not(.active) { background: var(--sb); border-color: var(--sbd); color: var(--sc); opacity: 0.7; }
      `}</style>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 4C24 4 10 12 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 12 24 4 24 4Z" fill="currentColor" opacity="0.15"/>
              <path d="M24 10C24 10 14 17 14 26C14 31.523 18.477 36 24 36C29.523 36 34 31.523 34 26C34 17 24 10 24 10Z" fill="currentColor" opacity="0.3"/>
              <circle cx="24" cy="26" r="8" fill="currentColor"/>
              <path d="M20 26C20 23.791 21.791 22 24 22" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="sidebar-title">Swahili Pot</span>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <Icon name="calendar" size={16} />
            <span className="nav-label">Bookings</span>
          </button>
          <button className="nav-item">
            <Icon name="users" size={16} />
            <span className="nav-label">Guests</span>
          </button>
          <button className="nav-item">
            <Icon name="trend" size={16} />
            <span className="nav-label">Analytics</span>
          </button>
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>
          <Icon name="logout" size={16} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main */}
      <div className="ap-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen((o) => !o)}>
              <Icon name="menu" size={16} />
            </button>
            <div>
              <div className="topbar-title">Booking Dashboard</div>
              <div className="topbar-sub">
                {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="admin-badge">
              <div className="admin-dot" />
              Admin
            </div>
          </div>
        </header>

        <main className="ap-content">

          {/* ✅ Real stats */}
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-icon"><Icon name={s.icon} size={20} /></div>
                <div className="stat-body">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
                <span className="stat-delta">{s.delta}</span>
              </div>
            ))}
          </div>

          {/* ✅ Real bookings table */}
          <div className="table-section">
            <div className="table-toolbar">
              <span className="table-title">
                All Reservations
                <span className="table-count">({filtered.length})</span>
              </span>
              <div className="table-controls">
                <div className="search-wrap">
                  <span className="search-icon"><Icon name="search" size={15} /></span>
                  <input
                    className="search-input"
                    placeholder="Search name, email, space…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <p>No bookings yet</p>
                <span>When users book a space, they will appear here.</span>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Space</th>
                      <th>Date &amp; Time</th>
                      <th>Amount</th>
                      <th>Occasion</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                          No bookings match your search.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((b, i) => {
                        const st = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
                        return (
                          <tr key={b.id || i} onClick={() => setSelectedBooking(b)}>
                            <td>
                              <div className="td-name">{b.name}</div>
                              <div className="td-sub">{b.email}</div>
                            </td>
                            <td>
                              <div className="td-name" style={{ fontSize: "0.85rem" }}>{b.spaceName || b.space}</div>
                              <div className="td-sub">{b.userId}</div>
                            </td>
                            <td>
                              <div className="td-date">
                                {b.date ? new Date(b.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                              </div>
                              <div className="td-sub">{b.time}</div>
                            </td>
                            <td>
                              <span className="td-price">
                                {b.price ? `KES ${Number(b.price).toLocaleString()}` : "—"}
                              </span>
                            </td>
                            <td style={{ color: "#475569", fontSize: "0.85rem" }}>{b.occasion || "—"}</td>
                            <td>
                              <span className="status-pill" style={{ color: st.color, background: st.bg, borderColor: st.border }}>
                                <span className="status-dot" />
                                {st.label}
                              </span>
                            </td>
                            <td>
                              <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                                <button className="icon-btn" title="View" onClick={() => setSelectedBooking(b)}>
                                  <Icon name="eye" size={14} />
                                </button>
                                <button className="icon-btn danger" title="Delete" onClick={() => handleDelete(b.id)}>
                                  <Icon name="trash" size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminPanel;

