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

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔍 Search question (FORCE Render backend)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setError("");
    setShowResult(false);
    setAnswer("");

    try {
      const res = await fetch(
        `https://learnovaproj.onrender.com/api/ask?question=${encodeURIComponent(
          search
        )}`
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Failed to fetch answer");
      }

      setAnswer(data.answer);
      setShowResult(true);
    } catch (err) {
      setError("Failed to fetch answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Save note
  const saveNote = (title, content) => {
    addNote({ title, content });
    setShowModal(false);
    alert("Note saved!");
  };

  return (
    <div className="page-container" style={styles.pageContainer}>
      <div style={styles.homeHero}>
        <div style={styles.heroContainer}>
          <h1 className="hero-welcome" style={styles.heroWelcome}>
            Welcome, {username}
          </h1>
          <p style={styles.heroSubtitle}>
            Ask your syllabus related questions...
          </p>

          {/* 🔍 Search */}
          <form onSubmit={handleSearch} style={styles.searchContainer}>
            <input
              placeholder="Ask your ques"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchBtn} aria-label="Search">
              <Search size={20} color="#fff" />
            </button>
          </form>

          {/* ⏳ Loading & Error */}
          {loading && (
            <p style={{ color: "#aaa", marginTop: 10 }}>Searching...</p>
          )}
          {error && (
            <p style={{ color: "red", marginTop: 10 }}>{error}</p>
          )}

          {/* ✅ Result */}
          {showResult && (
            <div style={{ marginTop: 18 }}>
              <h3 style={{ fontSize: 18, marginBottom: 8 }}>{search}</h3>

              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: 14,
                  borderRadius: 10,
                }}
              >
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 24 }}>👨‍🎓</div>
                  <p style={{ margin: 0, color: "#ddd", whiteSpace: "pre-line" }}>
                    {answer}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <button
                  style={styles.primaryBtn}
                  onClick={() => setShowModal(true)}
                >
                  CREATE NOTES ON THIS TOPIC
                </button>
                <button
                  style={styles.secondaryBtn}
                  onClick={() => setCurrentRoute("/practice")}
                >
                  PRACTICE QUESTIONS
                </button>
              </div>
            </div>
          )}

          {/* 📝 Note Modal */}
          {showModal && (
            <NoteModal
              onClose={() => setShowModal(false)}
              onSave={saveNote}
              defaultTitle={`Note - ${search || "topic"}`}
              defaultContent={answer}
            />
          )}
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

export default HomePage;
