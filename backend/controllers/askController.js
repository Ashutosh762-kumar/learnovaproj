console.log("🔥🔥🔥 NEW askController.js LOADED 🔥🔥🔥");
console.log("🔥 askController loaded (DB → GEMINI)");

const db = require("../config/db");
const fetch = require("node-fetch");

// 🔹 Clean & normalize question
function cleanQuestion(q) {
  return q
    .toLowerCase()
    .replace(/what is|define|explain|describe|why|how|when|where|\?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const askQuestion = async (req, res) => {
  const question = req.query.question || req.body.question;

  if (!question) {
    return res.status(400).json({
      success: false,
      message: "Question is required",
    });
  }

  console.log("👉 Question received:", question);

  const cleaned = cleanQuestion(question);
  console.log("🔍 Cleaned question:", cleaned);

  // 🔹 Extract keywords
  const keywords = cleaned.split(" ").filter(word => word.length > 3);
  console.log("🔑 Keywords:", keywords);

  try {
    /* ===============================
       1️⃣ DATABASE SEARCH (NCERT)
    =============================== */

    if (keywords.length > 0) {
      // Match against topic_name OR content (flexible)
      const conditions = keywords
        .map(() => "(LOWER(topic_name) LIKE ? OR LOWER(content) LIKE ?)")
        .join(" OR ");

      const values = keywords.flatMap(word => [`%${word}%`, `%${word}%`]);

      const sql = `
        SELECT topic_name, content
        FROM notes
        WHERE ${conditions}
        LIMIT 1
      `;

      db.get(sql, values, async (err, row) => {
        if (err) {
          console.error("❌ Database error:", err);
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        // ✅ FOUND IN DATABASE
        if (row) {
          console.log("📘 Answer from DATABASE");

          return res.json({
            success: true,
            source: "database",
            topic: row.topic_name,
            answer: row.content,
          });
        }

        /* ===============================
           2️⃣ FALLBACK → GEMINI AI
        =============================== */

        console.log("🤖 Answer from GEMINI");

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Explain ${question} in simple words for school students`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        // 🔹 SAFE Gemini response parsing
        let text = "No answer generated.";

        try {
          if (data?.candidates?.length > 0) {
            const parts = data.candidates[0].content?.parts;
            if (Array.isArray(parts)) {
              text = parts
                .map(p => p.text)
                .filter(Boolean)
                .join(" ");
            }
          }
        } catch (e) {
          console.error("❌ Gemini parsing error:", e);
        }

        return res.json({
          success: true,
          source: "gemini",
          answer: text,
        });
      });
    } else {
      // Edge case: no keywords
      return res.json({
        success: false,
        message: "Question too short to process",
      });
    }
  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { askQuestion };
