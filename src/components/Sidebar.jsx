// src/components/Sidebar.jsx
import React from "react";
import styles from "../styles/styles";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const { notes } = useAppContext();
  const trending = ["Cell Structure", "Newton's Laws", "Chemical Reactions", "Indian History", "Algebra Basics"];

  return (
    <aside style={styles.sidebar} className="sidebar">
      <div style={styles.sidebarSection}>
        <h4 style={styles.sidebarTitle}>TRENDING TOPICS</h4>
        {trending.map((t, i) => (
          <div key={i} style={styles.topicItem}>📘 {t}</div>
        ))}
      </div>

      <div style={styles.sidebarSection}>
        <h4 style={styles.sidebarTitle}>QUICK NOTES</h4>
        {notes && notes.length > 0 ? (
          notes.slice(-3).reverse().map((n) => (
            <div key={n.id} style={{ marginBottom: 8 }}>
              <div style={styles.quickNoteItem}>{n.title}</div>
            </div>
          ))
        ) : (
          <div style={styles.quickNoteItem}>Quick Note</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
