const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch exams', error: err.message 
    });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await Question.find({ exam_id: examId });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch questions', error: err.message 
    });
  }
};

exports.createExam = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
         message: 'Title and description are required' 
        });
    }

    const newExam = await Exam.create({ title, description });
    res.status(201).json(newExam);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to create exam', error: err.message 
    });
  }
};