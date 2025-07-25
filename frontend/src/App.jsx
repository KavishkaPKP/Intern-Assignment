import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ExamList from './pages/ExamList.jsx';
import QuestionPage from './pages/Question.jsx';
import ResultPage from './pages/ResultView.jsx';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {isLoggedIn ? (
          <>
            <Route path="/exams" element={<ExamList />} />
            <Route path="/exam/:id" element={<QuestionPage />} />
            <Route path="/results" element={<ResultPage />} />
                       
           <Route path="*" element={<Navigate to="/exams" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;