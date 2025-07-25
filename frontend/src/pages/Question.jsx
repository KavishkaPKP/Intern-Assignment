import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuestionPage() {
  const { id } = useParams(); // examId
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/exams/${id}/questions`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load questions');
        setLoading(false);
      });
  }, [id]);

  const handleOptionSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return alert('User not logged in');

    const payload = {
      user_id: userId,
      exam_id: id,
      answers: questions.map((q) => ({
        question_id: q._id,
        selected_option: answers[q._id] || ''
      }))
    };

    const res = await fetch('http://localhost:5000/api/results/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Exam submitted! Your score: ${data.score}/5`);
      navigate('/results');
    } else {
      alert(data.message || 'Submission failed');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Answer Questions</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {questions.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-gray-800 mb-4">
              Q{currentIndex + 1}. {questions[currentIndex].question_text}
            </h2>
            <div className="space-y-2">
              {questions[currentIndex].options.map((opt, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={questions[currentIndex]._id}
                    value={opt}
                    checked={answers[questions[currentIndex]._id] === opt}
                    onChange={() => handleOptionSelect(questions[currentIndex]._id, opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {questions.length > 0 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 disabled:opacity-50"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Submit Answers
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}