const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  score: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);