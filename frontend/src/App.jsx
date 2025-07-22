import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Admin Pages
import AdminLogin from './pages/admin/admin_login.jsx';
import AdminDashboard from './pages/admin/admin_dashboard.jsx';
import AdminAddQuestion from './pages/admin/admin_addQuestion.jsx';

// Student Pages
import StudentLogin from './pages/components/student_login.jsx';
import StudentRegister from './pages/components/student_register.jsx';
import ExamList from './pages/components/exam_list.jsx';
import AttemptExam from './pages/components/attemp_exam.jsx';
import ExamResults from './pages/components/exam_results.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-question" element={<AdminAddQuestion />} />

        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/exams" element={<ExamList />} />
        <Route path="/student/attempt/:examId" element={<AttemptExam />} />
        <Route path="/student/results/:examId" element={<ExamResults />} />
      </Routes>
    </Router>
  );
}

export default App;