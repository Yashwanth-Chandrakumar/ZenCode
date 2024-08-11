import React, { useState } from 'react';

export default function AddProblem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [testCases, setTestCases] = useState([{ testCase: '', answer: '' }]);

  const addTestCase = () => {
    setTestCases([...testCases, { testCase: '', answer: '' }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({ title, description, difficulty, testCases });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Add a New Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="difficulty">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold dark:text-white mb-2">Test Cases</h4>
            {testCases.map((testCase, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Test Case {index + 1}</label>
                <input
                  type="text"
                  value={testCase.testCase}
                  onChange={(e) => handleTestCaseChange(index, 'testCase', e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
                  placeholder="Input"
                />
                <input
                  type="text"
                  value={testCase.answer}
                  onChange={(e) => handleTestCaseChange(index, 'answer', e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Output"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTestCase}
              className="bg-blue-500 text-white py-2 px-4 rounded dark:bg-blue-700"
            >
              Add Test Case
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded dark:bg-green-700"
          >
            Submit Problem
          </button>
        </form>
      </div>
    </div>
  );
}
