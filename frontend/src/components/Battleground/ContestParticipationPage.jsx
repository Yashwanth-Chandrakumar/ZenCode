import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProblemsDetails from '../Arena/ProblemDetails';
import ContestEditor from '../ContestEditor';
import QuestionList from './QuestionList';
import Timer from './Timer';

function ContestParticipationPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600); // Default to 1 hour
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await fetch(`http://54.209.231.217:8080/api/contests/${contestId}`);
        const data = await response.json();
        setContest(data);
        console.log(data)
        // Set time left if available in the API response
      } catch (error) {
        console.error("Error fetching contest:", error);
      }
    };
    fetchContest();
  }, [contestId]);

  const handleTimeUp = () => {
    submitContest();
  };
  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  const timeTakenInSeconds = 3600 - timeLeft; // Adjust if you have a different contest duration
const formattedTimeTaken = formatTime(timeTakenInSeconds);
const submitContest = async () => {
  if (isSubmitting) return; // Prevent multiple submissions
  setIsSubmitting(true);
  try {
    await fetch(`http://54.209.231.217:8080/api/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: localStorage.getItem("username"),
        contestId: contestId,
        email: localStorage.getItem("email"),
        hasParticipated: true,
        score,
        timeTaken: formattedTimeTaken,
      }),
    });
    navigate(`/battleground`);
  } catch (error) {
    console.error("Error submitting contest:", error);
    setIsSubmitting(false); // Re-enable the button if there's an error
  }
};

  const [questionScores, setQuestionScores] = useState({});

  const updateScore = (questionId, newScore) => {
    setQuestionScores(prevScores => {
      console.log(`Updating score for question ${questionId}: ${newScore}`);
      const updatedScores = {
        ...prevScores,
        [questionId]: newScore
      };
      
      // Calculate total score
      const totalScore = Object.values(updatedScores).reduce((a, b) => a + b, 0);
      setScore(totalScore);
      return updatedScores;
    });
  };
  if (!contest) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <QuestionList 
          questions={contest.problems} 
          onSelectQuestion={setSelectedQuestion}
        />
        <div className="bg-white dark:bg-gray-800 p-4">
        <button 
          onClick={submitContest}
          disabled={isSubmitting}
          className={`px-4 py-2 bg-green-500 text-white rounded-lg transition-colors ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-green-600'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Contest'}
        </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{contest.name}</h2>
          <div className="text-lg font-semibold">Total Score: {score}</div>
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={handleTimeUp} />
        </div>
        <div className="flex-1 overflow-auto">
          {selectedQuestion && (
            <>
            <ProblemsDetails problem={selectedQuestion}/>
            <ContestEditor 
              problem={selectedQuestion}
              contestId={contest.id}
              updateScore={(newScore) => updateScore(selectedQuestion.id, newScore)}
            />
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default ContestParticipationPage;