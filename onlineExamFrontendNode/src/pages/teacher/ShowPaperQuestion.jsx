import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowPaperQuestion(props) {
  const [questionsWithPaper, setQuestionsWithPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 3;

  const questionPaperId = sessionStorage.getItem("questionPaperId");

  // const backednUrl = "http://localhost:7777";
  const backednUrl = "https://online-exam-backendnode.vercel.app";
  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        const response = await axios.get(
          `${backednUrl}/questionPaper/showquestions/${questionPaperId}`
        );
        setQuestionsWithPaper(response.data);
      } catch (err) {
        setError("Failed to load question paper.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionPaper();
  }, [questionPaperId]);

  const handleNextPage = () => {
    if (
      currentPage <
      Math.ceil(questionsWithPaper.questions.length / questionsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionsWithPaper?.questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  if (
    !questionsWithPaper ||
    !questionsWithPaper.questions ||
    questionsWithPaper.questions.length === 0
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          No questions available.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            {questionsWithPaper.examTitle}
          </h1>
          <p className="text-lg text-center">
            {questionsWithPaper.subject} Exam
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-center">
            <div>
              <span className="font-medium">Exam Type:</span>{" "}
              {questionsWithPaper.examType}
            </div>
            <div>
              <span className="font-medium">Duration:</span>{" "}
              {questionsWithPaper.examDuration} mins
            </div>
            <div>
              <span className="font-medium">Full Marks:</span>{" "}
              {questionsWithPaper?.questions.length}
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Instructions
          </h2>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
            <li>
              Choose the correct answer for each question (teacher-side view).
              Answers are highlighted.
            </li>
            <li>Time is limited, manage it wisely.</li>
            <li>Ensure all questions are reviewed before submission.</li>
          </ul>
        </div>

        {/* Questions Section */}
        <div className="p-6">
          {currentQuestions.map((question, index) => (
            <div
              key={question._id}
              className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start">
                <span className="text-lg font-bold text-blue-600 mr-2">
                  Q{indexOfFirstQuestion + index + 1}.
                </span>
                <p className="text-md text-gray-800 font-medium">
                  {question.questionText}
                </p>
              </div>
              <div className="mt-4 ml-6 space-y-3">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className="flex items-center text-gray-700 text-sm"
                  >
                    <span className="mr-2 text-gray-500">
                      {String.fromCharCode(97 + optIndex)}
                    </span>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 ml-6 text-sm">
                <span className="font-semibold text-gray-700">
                  Correct Answer:{" "}
                </span>
                <span className="text-green-600 font-medium">
                  {question.correctAnswer}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Previous</span>
          </button>

          <div className="text-sm font-medium text-gray-700">
            Page {currentPage} of{" "}
            {Math.ceil(questionsWithPaper?.questions.length / questionsPerPage)}
          </div>

          <button
            onClick={handleNextPage}
            disabled={
              currentPage ===
              Math.ceil(questionsWithPaper?.questions.length / questionsPerPage)
            }
            className="relative inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Next</span>
          </button>
        </div>

        {/* Footer Section */}
        <div className="p-4 bg-gray-50 text-center text-xs text-gray-500 border-t border-gray-200">
          <p>
            <i>
              Note: This is a simulated exam paper. No actual grading is being
              performed.
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowPaperQuestion;
