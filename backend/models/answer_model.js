import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({

  resultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },

  selectedOption: String,
  isCorrect: Boolean
});

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;