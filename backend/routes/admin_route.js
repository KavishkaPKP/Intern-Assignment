// backend/routes/admin_route.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin_model.js';
import Question from '../models/question_model.js';

const router = express.Router();

// Middleware to verify JWT token and authenticate admin
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1]; // Expected format: "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // Attach decoded payload to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Admin Registration
router.post('/admin_register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id, email: newAdmin.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Admin registered successfully',
      admin: { id: newAdmin._id, email: newAdmin.email },
      token,
    });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with secret key
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with admin info and token
    res.status(200).json({ message: 'Login successful', admin, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all questions by examId (protected)
router.get('/questions/:examId', verifyToken, async (req, res) => {
  try {
    const questions = await Question.find({ examId: req.params.examId });
    res.json(questions);
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new question (protected)
router.post('/questions', verifyToken, async (req, res) => {
  try {
    const { question, options, correctAnswer, examId } = req.body;

    if (!question || !options || !correctAnswer || !examId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Optional: Validate options is array and correctAnswer in options

    const newQuestion = await Question.create({ question, options, correctAnswer, examId });
    res.status(201).json({ message: 'Question added successfully', question: newQuestion });
  } catch (error) {
    console.error('Add question error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update question by ID (protected)
router.put('/questions/:id', verifyToken, async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(updatedQuestion);
  } catch (error) {
    console.error('Update question error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete question by ID (protected)
router.delete('/questions/:id', verifyToken, async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;