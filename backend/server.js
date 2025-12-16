// 🔴 IMPORTANT: Render injects env vars automatically
// dotenv is harmless locally, safe to keep
require("dotenv").config();

const express = require("express");
const cors = require("cors");
// const connectDB = require("./config/db");


// 🔹 ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const quizRoutes = require("./routes/quizzes");
const progressRoutes = require("./routes/progress");
const enrollmentRoutes = require("./routes/enrollment");
const uploadRoutes = require("./routes/uploads");
const askRoutes = require("./routes/askRoutes");

const app = express();

// 🔹 MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// 🔹 ROOT ROUTE (Health Check)
app.get("/", (req, res) => {
  res.send("Learnova API Running");
});

// 🔹 API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api", askRoutes);

// 🔹 CONNECT DATABASE → THEN START SERVER
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
//connectDB()
//  .then(() => {
//    console.log("✅ MongoDB connected");

//    app.listen(PORT, () => {
//      console.log(`🚀 Server running on port ${PORT}`);
//    });
//  })
//  .catch((error) => {
//    console.error("❌ MongoDB connection failed:", error.message);
//    process.exit(1);
//  });
