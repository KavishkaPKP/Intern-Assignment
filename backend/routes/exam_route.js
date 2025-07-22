import express from 'express';
const router = express.Router();

import Exam from '../models/exam_model.js';

router.get('/', async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
});

router.post('/', async (req, res) => {
  const exam = new Exam(req.body);
  await exam.save();
  res.status(201).json(exam);
});

export default router;