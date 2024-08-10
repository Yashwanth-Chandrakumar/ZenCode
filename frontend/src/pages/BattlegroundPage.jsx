import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContestDetails from '../components/Battleground/ContestDetails';
import ContestList from '../components/Battleground/ContestList';
import Leaderboard from '../components/Battleground/Leaderboard';

function BattlegroundPage() {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('http://100.26.207.44:8080/api/contests');
        const data = await response.json();
        setContests(data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <ContestList 
          contests={contests} 
          onSelectContest={setSelectedContest} 
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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