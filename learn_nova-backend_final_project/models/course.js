// course model
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required:true },
  description: String,
  category: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thumbnail: String,
  materials: [ { type: String } ]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
