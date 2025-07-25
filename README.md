# Online MCQ Exam System

A simple web application built with React (frontend), Node.js + Express (backend), and MongoDB (database).

## 📦 Project Structure

```
mcq-system/
├── client/         # React Frontend
└── server/         # Node.js + Express Backend
```

## 🚀 Features

- Static login
- View list of mock exam papers
- Attempt MCQ exams (5 questions)
- Submit answers and view results

## 🛠️ Tech Stack

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB (with Mongoose)



### 1. Backend
```bash
cd server
npm install
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
npm start
```

## 🧪 Sample Credentials

```
Email: admin@example.com
Password: password123
```

## 📬 API Endpoints

- `GET /api/exams` - List all exams
- `GET /api/questions/:examId` - Get questions for an exam
- `POST /api/submit` - Submit answers
- `GET /api/results/:id` - Get result for a submission


