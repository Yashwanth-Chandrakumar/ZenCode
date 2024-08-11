import React from 'react';

function ContestDetails({ contest }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Contest Details</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">{contest.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {contest.description}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Number of Problems: {contest.problems.length}</li>
        </ul>
      </div>
    </div>
  );
}

export default ContestDetails;