import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ParticipationModal({ contestId, onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch(`http://54.209.231.217:8080/api/leaderboard/hasParticipated?contestId=${contestId}&email=${email}`);
      const data = await response.json();
  
      if (data.hasParticipated) {
        setError('You have already participated in this contest.');
      } else {
        // Proceed to the contest
        navigate(`/contest/${contestId}`, { state: { username, email } });
      }
    } catch (error) {
      console.error("Error checking participation:", error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center dark:bg-gray-900 dark:bg-opacity-70">
      <div className="bg-white p-8 rounded-lg dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Participate in Contest</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2 dark:bg-gray-600 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-blue-600"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParticipationModal;
