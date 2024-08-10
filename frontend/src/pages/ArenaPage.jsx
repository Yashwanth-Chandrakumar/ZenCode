import React, { useState } from "react";
import ProblemsDetails from "../components/Arena/ProblemDetails";
import ProblemsList from "../components/Arena/ProblemList";
import ArenaEditor from "../components/ArenaEditor";

function ArenaPage() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {!isFullScreen && (
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
          <h2 className="text-black dark:text-white p-4 font-semibold">Problem List</h2>
          <ProblemsList onProblemSelect={handleProblemSelect} />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={toggleFullScreen}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ProblemsDetails problem={selectedProblem} />
          <ArenaEditor problem={selectedProblem} />
        </div>
      </div>
    </div>
  );
}

export default ArenaPage;
