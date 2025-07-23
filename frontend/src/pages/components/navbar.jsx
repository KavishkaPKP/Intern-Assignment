import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="text-2xl font-bold">
          OnlineMCQ
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-yellow-300 transition">Home</a>
          <a href="#" className="hover:text-yellow-300 transition">Exams</a>
          <a href="#" className="hover:text-yellow-300 transition">Login</a>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-blue-600 space-y-2 text-white">
          <a href="#" className="block hover:text-yellow-300">Home</a>
          <a href="#" className="block hover:text-yellow-300">Exams</a>
          <a href="#" className="block hover:text-yellow-300">Login</a>
        </div>
      )}
    </nav>
  );
    
}

export default Navbar;