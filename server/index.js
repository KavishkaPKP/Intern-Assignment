const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');
const resultRoutes = require('./routes/results');

const questionRoutes = require('./routes/questionRoutes');


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/questions', questionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const now = new Date();

    const formattedTime = now.toLocaleString(); 
    console.log(`Server running on port ${PORT}`);
    console.log(`Last refreshed at: ${formattedTime}`);
});