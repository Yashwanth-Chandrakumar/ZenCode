import React from 'react'

function Leaderboard() {
  const leaderboard = [
    { rank: 1, username: 'codemaster', score: 400 },
    { rank: 2, username: 'algorithmwhiz', score: 380 },
    { rank: 3, username: 'pythonista', score: 360 },
    { rank: 4, username: 'javascriptpro', score: 340 },
    { rank: 5, username: 'cplusplus_guru', score: 320 },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.rank} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{entry.rank}</td>
                <td className="px-4 py-2">{entry.username}</td>
                <td className="px-4 py-2">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard