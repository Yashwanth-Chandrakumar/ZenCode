import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ContestParticipationPage from './components/Battleground/ContestParticipationPage'
import Editor from './components/Editor'
import Header from './components/Header'
import ArenaPage from './pages/ArenaPage'
import BattlegroundPage from './pages/BattlegroundPage'
import Home from './pages/Home'
import PlaygroundPage from './pages/PlaygroundPage'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/arena" element={<ArenaPage />} />
            <Route path="/battleground" element={<BattlegroundPage />} />
            <Route path="/contest/:contestId" element={<ContestParticipationPage />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App