import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-center">
      <header className="bg-blue-500 text-white p-6">
        <h1 className="text-3xl font-bold">Welcome to Tailwind CSS in React!</h1>
      </header>
      <p className="text-gray-700 mt-4">
        This is a simple example of a React app styled with Tailwind CSS.
      </p>
    </div>
    </>
  )
}

export default App
