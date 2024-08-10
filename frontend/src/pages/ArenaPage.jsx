import React from "react";
import ProblemsList from "../components/Arena/ProblemsList";
import ProblemsDetails from "../components/Arena/ProblemsDetails";

function ArenaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Arena</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProblemsList />
        <div className="lg:col-span-2">
          <ProblemsDetails />
        </div>
      </div>
    </div>
  );
}

export default ArenaPage;
