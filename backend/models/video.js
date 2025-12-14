// video model
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required:true },
  title: String,
  url: String,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
