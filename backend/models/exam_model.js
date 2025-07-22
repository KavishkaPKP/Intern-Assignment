import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;