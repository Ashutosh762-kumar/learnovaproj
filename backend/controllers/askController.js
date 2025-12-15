console.log("🔥 askController loaded (GEMINI)");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const askQuestion = async (req, res) => {
  const { question } = req.query;

  console.log("👉 Question received:", question);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(question);
    const text = result.response.text();

    return res.json({
      success: true,
      answer: text,
    });
  } catch (err) {
    console.error("❌ Gemini error:", err);
    return res.status(500).json({
      success: false,
      message: "Gemini failed",
    });
  }
};

module.exports = { askQuestion };
