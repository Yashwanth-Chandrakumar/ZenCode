import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProblemsDetails from "../components/Arena/ProblemDetails";
import ProblemsList from "../components/Arena/ProblemList";
import ArenaEditor from "../components/ArenaEditor";

function ArenaPage() {
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
  };

  const scrollbarStyle = {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div 
        className="w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto" 
        style={scrollbarStyle}
      >
        <div className="flex justify-around items-center">
        <h2 className="text-black dark:text-white p-4 font-semibold">Problem List</h2>  
        <Link to="/addq"><button className=" px-4 py-2 text-white rounded bg-green-500 hover:bg-green-600">Add Problem</button></Link>
        </div>
        <ProblemsList onProblemSelect={handleProblemSelect} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          className="flex-1 overflow-y-auto" 
          style={scrollbarStyle}
        >
          <div className="overflow-y-auto" style={scrollbarStyle}>
            <ProblemsDetails problem={selectedProblem} />
          </div>
          <div className="overflow-y-auto" style={scrollbarStyle}>
            <ArenaEditor problem={selectedProblem} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArenaPage;