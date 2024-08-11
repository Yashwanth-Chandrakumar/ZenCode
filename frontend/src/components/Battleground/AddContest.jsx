import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AddContest() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [problemIds, setProblemIds] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://54.209.231.217:8080/api/problems');
      setAllProblems(response.data);
    } catch (err) {
      console.error('Error fetching problems:', err);
      setError('Failed to fetch problems. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post('http://54.209.231.217:8080/api/contests', {
        name,
        description,
        problemIds
      });
      alert('Contest added successfully!');
      // Reset form
      setName('');
      setDescription('');
      setProblemIds([]);
    } catch (err) {
      console.error('Error adding contest:', err);
      setError('Failed to add contest. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProblem = (id) => {
    setProblemIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Contest</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contest Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Problems
            </label>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {allProblems.map((problem) => (
                <div key={problem.id} className="flex items-start space-x-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id={`problem-${problem.id}`}
                      checked={problemIds.includes(problem.id)}
                      onChange={() => toggleProblem(problem.id)}
                      className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    />
                    <div className={`border-2 rounded-md border-gray-400 w-5 h-5 flex justify-center items-center mr-2 ${
                      problemIds.includes(problem.id) ? 'bg-indigo-500 border-indigo-500' : ''
                    }`}>
                      <svg
                        className={`fill-current w-3 h-3 text-white pointer-events-none ${
                          problemIds.includes(problem.id) ? 'opacity-100' : 'opacity-0'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor={`problem-${problem.id}`} className="block text-sm text-gray-900 dark:text-gray-300 cursor-pointer">
                      <span className="font-semibold">{problem.title}</span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{problem.description}</p>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding Contest...' : 'Add Contest'}
          </button>
        </form>
      </div>
    </div>
  );
}