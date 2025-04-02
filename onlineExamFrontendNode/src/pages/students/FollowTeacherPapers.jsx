import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { questionPaperContextData } from "../../context/QuestionPaperContext";
import { useNavigate } from "react-router-dom";

function FollowTeacherPapers() {
  const [questionPapers, setQuestionPapers] = useState([]);
  const { setQuestionPaperId } = useContext(questionPaperContextData);
  const instituteIdPaperId = sessionStorage.getItem("instituteIdPaperId");
  const navigate = useNavigate();
  // const backednUrl = "http://localhost:7777";
  const backednUrl = "https://online-exam-backendnode.vercel.app";

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      if (instituteIdPaperId != null) {
        try {
          const response = await axios.get(
            `${backednUrl}/teacher/questionPaperCreatedByTeacher/${instituteIdPaperId}`
          );
          console.log(response.data);

          setQuestionPapers(response.data.questionPapers);
        } catch (error) {
          console.error("Error fetching question papers:", error);
        }
      }
    };

    fetchQuestionPapers();
  }, [instituteIdPaperId]);

  const handleStart = (id) => {
    sessionStorage.setItem("questionPaperId", id);
    setQuestionPaperId(id);
    navigate("/examquestion");
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 text-center mb-12 animate-fade-in">
          Question Papers Gallery
        </h1>
        {(questionPapers || []) === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md animate-fade-in">
            <p className="text-lg text-indigo-700 font-medium">
              No question papers available yet.
            </p>
            <p className="text-sm text-indigo-500 mt-2">
              Create a new paper to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(questionPapers || []).map((paper, index) => (
              <div
                key={paper._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-2 flex flex-col opacity-0 animate-slide-up border border-indigo-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 flex-grow">
                  <h2 className="text-lg font-semibold text-indigo-900 mb-2 line-clamp-2 leading-tight">
                    {paper.title}
                  </h2>
                  <p className="text-sm font-medium text-indigo-700 mb-1">
                    {paper.subject}
                  </p>
                  <p className="text-xs text-indigo-500 mb-4 italic">
                    {paper.examTitle}
                  </p>
                  <div className="text-xs text-indigo-600 space-y-3">
                    <p className="flex justify-between items-center">
                      <span className="font-medium">Full Marks:</span>
                      <span className="bg-indigo-100 px-2 py-1 rounded-full text-indigo-800 font-semibold">
                        {paper.questions.length}
                      </span>
                    </p>
                    <p className="flex justify-between items-center">
                      <span className="font-medium">Duration:</span>
                      <span className="bg-indigo-100 px-2 py-1 rounded-full text-indigo-800 font-semibold">
                        {paper.examDuration} mins
                      </span>
                    </p>
                    <p className="flex justify-between items-center">
                      <span className="font-medium">Exam Type:</span>
                      <span className="bg-indigo-100 px-2 py-1 rounded-full text-indigo-800 font-semibold">
                        {paper.examType}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-indigo-100 border-t border-indigo-200">
                  <button
                    onClick={() => handleStart(paper._id)}
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105"
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default FollowTeacherPapers;
