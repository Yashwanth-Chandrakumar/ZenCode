import React from 'react';
import ContestDetails from '../components/Battleground/ContestDetails';
import ContestList from '../components/Battleground/ContestList';

function BattlegroundPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">

        <div className="flex items-center justify-between p-3"></div>
        <ContestList />
      </div>
      <div className="flex-1">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ContestDetails />
        </main>
      </div>
    </div>
  );
}

export default BattlegroundPage;
