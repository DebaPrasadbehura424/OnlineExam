import React, { useEffect, useState, useContext } from "react";
import { questionPaperContextData } from "../../context/QuestionPaperContext";

function ExamQuestion() {
  const { questionsToShow, loading } = useContext(questionPaperContextData);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [timer, setTimer] = useState(
    questionsToShow ? questionsToShow.examDuration * 60 : 0
  );
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [showInstructionPopup, setShowInstructionPopup] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  useEffect(() => {
    if (!questionsToShow) return;

    let interval;

    if (!showInstructionPopup && isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            clearInterval(interval);
            handleSubmit();
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval); // Cleanup interval
    };
  }, [timer, isTimerRunning, showInstructionPopup, questionsToShow]);

  const handleAnswerChange = (questionId, index) => {
    const optionReal = String.fromCharCode(65 + index).toUpperCase();
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: optionReal }));
  };

  const handleSubmit = () => {
    questionsToShow.questions.forEach((question) => {
      const userAnswer = answers[question.questionId];
      if (userAnswer) {
        if (userAnswer === question.correctAnswer) {
          setCorrect((prev) => prev + 1);
        } else {
          setWrong((prev) => prev + 1);
        }
      }
    });

    setIsExamFinished(true);
    setShowSubmitConfirmation(false);
    setShowResultCard(true);
  };

  const handleCancel = () => {
    setShowSubmitConfirmation(false);
  };

  const handleTimerPause = () => {
    setIsTimerRunning(false);
  };

  const handleTimerResume = () => {
    setIsTimerRunning(true);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirmation(true);
  };

  const handleCloseInstructionPopup = () => {
    setShowInstructionPopup(false);
  };

  if (loading || !questionsToShow) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {showInstructionPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">Exam Instructions:</h2>
            <ul className="list-disc pl-6 text-md text-gray-600 mb-4">
              <li>Once the exam starts, the timer will begin automatically.</li>
              <li>
                If the time runs out, your exam will be submitted automatically.
              </li>
              <li>Manage your time wisely and complete all questions.</li>
              <li>Good luck!</li>
            </ul>
            <div className="flex justify-center">
              <button
                onClick={handleCloseInstructionPopup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          English Exam
        </h1>

        <div className="text-center mb-6">
          <div className="text-xl font-semibold">
            Institution: ABC University
          </div>
          <div className="text-md text-gray-600">
            Duration: {questionsToShow.examDuration} minutes
          </div>
          <div className="text-md text-gray-600">
            Full Marks: {questionsToShow.fullMarks}
          </div>
        </div>

        <div className="flex justify-center items-center mb-6">
          <div className="text-xl font-semibold text-red-600">
            Time Left: {formatTime(timer)}
          </div>
        </div>

        <div className="space-y-6">
          {questionsToShow.questions.map((question, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-300"
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-600">
                {currentPage * 10 + index + 1}. {question.questionText}
              </h3>

              <div className="space-y-2 mb-4">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="block text-sm font-medium text-gray-700"
                  >
                    <input
                      type="radio"
                      name={`question-${question.questionId}`}
                      value={option}
                      className="mr-2 rounded-full"
                      onChange={() =>
                        handleAnswerChange(question.questionId, index)
                      }
                    />
                    <span className="text-md">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>

        {showSubmitConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
                Are you sure you want to submit the exam?
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {showResultCard && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
                🎉 Congratulations! 🎉
              </h2>
              <div className="text-center mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  Your Results:
                </h3>
                <p className="text-md text-green-500">
                  Correct Answers: {correct}
                </p>
                <p className="text-md text-red-500">Wrong Answers: {wrong}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowResultCard(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamQuestion;
