import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import bgImage from '/Users/pasindukavishka/Documents/Intern Assignment/frontend/src/assets/3227296_43533.jpg';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('⚠️ Fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        email,
        password,
      });

      if (response.data.token) {
        // You can optionally store the token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        setMessage('✅ Login successful!');
        setTimeout(() => navigate('/admin-home'), 1000);
      } else {
        setMessage('❌ Login failed');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setMessage('❌ Invalid email or password');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {message && (
          <div
            className={`text-sm text-center font-medium mb-3 ${
              message.includes('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;