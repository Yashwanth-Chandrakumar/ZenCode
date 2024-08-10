import React from "react";

function ContestDetails() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Contest Details</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Weekly Contest 287</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Join our weekly coding contest and compete with programmers from
          around the world!
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Start Time: 2024-08-10 14:00 UTC</li>
          <li>Duration: 1 hour 30 minutes</li>
          <li>Number of Problemss: 4</li>
        </ul>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Register for Contest
        </button>
      </div>
    </div>
  );
}

export default ContestDetails;
