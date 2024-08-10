import React from "react";

function ProblemsDetails({ problem }) {
  if (!problem) {
    return <div className="w-full p-4">Select a problem to see its details.</div>;
  }

  const { title, description, testCases } = problem;
  const testcases = testCases.slice(0, 2); // Display only the first two test cases

  return (
    <div className="w-full p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 break-words">
          {description}
        </p>
        {testcases && testcases.length > 0 && (
          <>
            <h4 className="text-lg font-semibold mb-2 dark:text-white">Example:</h4>
            {testcases.map((testcase, index) => (
              <pre
                key={index}
                className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 overflow-x-auto"
              >
                <code className="dark:text-white">
                  Input: {testcase.testCases}
                  <br />
                  Output: {testcase.answers}
                </code>
              </pre>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ProblemsDetails;
