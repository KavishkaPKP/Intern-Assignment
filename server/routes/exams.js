// /routes/examRoutes.js
const express = require('express');
const router = express.Router();
const { getExams, getQuestions, createExam } = require('../controllers/examController');

router.get('/', getExams);
router.get('/:examId/questions', getQuestions);
router.post('/', createExam);

module.exports = router;