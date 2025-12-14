// question model
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required:true },
  text: { type: String, required:true },
  options: [ { type: String } ],
  answerIndex: { type: Number, required:true }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
