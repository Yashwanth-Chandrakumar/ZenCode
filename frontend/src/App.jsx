import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PlaygroundPage from './pages/PlaygroundPage'
import ArenaPage from './pages/ArenaPage'
import BattlegroundPage from './pages/BattlegroundPage'

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App