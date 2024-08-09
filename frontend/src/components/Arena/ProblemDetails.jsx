import React from 'react'

function ProblemDetails() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 font-dyslexic">Problem Details</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2 font-dyslexic">Two Sum</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 font-dyslexic break-words">
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        </p>
        <h4 className="text-lg font-semibold mb-2 font-dyslexic">Example:</h4>
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 overflow-x-auto">
          <code className="font-dyslexic">
            Input: nums = [2,7,11,15], target = 9
            Output: [0,1]
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
          </code>
        </pre>
        <h4 className="text-lg font-semibold mb-2 font-dyslexic">Constraints:</h4>
        <ul className="list-disc list-inside mb-4 font-dyslexic">
          <li>2 ≤ nums.length ≤ 10^4</li>
          <li>-10^9 ≤ nums[i] ≤ 10^9</li>
          <li>-10^9 ≤ target ≤ 10^9</li>
          <li>Only one valid answer exists.</li>
        </ul>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-dyslexic">
          Submit Solution
        </button>
      </div>
    </div>
  )
}

export default ProblemDetails