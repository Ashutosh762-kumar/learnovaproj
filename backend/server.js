require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// 🔹 IMPORT ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const quizRoutes = require("./routes/quizzes");
const progressRoutes = require("./routes/progress");
const enrollmentRoutes = require("./routes/enrollment");
const uploadRoutes = require("./routes/uploads");

// 🔹 IMPORT ASK ROUTE (NEW)
const askRoutes = require("./routes/askRoutes");

const app = express();

// 🔹 MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// 🔹 CONNECT DATABASE
connectDB();

// 🔹 API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/uploads", uploadRoutes);

// ⭐ ASK QUESTION ROUTE
// Frontend will call:
// http://localhost:7000/api/ask?question=What is acid
app.use("/api", askRoutes);

// 🔹 ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Learnova API Running");
});

// 🔹 SERVER START
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
