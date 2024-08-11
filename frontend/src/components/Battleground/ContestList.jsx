import React from 'react';

const scrollbarStyle = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
};

function ContestList({ contests, onSelectContest, isLoading }) {
  if (isLoading) {
    return (
      <div className="overflow-y-auto h-auto space-y-2" style={scrollbarStyle}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse p-4 rounded-lg shadow bg-gray-200 dark:bg-gray-700">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={scrollbarStyle}>
      <h2 className="text-2xl font-semibold mb-4 ml-2">Upcoming Contests</h2>
      <ul className="space-y-2">
        {contests.map((contest) => (
          <li 
            key={contest.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => onSelectContest(contest)}
          >
            <h3 className="font-semibold">{contest.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContestList;