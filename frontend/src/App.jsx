import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//navbar
Navbar 
import Navbar from './pages/components/navbar.jsx';



// Admin Pages
import AdminLogin from './pages/admin/admin_login.jsx';
import AdminDashboard from './pages/admin/admin_dashboard.jsx';
import AdminAddQuestion from './pages/admin/admin_addQuestion.jsx';
import admin_add_exam from './pages/admin/admin_add_exam.jsx';


// Student Pages
import StudentLogin from './pages/student_login.jsx';
import StudentRegister from './pages/student_register.jsx';
import ExamList from './pages/exam_list.jsx';
import AttemptExam from './pages/attemp_exam.jsx';
import ExamResults from './pages/exam_results.jsx';
import EditQuestion from './pages/admin/admin_editQuestion.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-question" element={<AdminAddQuestion />} />
        <Route path="/admin/add-exam" element={<admin_add_exam />} />
        <Route path="/admin/edit-question" element={<EditQuestion />} />


        {/* Student Routes */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/exams" element={<ExamList />} />
        <Route path="/student/attempt/:examId" element={<AttemptExam />} />
        <Route path="/student/results/:examId" element={<ExamResults />} />
      </Routes>
    </Router>
  );
}

export default App;