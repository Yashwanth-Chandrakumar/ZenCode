import axios from "axios";
import React, { useEffect, useState } from "react";

function ProblemsList({ onProblemSelect }) {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://100.26.207.44:8080/api/problems"); // Replace with your backend endpoint
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    
    fetchProblems();
  }, []);


  const handleProblemClick = (problem) => {
    setSelectedProblem(problem.id);
    onProblemSelect(problem);
  };

  return (
    <div className="overflow-y-auto h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <ul className="space-y-2">
        {problems.map((problem) => (
          <li
            key={problem.id}
            className={`p-4 rounded-lg shadow cursor-pointer ${
              selectedProblem === problem.id
                ? "bg-blue-100 dark:bg-blue-900"
                : "bg-white dark:bg-gray-800"
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
