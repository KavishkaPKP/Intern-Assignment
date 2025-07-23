import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';


import authRoutes from './routes/auth_route.js';
import adminRoutes from './routes/admin_route.js';
import examRoutes from './routes/exam_route.js';
import questionRoutes from './routes/question_routes.js';
import resultRoutes from './routes/result_route.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});


//routes for API

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    console.log(`Server running on port ${PORT}`);
    console.log(`Last refreshed at: ${formattedTime}`);
});