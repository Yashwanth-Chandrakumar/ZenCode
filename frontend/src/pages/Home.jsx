import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

function Home() {
  const [code, setCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const codeLines = [
    'function calculateFactorial(n) {',
    '  if (n === 0 || n === 1) {',
    '    return 1;',
    '  }',
    '  return n * calculateFactorial(n - 1);',
    '}',
    '',
    'console.log(calculateFactorial(5));',
    'console.log(calculateFactorial(-1));  // Error!'
  ];

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setCode(prevCode => prevCode + codeLines[currentLine] + '\n');
        setCurrentLine(prevLine => prevLine + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (currentLine === codeLines.length) {
      const errorTimer = setTimeout(() => {
        setShowError(true);
      }, 2000);

      return () => clearTimeout(errorTimer);
    }
  }, [currentLine]);

  const handleSolveError = () => {
    setCode(prevCode => prevCode.replace(
      'console.log(calculateFactorial(-1));  // Error!',
      'if (n < 0) return "Error: n should be non-negative";'
    ));
    setShowError(false);
    setShowSolution(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="flex-grow p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Experience Coding with Zencode</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <pre className="text-green-400 font-mono whitespace-pre-wrap">
            {code}
          </pre>
        </div>

        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500 text-white p-4 rounded-lg mt-4 max-w-4xl mx-auto"
          >
            <p>Error: Factorial is not defined for negative numbers!</p>
            <button 
              onClick={handleSolveError}
              className="mt-2 bg-white text-red-500 px-4 py-2 rounded"
            >
              Solve Error
            </button>
          </motion.div>
        )}

        {showSolution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500 text-white p-4 rounded-lg mt-4 max-w-4xl mx-auto"
          >
            <p>Great job! You've successfully handled the error case.</p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;