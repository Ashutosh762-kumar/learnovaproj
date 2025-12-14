// src/pages/HomePage.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";
import styles from "../styles/styles";
import { useAppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import NoteModal from "../components/NoteModal";

const HomePage = () => {
  const { username, setCurrentRoute, addNote } = useAppContext();
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) setShowResult(true);
  };

  const saveNote = (title, content) => {
    addNote({ title, content });
    setShowModal(false);
    alert("Note saved!");
  };

  return (
    <div className="page-container" style={styles.pageContainer}>

      <div style={styles.homeHero}>
        <div style={styles.heroContainer}>
          <h1 className="hero-welcome" style={styles.heroWelcome}>Welcome, {username}</h1>
          <p style={styles.heroSubtitle}>Ask your syllabus related questions...</p>

          <form onSubmit={handleSearch} style={styles.searchContainer}>
            <input
              placeholder="Ask your ques"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchBtn} aria-label="Search">
              <Search size={20} color="#fff" />
            </button>
          </form>

          {showResult && (
            <div style={{ marginTop: 18 }}>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>What is an acid?</h3>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 14, borderRadius: 10 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 24 }}>👨‍🎓</div>
                  <p style={{ margin: 0, color: "#ddd" }}>
                    An acid releases hydrogen ions (H+). Examples: HCl (stomach acid), acetic acid (vinegar), citric acid (lemon).
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <button style={styles.primaryBtn} onClick={() => setShowModal(true)}>CREATE NOTES ON THIS TOPIC</button>
                <button style={styles.secondaryBtn} onClick={() => setCurrentRoute("/practice")}>PRACTICE QUESTIONS</button>
              </div>
            </div>
          )}

          {showModal && (
            <NoteModal
              onClose={() => setShowModal(false)}
              onSave={saveNote}
              defaultTitle={`Note - ${search || "topic"}`}
              defaultContent={`Quick note about: ${search || "topic"}`}
            />
          )}
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

export default HomePage;
