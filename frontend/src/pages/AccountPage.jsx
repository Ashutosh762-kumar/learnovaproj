// src/pages/AccountPage.jsx
import React from "react";
import styles from "../styles/styles";
import { User } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";

const AccountPage = () => {
  const { username, notes, savedPractice } = useAppContext();

  return (
    <div className="page-container" style={styles.pageContainer}>

      <div>
        <h2 style={styles.pageHeading}>My Account</h2>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#667eea,#764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={34} color="#fff" />
          </div>

          <div>
            <div style={{ fontWeight: 700 }}>{username}</div>
            <div style={{ color: "#cfcfcf" }}>student@learnova.com</div>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Saved Notes</div>
            <div style={styles.statNumber}>{notes.length}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Saved Questions</div>
            <div style={styles.statNumber}>{savedPractice.length}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Attempts</div>
            <div style={styles.statNumber}>
              {JSON.parse(localStorage.getItem("learnova_attempts") || "[]").length}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 8 }}>Account Actions</h3>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => {
                alert("Profile editing is not implemented yet.");
              }}
            >
              Edit Profile
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => {
                if (window.confirm("Clear all local data (notes, practice saves, attempts)?")) {
                  localStorage.removeItem("learnova_notes");
                  localStorage.removeItem("learnova_practice");
                  localStorage.removeItem("learnova_attempts");
                  window.location.reload();
                }
              }}
            >
              Clear Local Data
            </button>
          </div>
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

export default AccountPage;
