import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/results/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load results');
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Results</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {results.length === 0 && !loading && (
          <p className="text-center text-gray-600">No results found.</p>
        )}

        <div className="space-y-6">
          {results.map((r, index) => (
            <div key={r._id} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {r.exam_id?.title || `Exam ${index + 1}`}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Score:</strong> {r.score}/5
              </p>
              <p className="text-sm text-gray-500">
                <strong>Submitted on:</strong> {new Date(r.timestamp).toLocaleString()}
              </p>
            </div>
          ))}


        </div>
                <div className="text-center mt-8">
          <button
            onClick={() => navigate('*')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Back to Exams
          </button>
        </div>
      </div>
    </div>
  );
}