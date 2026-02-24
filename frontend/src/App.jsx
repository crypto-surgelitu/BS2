import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SmartBookingDashboard from "./pages/SmartBookingDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>

            {/* ── Public pages ── */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* ── Protected: regular users ── */}
            <Route path="/booking" element={
              <ProtectedRoute>
                <SmartBookingDashboard />
              </ProtectedRoute>
            } />

            {/* ── Protected: admin only ── */}
            <Route path="/admin-panel" element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            } />

            {/* ── Fallback ── */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
