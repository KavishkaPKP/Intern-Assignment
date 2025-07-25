const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  try {
    const { exam_id, question_text, options, correct_option } = req.body;

    if (!exam_id || !question_text || !options || !correct_option) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newQuestion = await Question.create({
      exam_id,
      question_text,
      options,
      correct_option
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create question', error: err.message });
  }
};