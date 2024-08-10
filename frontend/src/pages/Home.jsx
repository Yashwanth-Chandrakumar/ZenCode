import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaTrophy, FaFlagCheckered } from 'react-icons/fa';
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center font-dyslexic">Welcome to Zencode</h1>
        <p className="text-xl text-center mb-12 font-dyslexic">Elevate your coding skills with challenges, competitions, and a supportive community.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/playground" className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FaCode className="text-6xl mb-4 text-blue-500" />
            <h2 className="text-2xl font-semibold mb-2 font-dyslexic">Playground</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 font-dyslexic">Practice coding in a sandbox environment.</p>
          </Link>
          <Link to="/arena" className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FaTrophy className="text-6xl mb-4 text-yellow-500" />
            <h2 className="text-2xl font-semibold mb-2 font-dyslexic">Arena</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 font-dyslexic">Solve coding challenges and improve your skills.</p>
          </Link>
          <Link to="/battleground" className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FaFlagCheckered className="text-6xl mb-4 text-green-500" />
            <h2 className="text-2xl font-semibold mb-2 font-dyslexic">Battleground</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 font-dyslexic">Compete with others in coding contests.</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
