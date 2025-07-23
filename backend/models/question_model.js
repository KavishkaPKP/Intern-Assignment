import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);
export default Question;