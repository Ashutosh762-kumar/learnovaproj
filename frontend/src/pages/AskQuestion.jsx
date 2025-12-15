import React, { useState } from "react";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
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

      const res = await fetch(
        `http://localhost:7000/api/ask?question=${encodeURIComponent(question)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get answer");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
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
        style={{ width: "100%", padding: "12px", borderRadius: "8px" }}
      />

      <br /><br />

      <button
        onClick={askQuestion}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "#0b5ed7",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {answer && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#1f2937",
            borderRadius: "8px",
          }}
        >
          <h4>Answer:</h4>
          <p style={{ whiteSpace: "pre-line" }}>{answer}</p>
        </div>
      )}
    </div>
  );
}
