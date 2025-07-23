import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3  text-white">
        {/* Logo */}
        <div className="text-2xl font-bold">
          OnlineMCQ
        </div>   
      </div>

    </nav>
  );
    
}

export default Navbar;