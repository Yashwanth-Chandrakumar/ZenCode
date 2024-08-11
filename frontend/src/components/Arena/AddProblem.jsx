import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProblem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [testCases, setTestCases] = useState([{ testcases: '', answers: '' }, { testcases: '', answers: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (testCases.length < 2) {
      setTestCases([...testCases, { testcases: '', answers: '' }]);
    }
  }, [testCases]);

  const addTestCase = () => {
    setTestCases([...testCases, { testcases: '', answers: '' }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://54.209.231.217:8080/api/problems", {
        title, description, difficulty, testCases
      });
      
      if (response.status === 200) {
        navigate('/arena'); 
      } else {
        console.log('Failed to submit the problem');
      }
    } catch (error) {
      console.error('Error submitting the problem:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault(); // Prevent form submission on Enter key press outside of textarea
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Add a New Problem</h2>
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
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
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold dark:text-white mb-2">Test Cases</h4>
            {testCases.map((testCase, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Test Case {index + 1}</label>
                <textarea
                  value={testCase.testcases}
                  onChange={(e) => handleTestCaseChange(index, 'testcases', e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
                  placeholder="Input"
                  required
                />
                <textarea
                  value={testCase.answers}
                  onChange={(e) => handleTestCaseChange(index, 'answers', e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Output"
                  required
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
            disabled={isSubmitting} // Disable the button when submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit Problem'}
          </button>
        </form>
      </div>
    </div>
  );
}
