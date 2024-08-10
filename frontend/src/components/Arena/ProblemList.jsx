import axios from "axios";
import React, { useEffect, useState } from "react";

function ProblemsList({ onProblemSelect }) {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://100.26.207.44:8080/api/problems");
        setProblems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setError("Failed to load problems. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleProblemClick = (problem) => {
    setSelectedProblem(problem.id);
    onProblemSelect(problem);
  };

  if (isLoading) {
    return (
      <div className="overflow-y-auto h-auto space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse p-4 rounded-lg shadow bg-gray-200 dark:bg-gray-700">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500 dark:text-red-400">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <ul className="space-y-2">
        {problems.map((problem) => (
          <li
            key={problem.id}
            className={`p-4 rounded-lg shadow cursor-pointer transition-colors duration-200 ${
              selectedProblem === problem.id
                ? "bg-blue-100 dark:bg-blue-900"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleProblemClick(problem)}
          >
            <h3 className="font-semibold dark:text-white">{problem.title}</h3>
            <span
              className={`text-sm ${
                problem.difficulty === "easy"
                  ? "text-green-500"
                  : problem.difficulty === "medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {problem.difficulty}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemsList;