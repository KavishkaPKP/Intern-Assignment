import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({

  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  },
  questionText: String,
  options: {
    A: String,
    B: String,
    C: String,
    D: String
  },
  correctOption: String
});

const Question = mongoose.model('Question', questionSchema);
export default Question;