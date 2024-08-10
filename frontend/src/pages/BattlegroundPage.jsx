import React, { useState } from 'react';
import ContestDetails from '../components/Battleground/ContestDetails';
import ContestList from '../components/Battleground/ContestList';
import Leaderboard from '../components/Battleground/LeaderBoard';

function BattlegroundPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 top-4 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-black dark:text-white">Contest List</h2>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ContestList />
      </div>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ContestDetails />
        </main>
      
    </div>
  );
}

export default BattlegroundPage;
