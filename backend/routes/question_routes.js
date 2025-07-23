import express from 'express';
const router = express.Router();

import Question from '../models/question_model.js';

// GET questions for a specific exam
router.get('/:examId', async (req, res) => {
  try {
    const questions = await Question.find({ examId: req.params.examId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

export default router;