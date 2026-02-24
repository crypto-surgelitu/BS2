import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Restore session from localStorage on app load ────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem("swahilipot_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("swahilipot_user");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── SIGNUP ───────────────────────────────────────────────
  const signup = ({ fullName, email, phone, password }) => {
    const existing = JSON.parse(localStorage.getItem("swahilipot_users") || "[]");

    if (existing.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
      id:        Date.now().toString(),
      fullName,
      name:      fullName,          // ✅ both fields so nothing breaks
      email:     email.toLowerCase(),
      phone:     phone || "",
      password,
      role:      "user",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("swahilipot_users", JSON.stringify([...existing, newUser]));
    return { success: true };
  };

  // ── LOGIN ────────────────────────────────────────────────
  const login = (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();

    // Hardcoded admin
    if (normalizedEmail === "admin@email.com" && password === "1234") {
      const adminUser = {
        id:       "admin",
        fullName: "Administrator",
        name:     "Administrator",   // ✅ both fields
        email:    normalizedEmail,
        role:     "admin",
      };
      setUser(adminUser);
      localStorage.setItem("swahilipot_user", JSON.stringify(adminUser));
      return { success: true, role: "admin" };
    }

    // Registered users
    const existing = JSON.parse(localStorage.getItem("swahilipot_users") || "[]");
    const found = existing.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!found) {
      return { success: false, message: "Incorrect email or password." };
    }

    const sessionUser = {
      id:       found.id,
      fullName: found.fullName,
      name:     found.fullName,      // ✅ both fields
      email:    found.email,
      phone:    found.phone,
      role:     found.role,
    };

    setUser(sessionUser);
    localStorage.setItem("swahilipot_user", JSON.stringify(sessionUser));
    return { success: true, role: found.role };
  };

  // ── LOGOUT ───────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    localStorage.removeItem("swahilipot_user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
export default AuthProvider;
