// src/pages/DashboardPage.jsx
import React from "react";
import styles from "../styles/styles";
import { useAppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  const { username, notes, savedPractice } = useAppContext();
  const questionsAttempted = JSON.parse(localStorage.getItem("learnova_attempts") || "[]").length;

  const stats = {
    notesCount: notes.length,
    practiceCount: savedPractice.length,
    questionsAttempted,
  };

  return (
    <div className="page-container" style={styles.pageContainer}>

      <div>
        <h2 style={styles.pageHeading}>Dashboard</h2>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Welcome</div>
            <div style={{ fontWeight: 700 }}>{username}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Notes Saved</div>
            <div style={styles.statNumber}>{stats.notesCount}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Practice Saved</div>
            <div style={styles.statNumber}>{stats.practiceCount}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Questions Attempted</div>
            <div style={styles.statNumber}>{stats.questionsAttempted}</div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 8 }}>Quick Actions</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={styles.primaryBtn}
              onClick={() => {
                alert("Go to Practice");
                // optionally: set route if you want navigation here
                // setCurrentRoute("/practice");
              }}
            >
              Practice Now
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => {
                alert("Open Notes");
                // optionally: setCurrentRoute("/notes");
              }}
            >
              View Notes
            </button>
          </div>
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

export default DashboardPage;
