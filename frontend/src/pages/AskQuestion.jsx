import React, { useState } from "react";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnswer("");
      setSource("");

      // 🔹 CALL RENDER BACKEND (NOT localhost)
      const res = await fetch(
        `https://learnovaproj.onrender.com/api/ask?question=${encodeURIComponent(
          question
        )}`
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to get answer");
      }

      setAnswer(data.answer);
      setSource(data.source);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h2>Ask a Question</h2>

      <textarea
        rows="4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your syllabus question..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      />

      <br />
      <br />

      <button
        onClick={askQuestion}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "#0b5ed7",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
      )}

      {answer && (
        <div
          style={{
            marginTop: "25px",
            padding: "18px",
            background: "#1f2937",
            borderRadius: "8px",
          }}
        >
          <h4>Answer</h4>

          <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "10px" }}>
            Source:{" "}
            {source === "database" ? "NCERT Database" : "AI (Gemini)"}
          </p>

          <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}