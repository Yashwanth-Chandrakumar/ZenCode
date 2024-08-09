import React from 'react'
import ContestList from '../components/Battleground/ContestList'
import ContestDetails from '../components/Battleground/ContestDetails'
import Leaderboard from '../components/Battleground/LeaderBoard'

function BattlegroundPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Battleground</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ContestList />
        <div className="lg:col-span-2">
          <ContestDetails />
          <Leaderboard />
        </div>
      </div>
    </div>
  )
}

export default BattlegroundPage