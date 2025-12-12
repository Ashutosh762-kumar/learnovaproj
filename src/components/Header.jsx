// src/components/Header.jsx
import React from "react";
import { User, Menu, X } from "lucide-react";
import styles from "../styles/styles";
import { useAppContext } from "../context/AppContext";

const Header = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { setCurrentRoute } = useAppContext();

  return (
    <header style={styles.header} className="site-header">
      <div style={styles.headerContent} className="header-content">
        <div style={styles.logo} onClick={() => setCurrentRoute("/")}>
          <div style={{ fontSize: 24 }}>🎓</div>
          <div style={styles.logoText}>Learnova</div>
        </div>

        {/* Desktop nav */}
        <nav style={styles.nav} className="main-nav" role="navigation">
          <button style={styles.navBtn} onClick={() => setCurrentRoute("/")}>HOME</button>
          <button style={styles.navBtn} onClick={() => setCurrentRoute("/notes")}>NOTES</button>
          <button style={styles.navBtn} onClick={() => setCurrentRoute("/practice")}>PRACTICE</button>
          <button style={styles.navBtn} onClick={() => setCurrentRoute("/dashboard")}>DASHBOARD</button>
          <button style={styles.navBtn} onClick={() => setCurrentRoute("/about")}>ABOUT US</button>
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={styles.accountBtn} onClick={() => setCurrentRoute("/account")}>
            <User size={18} />
            <div style={{ marginLeft: 6 }} className="account-text">My Account</div>
          </div>

          {/* Mobile menu toggle (hidden on desktop via CSS) */}
          <button
            onClick={onMenuToggle}
            style={{ background: "none", border: "none", color: "#fff" }}
            aria-label="Toggle menu"
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav (only used on small screens) */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`} role="menu" aria-hidden={!isMobileMenuOpen}>
        <button className="mobile-nav-item" onClick={() => { setCurrentRoute("/"); onMenuToggle(); }}>HOME</button>
        <button className="mobile-nav-item" onClick={() => { setCurrentRoute("/notes"); onMenuToggle(); }}>NOTES</button>
        <button className="mobile-nav-item" onClick={() => { setCurrentRoute("/practice"); onMenuToggle(); }}>PRACTICE</button>
        <button className="mobile-nav-item" onClick={() => { setCurrentRoute("/dashboard"); onMenuToggle(); }}>DASHBOARD</button>
        <button className="mobile-nav-item" onClick={() => { setCurrentRoute("/about"); onMenuToggle(); }}>ABOUT US</button>
        <button className="mobile-nav-item" onClick={() => { setCurrentRoute("/account"); onMenuToggle(); }}>MY ACCOUNT</button>
      </div>
    </header>
  );
};

export default Header;
