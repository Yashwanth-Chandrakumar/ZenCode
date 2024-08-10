import React from 'react';

function QuestionList({ questions, onSelectQuestion }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 ml-2">Contest Questions</h2>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li 
            key={question.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => onSelectQuestion(question)}
          >
            <h3 className="font-semibold">Question {index + 1}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {question.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;