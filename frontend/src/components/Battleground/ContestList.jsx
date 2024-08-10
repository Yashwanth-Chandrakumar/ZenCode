import React from 'react';

function ContestList({ contests, onSelectContest }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 ml-2">Upcoming Contests</h2>
      <ul className="space-y-2">
        {contests.map((contest) => (
          <li 
            key={contest.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => onSelectContest(contest)}
          >
            <h3 className="font-semibold">{contest.name}</h3>
            {/* Add start time if available in your API response */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContestList;