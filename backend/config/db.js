const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 👇 absolute path resolved at runtime
const dbPath = path.join(__dirname, "../database/ncert_education.db");

console.log("🗂️ DB PATH:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ Connected to NCERT SQLite database");
  }
});

module.exports = db;
