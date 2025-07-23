import React, { useState } from 'react';

function AdminAddQuestion() {
  const [examId, setExamId] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // Now 4 options
  const [correctOption, setCorrectOption] = useState('');
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Correct answer must match one of the 4 options
    if (!options.includes(correctOption)) {
      setMessage('Correct answer must match one of the options exactly.');
      return;
    }

    const questionData = {
      examId,
      question: questionText,
      options,
      correctAnswer: correctOption,
    };

    try {
      const res = await fetch("http://localhost:5000/api/admin/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Question added successfully!');
        setExamId('');
        setQuestionText('');
        setOptions(['', '', '', '']); // Reset 4 options
        setCorrectOption('');
      } else {
        setMessage(`Error: ${data.message || 'Failed to add question'}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">➕ Add New Question</h2>

        {message && (
          <div className="mb-4 p-2 text-sm text-center rounded bg-yellow-100 text-gray-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Exam ID"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            placeholder="Write the Question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />

          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          ))}

          <input
            type="text"
            placeholder="Correct Option (must match one of the above)"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddQuestion;