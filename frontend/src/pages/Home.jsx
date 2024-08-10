import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

function Home() {
  const [code, setCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showError, setShowError] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

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

  const errorLine = 'console.log(calculateFactorial(-1));  // Error!';
  const correctedLine = 'if (n < 0) return "Error: n should be non-negative";';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isErasing && currentLine < codeLines.length) {
        setCode(prevCode => prevCode + codeLines[currentLine] + '\n');
        setCurrentLine(prevLine => prevLine + 1);
      } else if (currentLine === codeLines.length && !showError) {
        setShowError(true);
        setTimeout(() => {
          setIsErasing(true);
        }, 2000);
      } else if (isErasing) {
        if (code.includes(errorLine)) {
          setCode(prevCode => prevCode.slice(0, prevCode.lastIndexOf(errorLine)));
        } else {
          setIsErasing(false);
          setCode(prevCode => prevCode + correctedLine + '\n');
          setTimeout(() => {
            setCurrentLine(0);
            setCode('');
            setShowError(false);
          }, 3000);
        }
      }
    }, isErasing ? 50 : 1000);

    return () => clearTimeout(timer);
  }, [currentLine, showError, isErasing, code]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="flex-grow p-4">
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Welcome to Zencode</h1>
        
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Experience Real-Time Coding</h2>
            <div className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg h-96 overflow-auto">
              <pre className="text-green-400 font-mono whitespace-pre-wrap">
                {code}
              </pre>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-2">Why Choose Zencode?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Interactive coding environment</li>
                <li>Real-time feedback and error checking</li>
                <li>Wide range of programming challenges</li>
                <li>Community-driven learning experience</li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Code playground for experimenting</li>
                <li>Algorithmic challenges to test your skills</li>
                <li>Competitive coding arena</li>
                <li>Comprehensive learning resources</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;