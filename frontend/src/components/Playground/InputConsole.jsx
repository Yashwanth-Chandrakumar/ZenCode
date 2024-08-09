import React, { useState } from 'react'

function InputConsole() {
  const [input, setInput] = useState('')

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Input Console</h2>
      <textarea
        className="w-full h-32 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input here..."
      ></textarea>
    </div>
  )
}

export default InputConsole