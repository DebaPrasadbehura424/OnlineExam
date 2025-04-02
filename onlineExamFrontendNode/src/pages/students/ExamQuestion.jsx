import React, { useEffect, useState } from "react";
import axios from "axios";

function ExamQuestion() {
  const [questionsToShow, setQuestionsToShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(59);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [showInstructionPopup, setShowInstructionPopup] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  const questionPaperId = sessionStorage.getItem("questionPaperId");

  useEffect(() => {
    if (!questionPaperId) return;
    setLoading(true);
    axios
      .get(
        `https://online-exam-backendnode.vercel.app/questionPaper/showquestions/${questionPaperId}`
      )
      .then((res) => {
        if (res.status === 200) {
          setQuestionsToShow(res.data);
          setTimerMinutes(res.data.examDuration - 1 || 0);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [questionPaperId]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev === 0) {
            setTimerMinutes((prevMin) => prevMin - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (timerMinutes <= 0 && timerSeconds <= 0) {
      handleSubmit();
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  const handleAnswerChange = (questionId, optionLetter) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionLetter }));
  };

  const handleSubmit = () => {
    if (!questionsToShow || !questionsToShow.questions) return;
    setIsTimerRunning(false);

    let correctCount = 0;
    let wrongCount = 0;

    questionsToShow.questions.forEach((question) => {
      const userAnswer = answers[question._id];
      if (userAnswer) {
        if (userAnswer === question.correctAnswer) correctCount++;
        else wrongCount++;
      }
    });

    setCorrect(correctCount);
    setWrong(wrongCount);
    setIsExamFinished(true);
    setShowSubmitConfirmation(false);
    setShowResultCard(true);
  };

  const handleStartExam = () => {
    setShowInstructionPopup(false);
    setIsTimerRunning(true);
  };

  const handleCloseResultCard = () => {
    setShowResultCard(false);
  };

  if (loading || !questionsToShow) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {showInstructionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Exam Instructions
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>The timer starts once you begin the exam.</li>
              <li>Exam auto-submits when time runs out.</li>
              <li>Answer all questions carefully.</li>
              <li>Best of luck!</li>
            </ul>
            <button
              onClick={handleStartExam}
              className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Start Exam
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            {questionsToShow.subject || "Exam"}
          </h1>
          <div className="mt-2 sm:mt-0 flex items-center space-x-4">
            <span className={`text-lg font-medium ${"text-red-600"}`}>
              {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes} :{" "}
              {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              {isTimerRunning ? "⏸️" : "▶️"}
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 mb-6 space-y-1">
          <p>Institution: ABC University</p>
          <p>Duration: {questionsToShow.examDuration} mins</p>
        </div>

        <div className="space-y-6">
          {questionsToShow.questions.map((question, index) => (
            <div
              key={question._id}
              className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 animate-slideIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                {index + 1}. {question.questionText}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, idx) => {
                  const optionLetter = String.fromCharCode(65 + idx);
                  return (
                    <label
                      key={idx}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={optionLetter}
                        checked={answers[question._id] === optionLetter}
                        onChange={() =>
                          handleAnswerChange(question._id, optionLetter)
                        }
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">
                        {optionLetter}. {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setShowSubmitConfirmation(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {showSubmitConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Submission
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit your exam?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowSubmitConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showResultCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
              Results
            </h2>
            <div className="space-y-3 text-center">
              <p className="text-green-600 text-lg">Correct: {correct}</p>
              <p className="text-red-600 text-lg">Wrong: {wrong}</p>
              <p className="text-blue-600 text-lg">
                Missed: {questionsToShow.questions.length - (correct + wrong)}
              </p>
              <p className="text-gray-600">
                Score:{" "}
                {((correct / questionsToShow.questions.length) * 100).toFixed(
                  1
                )}
                %
              </p>
            </div>
            <button
              onClick={handleCloseResultCard}
              className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in;
          }
          .animate-slideIn {
            animation: slideIn 0.5s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default ExamQuestion;
