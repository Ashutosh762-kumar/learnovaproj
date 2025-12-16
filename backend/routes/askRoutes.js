const express = require("express");
const router = express.Router();

const { askQuestion } = require("../controllers/askController");

console.log("🔥🔥🔥 NEW askRoutes.js LOADED 🔥🔥🔥");

router.get("/ask", askQuestion);
router.post("/ask", askQuestion);

module.exports = router;
