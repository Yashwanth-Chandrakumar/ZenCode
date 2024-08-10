import React, { useState } from "react";
import ProblemsDetails from "../components/Arena/ProblemDetails";
import ProblemsList from "../components/Arena/ProblemList";

function ArenaPage() {
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        <h2 className="text-black dark:text-white p-4 font-semibold">Problem List</h2>
        <ProblemsList onProblemSelect={handleProblemSelect} />
      </div>

      <div className="flex-1">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 overflow-y-auto" style={{ height: 'calc(100vh - 64px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ProblemsDetails problem={selectedProblem} />
        </main>
      </div>
    </div>
  );
}

export default ArenaPage;