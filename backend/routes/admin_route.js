// backend/routes/admin_route.js
import express from 'express';
import Admin from '../models/admin_model.js';
import Question from '../models/question_model.js';
const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:examId', async (req, res) => {
  const questions = await Question.find({ examId: req.params.examId });
  res.json(questions);
});

router.post('/add-question', async (req, res) => {
  try {
    const { question, options, correctAnswer, examId } = req.body;

    // Validate inputs
    if (!question || !options || !correctAnswer || !examId) {
      return res.status(400).json({ message: 'Missing fields' });
    } 

    // Save to DB
    await Question.create({ question, options, correctAnswer, examId });

    res.status(200).json({ message: 'Question added successfully' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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