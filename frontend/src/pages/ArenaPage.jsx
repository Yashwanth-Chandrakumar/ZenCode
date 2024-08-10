import React from 'react'
import ProblemDetails from '../components/Arena/ProblemDetails'
import ProblemList from '../components/Arena/ProblemList'

function ArenaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Arena</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProblemList />
        <div className="lg:col-span-2">
          <ProblemDetails />
        </div>
      </div>
    </div>
  )
}

export default ArenaPage