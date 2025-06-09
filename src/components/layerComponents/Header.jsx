// src/components/Header/Header.js
import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-40 lg:ml-64 transition-all duration-300 ease-in-out">
      <button
        onClick={toggleSidebar}
        className="text-gray-600 text-2xl lg:hidden focus:outline-none"
      >
        &#9776; {/* Hamburger icon */}
      </button>
      <div className="flex-grow text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome!</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* User profile, notifications, etc. */}
        <span className="text-gray-700">John Doe</span>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JD</div>
      </div>
    </header>
  );
};

export default Header;