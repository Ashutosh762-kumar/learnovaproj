const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/ask", async (req, res) => {
  try {
    const question = req.query.question;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    /* ------------------------------------------------
       STEP 1: GET EXPLANATION FROM GEMINI
    ------------------------------------------------ */
    const prompt = `Explain ${question} in simple words for school students.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error });
    }

    let raw =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    /* ------------------------------------------------
       STEP 2: CLEAN RAW OUTPUT
    ------------------------------------------------ */

    raw = raw
      .replace(/\n?\|.*\|\n(\|.*\|\n)*/g, "") // tables
      .replace(/\$\$[\s\S]*?\$\$/g, "") // equations
      .replace(/#+\s*/g, "") // headings
      .replace(/\n+/g, " ");

    const forbiddenWords = [
      "quark",
      "fermion",
      "boson",
      "dark matter",
      "cosmology",
      "einstein",
      "relativity",
      "higgs",
      "standard model",
      "particle physics",
    ];

    forbiddenWords.forEach(word => {
      const regex = new RegExp(word, "gi");
      raw = raw.replace(regex, "");
    });

    /* ------------------------------------------------
       STEP 3: GENERIC NOTES BUILDER
    ------------------------------------------------ */

    const sentences = raw
      .split(".")
      .map(s => s.trim())
      .filter(s => s.length > 25);

    const notes = [];

    sentences.slice(0, 8).forEach(sentence => {
      notes.push(`• ${sentence}.`);
    });

    const finalNotes = notes.join("\n");

    /* ------------------------------------------------
       FINAL RESPONSE
    ------------------------------------------------ */
    res.json({
      question,
      answer: finalNotes,
    });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
