import React, { useState } from "react";

function ProblemsList({ onProblemSelect }) {
  const [selectedProblem, setSelectedProblem] = useState(null);

  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard" },
    { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium" },
  ];

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
                problem.difficulty === "Easy"
                  ? "text-green-500"
                  : problem.difficulty === "Medium"
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




