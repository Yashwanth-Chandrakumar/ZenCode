import React from 'react'
import CodeEditor from '../components/Playground/CodeEditor'
import OutputDisplay from '../components/Playground/OutputDisplay'
import InputConsole from '../components/Playground/InputConsole'

function PlaygroundPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Playground</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <CodeEditor />
          <InputConsole />
        </div>
        <OutputDisplay />
      </div>
    </div>
  )
}

export default PlaygroundPage