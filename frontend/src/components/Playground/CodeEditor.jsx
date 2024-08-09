import React, { useState } from 'react'

function CodeEditor() {
  const [code, setCode] = useState('')

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Code Editor</h2>
      <textarea
        className="w-full h-64 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
      ></textarea>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Run Code
      </button>
    </div>
  )
}

export default CodeEditor