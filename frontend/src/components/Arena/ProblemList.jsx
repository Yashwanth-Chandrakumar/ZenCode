import React from "react";

function ProblemsList() {
  const Problemss = [
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium" },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Problems List</h2>
      <ul className="space-y-2">
        {Problemss.map((Problems) => (
          <li
            key={Problems.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <h3 className="font-semibold">{Problems.title}</h3>
            <span
              className={`text-sm ${
                Problems.difficulty === "Easy"
                  ? "text-green-500"
                  : Problems.difficulty === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {Problems.difficulty}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemsList;
