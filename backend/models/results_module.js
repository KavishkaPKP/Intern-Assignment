import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);
export default Result