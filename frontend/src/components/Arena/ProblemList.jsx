import React from 'react'

function ProblemList() {
  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy' },
    { id: 2, title: 'Add Two Numbers', difficulty: 'Medium' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Problem List</h2>
      <ul className="space-y-2">
        {problems.map((problem) => (
          <li key={problem.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold">{problem.title}</h3>
            <span className={`text-sm ${
              problem.difficulty === 'Easy' ? 'text-green-500' :
              problem.difficulty === 'Medium' ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {problem.difficulty}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProblemList