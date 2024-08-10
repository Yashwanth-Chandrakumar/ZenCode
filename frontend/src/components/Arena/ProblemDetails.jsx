import React from "react";

function ProblemsDetails({ problem }) {
  if (!problem) {
    return null;
  }

  return (
    <div className="w-full p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">{problem.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 break-words">
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        </p>
        <h4 className="text-lg font-semibold mb-2 dark:text-white">Example:</h4>
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 overflow-x-auto">
          <code className="dark:text-white">
            Input: nums = [2,7,11,15], target = 9
            Output: [0,1]
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
          </code>
        </pre>
        <h4 className="text-lg font-semibold mb-2 dark:text-white">Constraints:</h4>
        <ul className="list-disc list-inside mb-4 dark:text-white">
          <li>2 ≤ nums.length ≤ 10^4</li>
          <li>-10^9 ≤ nums[i] ≤ 10^9</li>
          <li>-10^9 ≤ target ≤ 10^9</li>
          <li>Only one valid answer exists.</li>
        </ul>
      </div>
    </div>
  );
}

export default ProblemsDetails;