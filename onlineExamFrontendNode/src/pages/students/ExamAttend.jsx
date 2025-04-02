import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ExamAttend() {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    axios
      .get("https://online-exam-backendnode.vercel.app/questionPaper/getQuestionPaper")
      .then((res) => {
        setQuestionPapers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch papers.");
        setLoading(false);
      });
  }, []);

  const handleStart = (id) => {
    sessionStorage.setItem("questionPaperId", id);
    navigate("/examquestion");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fadeIn">
            Available Exams
          </h1>
          <p className="mt-2 text-gray-600">
            Select an exam to begin your test
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading exams...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg font-medium bg-red-50 p-4 rounded-lg inline-block">
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {questionPapers.map((paper, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4 truncate">
                  {paper.subject}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center text-sm">
                    <span className="mr-2">👩‍🏫</span> {paper.teacher.name}
                  </p>

                  <p className="flex items-center text-sm">
                    <span className="mr-2">⏱️</span> {paper.examDuration} mins
                  </p>
                  <p className="flex items-center text-sm">
                    <span className="mr-2">📝</span> {paper.examType}
                  </p>
                </div>
                <button
                  onClick={() => handleStart(paper._id)}
                  className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default ExamAttend;
