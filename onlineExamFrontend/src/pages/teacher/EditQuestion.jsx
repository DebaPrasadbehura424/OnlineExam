import axios from "axios";
import React, { useEffect, useState } from "react";

function EditQuestion(props) {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const questionPaperId = sessionStorage.getItem("questionPaperIdx");

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/question-papers/questionPaper/${questionPaperId}`
        );
        setQuestionPaper(response.data);
      } catch (err) {
        console.error("Failed to load question paper:", err);
      } finally {
        setLoading(false);
      }
    };

    if (questionPaperId) fetchQuestionPaper();
  }, [questionPaperId]);

  const handleQuestionTextChange = (e) => setQuestionText(e.target.value);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (["A", "B", "C", "D", ""].includes(value)) {
      setCorrectAnswer(value);
    }
  };

  const handleAddQuestion = () => {
    if (!questionText.trim()) {
      alert("Question text cannot be empty.");
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      alert("All options must be filled.");
      return;
    }
    if (!correctAnswer) {
      alert("Please select a correct answer (A, B, C, or D).");
      return;
    }
    if (!questionPaperId) {
      alert(
        "Question Paper ID is missing. Please select a question paper first."
      );
      return;
    }

    const newQuestion = {
      questionText,
      options: [...options],
      correctAnswer,
      questionPaperId,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      alert("No questions to submit.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4040/questions/createQuestions",
        questions
      );
      const savedQuestions = response.data;
      setQuestionPaper((prev) => ({
        ...prev,
        questions: [...(prev?.questions || []), ...savedQuestions],
      }));

      alert("Questions saved successfully!");
      setQuestions([]);
    } catch (error) {
      console.error(
        "Error submitting questions:",
        error.response?.data || error.message
      );
      alert("Error submitting questions.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse flex items-center gap-2">
          <svg
            className="animate-spin h-6 w-6 text-indigo-600"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              opacity="0.2"
            />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
            />
          </svg>
          Loading Question Paper...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Edit Question Paper
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage and add questions with ease
          </p>
        </header>

        {/* Existing Questions */}
        {questionPaper?.questions?.length > 0 && (
          <section className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Existing Questions
            </h2>
            <div className="space-y-6">
              {questionPaper.questions.map((question, index) => (
                <div
                  key={question.questionId}
                  className="pb-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-start">
                    <span className="text-xl font-bold text-indigo-600 mr-3">
                      Q{index + 1}.
                    </span>
                    <p className="text-lg text-gray-900 leading-relaxed">
                      {question.questionText}
                    </p>
                  </div>
                  <div className="mt-4 ml-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="flex items-center text-gray-700"
                      >
                        <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 ml-8 text-sm font-medium">
                    <span className="text-gray-700">Correct Answer: </span>
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                      {question.correctAnswer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* New Added Questions */}
        {questions.length > 0 && (
          <section className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              New Questions
            </h2>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="pb-6 border-b border-gray-200 last:border-b-0 animate-fade-in"
                >
                  <div className="flex items-start">
                    <span className="text-xl font-bold text-indigo-600 mr-3">
                      Q{index + 1}.
                    </span>
                    <p className="text-lg text-gray-900 leading-relaxed">
                      {question.questionText}
                    </p>
                  </div>
                  <div className="mt-4 ml-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="flex items-center text-gray-700"
                      >
                        <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 ml-8 text-sm font-medium">
                    <span className="text-gray-700">Correct Answer: </span>
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                      {question.correctAnswer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Add New Question Form */}
        <section className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New Question
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
              </label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                rows="4"
                value={questionText}
                onChange={handleQuestionTextChange}
                placeholder="Enter your question here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 font-semibold rounded-full">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              <select
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                value={correctAnswer}
                onChange={handleCorrectAnswerChange}
              >
                <option value="">Select Correct Answer</option>
                {["A", "B", "C", "D"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center space-x-6">
              <button
                onClick={handleAddQuestion}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={
                  !questionText || options.some((opt) => !opt) || !correctAnswer
                }
              >
                Add Question
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={questions.length === 0}
              >
                Submit All Questions
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditQuestion;
