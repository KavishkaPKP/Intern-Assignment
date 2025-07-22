import express from 'express';
const router = express.Router();


import Question from '../models/question_model.js';

router.get('/:examId', async (req, res) => {
  const questions = await Question.find({ examId: req.params.examId });
  res.json(questions);
});

router.post('/', async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.status(201).json(question);
});

router.put('/:id', async (req, res) => {
  const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;