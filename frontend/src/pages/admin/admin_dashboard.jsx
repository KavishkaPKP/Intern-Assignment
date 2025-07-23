import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function admin_dashboard() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  // Load all questions
  useEffect(() => {
    fetch('http://localhost:5000/api/questions/sampleExamId') // Replace with real examId or change API to return all
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/delete-question/${id}`, {
        method: 'DELETE',
      });
      setQuestions(prev => prev.filter(q => q._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-question/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => navigate('/admin/add-question')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add New Question
        </button>
      </div>

      {/* Question Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Question</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length === 0 ? (
              <tr>
                <td className="px-4 py-2" colSpan="2">No questions available</td>
              </tr>
            ) : (
              questions.map((q) => (
                <tr key={q._id} className="border-t">
                  <td className="px-4 py-2">{q.questionText}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(q._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default admin_dashboard;