import axios from "axios";
import React, { useEffect, useState } from "react";

function EditQuestion() {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(Array(4).fill(""));
  const [correctAnswer, setCorrectAnswer] = useState("");
  const questionPaperId = sessionStorage.getItem("questionPaperId");

  // const backednUrl = "http://localhost:7777";
  const backednUrl = "https://online-exam-backendnode.vercel.app";

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        const { data } = await axios.get(
          `${backednUrl}/questionPaper/showquestions/${questionPaperId}`
        );

        setQuestionPaper(data);
      } catch (err) {
        console.error("Failed to load question paper:", err);
      } finally {
        setLoading(false);
      }
    };

    if (questionPaperId) fetchQuestionPaper();
  }, [questionPaperId]);

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleOptionChange = (index, value) =>
    setOptions((options) =>
      options.map((opt, i) => (i === index ? value : opt))
    );
  const handleCorrectAnswerChange = (e) =>
    setCorrectAnswer(e.target.value.toUpperCase());

  const handleAddQuestion = () => {
    if (
      !questionText.trim() ||
      options.some((opt) => !opt.trim()) ||
      !correctAnswer
    ) {
      alert("Please fill out all fields.");
      return;
    }
    setQuestions([...questions, { questionText, options, correctAnswer }]);
    setQuestionText("");
    setOptions(Array(4).fill(""));
    setCorrectAnswer("");
  };

  const handleSubmit = async () => {
    if (!questions.length) return alert("No questions to submit.");
    try {
      await axios.put(`${backednUrl}/questionPaper/questions`, {
        questionPaperId: questionPaperId,
        questions: questions,
      });
      setQuestionPaper((prev) => ({
        ...prev,
        questions: [...(prev?.questions || []), ...questions],
      }));
      alert("Questions saved successfully!");
      setQuestions([]);
    } catch (err) {
      console.error("Error submitting questions:", err);
      alert("Error submitting questions.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Question Paper...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Edit Question Paper
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage and add questions with ease
          </p>
        </header>

        {questionPaper?.questions?.length > 0 && (
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Existing Questions
            </h2>
            {questionPaper.questions.map((question, index) => (
              <div key={index} className="pb-6 border-b last:border-b-0">
                <div className="flex items-start">
                  <span className="text-xl font-bold text-indigo-600 mr-3">
                    Q{index + 1}.
                  </span>
                  <p className="text-lg text-gray-900">
                    {question.questionText}
                  </p>
                </div>
                <div className="mt-4 ml-8 grid sm:grid-cols-2 gap-3">
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
          </section>
        )}

        {questions.length > 0 && (
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              New Questions
            </h2>
            {questions.map((question, index) => (
              <div key={index} className="pb-6 border-b last:border-b-0">
                <div className="flex items-start">
                  <span className="text-xl font-bold text-indigo-600 mr-3">
                    Q{index + 1}.
                  </span>
                  <p className="text-lg text-gray-900">
                    {question.questionText}
                  </p>
                </div>
                <div className="mt-4 ml-8 grid sm:grid-cols-2 gap-3">
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
          </section>
        )}

        <section className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New Question
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
              </label>
              <textarea
                className="w-full p-4 border"
                rows="4"
                value={questionText}
                onChange={handleInputChange(setQuestionText)}
                placeholder="Enter your question here..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 font-semibold rounded-full">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <input
                      type="text"
                      className="w-full p-3 border"
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
                className="w-full p-4 border"
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
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg"
                disabled={
                  !questionText || options.some((opt) => !opt) || !correctAnswer
                }
              >
                Add Question
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-8 py-3 rounded-lg"
                disabled={!questions.length}
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
