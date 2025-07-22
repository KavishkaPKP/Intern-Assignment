import express from 'express';
const router = express.Router();

import Result  from '../models/results_module.js';
import Answer  from '../models/answer_model.js';
import Question  from '../models/question_model.js';

router.post('/', async (req, res) => {
  const { userId, examId, answers } = req.body;
  let score = 0;

  for (let ans of answers) {
    const question = await Question.findById(ans.questionId);
    if (question.correctOption === ans.selectedOption) score++;
  }

  const result = new Result({ userId, examId, score });
  await result.save();

  for (let ans of answers) {
    const question = await Question.findById(ans.questionId);
    const isCorrect = question.correctOption === ans.selectedOption;
    await new Answer({
      resultId: result._id,
      questionId: ans.questionId,
      selectedOption: ans.selectedOption,
      isCorrect
    }).save();
  }

  res.status(201).json({ score });
});

export default router;