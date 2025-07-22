import express from 'express';
const router = express.Router();


import User from '../models/user_model.js';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json(user);
});

export default router;