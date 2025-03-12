import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowPaperQuestion(props) {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(3);

  const questionPaperId = sessionStorage.getItem("questionPaperIdx");

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        const response = await axios.get(`http://localhost:4040/question-papers/questionPaper/${questionPaperId}`);
        setQuestionPaper(response.data);
      } catch (err) {
        setError("Failed to load question paper.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionPaper();
  }, [questionPaperId]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(questionPaper.questions.length / questionsPerPage)) {
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
  const currentQuestions = questionPaper?.questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  if (!questionPaper || !questionPaper.questions || questionPaper.questions.length === 0) {
    return <div className="text-center text-xl font-semibold">No questions available.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Header Section: Exam Details */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{questionPaper.examTitle}</h1>
          <div className="text-xl mb-2">{questionPaper.subject} Exam</div>
          <div className="text-md text-gray-600">Institution: {questionPaper.institution}</div>
          <div className="text-md text-gray-600">Duration: {questionPaper.examDuration} minutes</div>
          <div className="text-md text-gray-600">Full Marks: {questionPaper.fullMarks}</div>
        </div>

        {/* Instructions Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Instructions:</h2>
          <ul className="list-disc pl-6 text-md text-gray-600">
            <li>Choose the correct answer for each question (teacher-side view). Answers will be highlighted.</li>
            <li>Time is limited, manage it wisely.</li>
            <li>Ensure you have completed all the questions before submitting.</li>
          </ul>
        </div>

        {/* Questions Section */}
        <div>
          {currentQuestions.map((question, index) => (
            <div key={question.questionId} className="mb-6 border-b border-gray-300 pb-4">
              <div className="font-semibold text-lg mb-2">
                <span className="text-lg font-bold">Q{indexOfFirstQuestion + index + 1}.</span> {question.questionText}
              </div>

              <div className="ml-6 mb-4">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center mb-3">
                    <span className="text-md">{option}</span>
                  </div>
                ))}
              </div>

              {/* Display Correct Answer */}
              <div className="text-md text-green-600 font-semibold">
                <span className="font-semibold">Correct Answer:</span> {question.correctAnswer}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevPage}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="text-lg font-semibold text-gray-700">
            Page {currentPage} of {Math.ceil(questionPaper.questions.length / questionsPerPage)}
          </div>

          <button
            onClick={handleNextPage}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={currentPage === Math.ceil(questionPaper.questions.length / questionsPerPage)}
          >
            Next
          </button>
        </div>

        {/* Footer Section: Exam Paper Disclaimer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p><i>Note: This is a simulated exam paper. No actual grading is being performed here.</i></p>
        </div>
      </div>
    </div>
  );
}

export default ShowPaperQuestion;
