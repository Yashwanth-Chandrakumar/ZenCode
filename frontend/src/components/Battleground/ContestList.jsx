import React from 'react'

function ContestList() {
  const contests = [
    { id: 1, title: 'Weekly Contest 287', startTime: '2024-08-10 14:00 UTC' },
    { id: 2, title: 'Biweekly Contest 80', startTime: '2024-08-17 14:00 UTC' },
    { id: 3, title: 'Weekly Contest 288', startTime: '2024-08-24 14:00 UTC' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 ml-2">Upcoming Contests</h2>
      <ul className="space-y-2">
        {contests.map((contest) => (
          <li key={contest.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold">{contest.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Starts: {contest.startTime}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContestList