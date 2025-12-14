// src/components/Header.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "NOTES", path: "/notes" },
    { label: "PRACTICE", path: "/practice" },
    { label: "DASHBOARD", path: "/dashboard" },
    { label: "ABOUT US", path: "/about" },
  ];

  return (
    <header
      style={{
        background: "rgba(26,26,46,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#fff",
            fontWeight: 800,
            fontSize: 20,
          }}
        >
          🎓 Learnova
        </Link>

        {/* NAVIGATION (ONLY AFTER LOGIN) */}
        {user && (
          <nav style={{ display: "flex", gap: 22 }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: "none",
                  color:
                    location.pathname === item.path
                      ? "#fff"
                      : "#cbd5e1",
                  padding: "6px 12px",
                  borderRadius: 8,
                  border:
                    location.pathname === item.path
                      ? "1px solid rgba(255,255,255,0.4)"
                      : "1px solid transparent",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {!user ? (
            <>
              <Link
                to="/login"
                style={{
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.3)",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={{
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* 🔹 ONLY CHANGE IS HERE */}
              <Link
                to="/account"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#cbd5e1",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                <User size={16} />
                {user?.email}
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
