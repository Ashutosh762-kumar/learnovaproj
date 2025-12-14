// progress model
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required:true },
  watchedVideos: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Video' } ],
  completedQuizzes: [ { quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, score: Number } ]
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
