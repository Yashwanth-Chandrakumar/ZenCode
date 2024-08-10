import React, { useState } from "react";
import ProblemsDetails from "../components/Arena/ProblemDetails";
import ProblemsList from "../components/Arena/ProblemList";
import ArenaEditor from "../components/ArenaEditor";

function ArenaPage() {
  const [selectedProblem, setSelectedProblem] = useState(null);


  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
  };


  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
      <div className={`w-64 bg-white dark:bg-gray-800 shadow-lg overflow-hidden`}>
        <h2 className="text-black dark:text-white p-4 font-semibold">Problem List</h2>
        <ProblemsList onProblemSelect={handleProblemSelect} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ProblemsDetails problem={selectedProblem} />
          <ArenaEditor problem={selectedProblem} />
        </div>
      </div>
    </div>
  );
}

export default ArenaPage;
