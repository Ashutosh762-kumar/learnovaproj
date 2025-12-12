// src/pages/PracticePage.jsx
import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { useAppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";

const PracticePage = () => {
  const mockPracticeQuestions = [
    {
      id: "p1",
      question: "Which of the following is an acid?",
      options: ["NaOH", "HCl", "NaCl", "KOH"],
      correctIndex: 1,
      explanation: "HCl is a strong acid because it releases H+ ions.",
    },
    {
      id: "p2",
      question: "What is the pH of a neutral solution?",
      options: ["0", "7", "14", "10"],
      correctIndex: 1,
      explanation: "A neutral solution has pH 7.",
    },
    {
      id: "p3",
      question: "Which gas is released during photosynthesis?",
      options: ["CO2", "O2", "N2", "H2"],
      correctIndex: 1,
      explanation: "Plants release oxygen (O2) during photosynthesis.",
    },
  ];

  const { savePracticeQuestion } = useAppContext();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = mockPracticeQuestions[index];

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
  }, [index]);

  const submit = () => {
    if (selected === null) return;
    setShowResult(true);
    const arr = JSON.parse(localStorage.getItem("learnova_attempts") || "[]");
    arr.push({ qId: currentQuestion.id, time: new Date().toISOString(), selected });
    localStorage.setItem("learnova_attempts", JSON.stringify(arr));
  };

  const goNext = () => setIndex((i) => (i + 1) % mockPracticeQuestions.length);
  const goBack = () => setIndex((i) => (i - 1 + mockPracticeQuestions.length) % mockPracticeQuestions.length);

  const saveQ = () => {
    savePracticeQuestion(currentQuestion);
    alert("Question saved!");
  };

  return (
    <div className="page-container" style={styles.pageContainer}>

      <div>
        <h2 style={styles.pageHeading}>Practice Questions</h2>

        <div style={{ marginTop: 6 }}>
          <h3>{currentQuestion.question}</h3>

          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              style={{
                ...styles.optionBtn,
                ...(selected === idx ? styles.selectedOption : {}),
                ...(showResult && idx === currentQuestion.correctIndex ? styles.correctOption : {}),
              }}
              onClick={() => !showResult && setSelected(idx)}
              disabled={showResult}
            >
              {opt}
            </button>
          ))}

          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            {!showResult ? (
              <>
                <button style={styles.primaryBtn} onClick={submit} disabled={selected === null}>
                  Submit
                </button>
                <button style={styles.secondaryBtn} onClick={goBack}>
                  Previous
                </button>
              </>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#fff", marginBottom: 8 }}>
                    {selected === currentQuestion.correctIndex ? "Correct! 🎉" : "Wrong ❌"}
                  </p>
                  <p style={{ color: "#ddd" }}>{currentQuestion.explanation}</p>
                </div>

                <button style={styles.primaryBtn} onClick={goNext}>Next</button>
                <button style={styles.secondaryBtn} onClick={saveQ}>Save Question</button>
                <button
                  style={styles.primaryBtn}
                  onClick={() => {
                    setSelected(null);
                    setShowResult(false);
                  }}
                >
                  Retry
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

export default PracticePage;
