import React from 'react';
import { Link } from 'react-router-dom'; // To navigate to register page
import bgImage from '../assets/3227296_43533.jpg'; // Adjust path based on file location

function student_register() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Register</h2>
        <form>

          <input
            type="name"
            placeholder="Name "
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="emai l"
            placeholder="Email "
            className="w-full p-2 border rounded mb-4"
            required
          />

          <input
            type="password "
            placeholder="Password "
            className="w-full p-2 border rounded mb-4"
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>




        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          You have an an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default student_register;