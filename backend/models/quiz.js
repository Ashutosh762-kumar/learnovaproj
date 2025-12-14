// quiz model
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required:true },
  title: String,
  totalMarks: Number,
  durationMinutes: Number
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
