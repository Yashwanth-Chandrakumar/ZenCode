import React, { useState } from "react";

function ProblemsDetails({ problem }) {
  const [code, setCode] = useState("");
  const [testCaseResult, setTestCaseResult] = useState("");

  if (!problem) {
    return <div className="dark:text-white">Select a problem to view details.</div>;
  }

  const runTestCase = () => {
    // Simulate running test case
    setTestCaseResult("Test case passed!");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 lg:col-span-1 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">{problem.title}</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-400 mb-4 break-words">
            Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
          </p>
          <h4 className="text-lg font-semibold mb-2">Example:</h4>
          <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 overflow-x-auto">
            <code>
              Input: nums = [2,7,11,15], target = 9
              Output: [0,1]
              Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
            </code>
          </pre>
          <h4 className="text-lg font-semibold mb-2">Constraints:</h4>
          <ul className="list-disc list-inside mb-4">
            <li>2 ≤ nums.length ≤ 10^4</li>
            <li>-10^9 ≤ nums[i] ≤ 10^9</li>
            <li>-10^9 ≤ target ≤ 10^9</li>
            <li>Only one valid answer exists.</li>
          </ul>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Start Coding
          </button>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-4">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Code Editor</h3>
          <textarea
            className="w-full h-64 p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          ></textarea>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Test Cases</h3>
          <button 
            onClick={runTestCase}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mb-2"
          >
            Run Test Case
          </button>
          <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <code className="dark:text-white">{testCaseResult || "Test case result will appear here"}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ProblemsDetails;