import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContestDetails from '../components/Battleground/ContestDetails';
import ContestList from '../components/Battleground/ContestList';
import Leaderboard from '../components/Battleground/Leaderboard';
import axios from 'axios';

const scrollbarStyle = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
};

function BattlegroundPage() {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://54.209.231.217:8080/api/contests');
        setContests(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setError("Failed to load contests. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchContests();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto" style={scrollbarStyle}>
        <ContestList 
          contests={contests} 
          onSelectContest={setSelectedContest}
          isLoading={isLoading}
        />
      </div>
      <div className="flex-1 overflow-y-auto" style={scrollbarStyle}>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {error && (
            <div className="text-center p-4 text-red-500 dark:text-red-400">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
          {selectedContest && (
            <>
              <ContestDetails contest={selectedContest} />
              <Link 
                to={`/contest/${selectedContest.id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Participate Now
              </Link>
              <Leaderboard contestId={selectedContest.id} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default BattlegroundPage;