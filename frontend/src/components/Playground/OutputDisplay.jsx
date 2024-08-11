import React from 'react'

function OutputDisplay() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Output</h2>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg h-64 overflow-y-auto">
        <pre className="text-gray-900 dark:text-gray-100">
          // Out
        </pre>
      </div>
    </div>
  )
}

export default OutputDisplay