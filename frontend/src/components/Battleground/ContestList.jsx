import React, { useState } from 'react';

const scrollbarStyle = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
};

function ContestList({ contests, onSelectContest, isLoading }) {
  const [selectedContestId, setSelectedContestId] = useState(null);

  const handleContestClick = (contest) => {
    setSelectedContestId(contest.id);
    onSelectContest(contest);
  };

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
      <ul className="space-y-2">
        {contests.map((contest) => (
          <li 
            key={contest.id} 
            className={`p-4 rounded-lg shadow cursor-pointer transition-colors duration-200 ${
              selectedContestId === contest.id
                ? "bg-blue-100 dark:bg-blue-900"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleContestClick(contest)}
          >
            <h3 className="font-semibold dark:text-white">{contest.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContestList;