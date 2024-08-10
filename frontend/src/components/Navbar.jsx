import React from 'react'
import { FaCode, FaFlagCheckered, FaTrophy } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  const activeClass = "border-b-2 border-blue-500";
  const linkClass = "flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white pb-1";

  return (
    <nav className="flex items-center justify-center space-x-4 sm:space-x-8 z-50">
      <NavLink 
        to="/playground" 
        className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
      >
        <FaCode className="text-xl sm:mr-2" />
        <span className="hidden sm:inline">Playground</span>
      </NavLink>
      <NavLink 
        to="/arena" 
        className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
      >
        <FaTrophy className="text-xl sm:mr-2" />
        <span className="hidden sm:inline">Arena</span>
      </NavLink>
      <NavLink 
        to="/battleground" 
        className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
      >
        <FaFlagCheckered className="text-xl sm:mr-2" />
        <span className="hidden sm:inline">Battleground</span>
      </NavLink>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        {darkMode ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </nav>
  )
}

export default Navbar