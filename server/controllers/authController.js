const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 

      name, 
      email, 
      password: hashedPassword });


    await newUser.save();

    res.status(201).json({ 

      message: 'User registered successfully' 
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error registering user', error: err.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({
      message: 'Invalid credentials' 
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      token, user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
