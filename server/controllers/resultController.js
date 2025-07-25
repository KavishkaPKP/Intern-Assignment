// /controllers/resultController.js
const Result = require('../models/Result');
const Question = require('../models/Question');

exports.submitResult = async (req, res) => {
  try {
    const { user_id, exam_id, answers } = req.body;
    let score = 0;

    for (let ans of answers) {
      const question = await Question.findById(ans.question_id);
      if (question.correct_option === ans.selected_option) {
        score++;
      }
    }

    const result = new Result({ user_id, exam_id, score });
    await result.save();

    res.status(201).json({ message: 'Result saved', score });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit result', error: err.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ user_id: userId }).populate('exam_id');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results', error: err.message });
  }
};
