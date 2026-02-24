import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

// ── ProtectedRoute ─────────────────────────────────────────
// Wraps any page that requires the user to be logged in.
// If not logged in → redirect to /login
// If logged in but wrong role → redirect to /booking
//
// Usage in App.jsx:
//   <Route path="/booking"     element={<ProtectedRoute><SmartBookingDashboard /></ProtectedRoute>} />
//   <Route path="/admin-panel" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still checking localStorage — show nothing
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a1628",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: 36, height: 36,
          border: "3px solid rgba(59,130,246,0.2)",
          borderTopColor: "#2563eb",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in → go to login, remember where they came from
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Trying to access admin page as a regular user
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/booking" replace />;
  }

  return children;
};

export default ProtectedRoute;
