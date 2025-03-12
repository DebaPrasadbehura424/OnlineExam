import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionPaperContextData } from "../../context/QuestionPaperContext";

function ExamAttend() {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setQuestioonPaperId } = useContext(questionPaperContextData);

  useEffect(() => {
    setError(null);
    fetch("http://localhost:4040/question-papers/getallPapers")
      .then((response) => response.json())
      .then((data) => {
        setQuestionPapers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch papers.");
        setLoading(false);
      });
  }, []);

  const handleStart = (id) => {
    sessionStorage.setItem("questionPaperIdx", id);
    setQuestioonPaperId(id);
    navigate("/examquestion");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-[#181818]">
            Available Exams
          </p>
        </div>

        {loading && (
          <div className="text-center">
            <p className="text-gray-500 text-lg">Loading exams...</p>
          </div>
        )}
        {error && (
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {questionPapers.map((paper, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-2xl shadow-md overflow-hidden transform transition duration-300 border border-[#181818]"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#181818] text-center mb-3">
                  {paper.subject}
                </h3>
                <p className="text-sm text-[#181818] text-left mb-3">
                  Teacher: {paper.teacher.name}
                </p>
                <div className="text-left mb-4">
                  <p className="text-sm font-medium text-[#181818]">
                    Marks: {paper.fullMarks}
                  </p>
                  <p className="text-sm font-medium text-[#181818]">
                    Time: {paper.examDuration} mins
                  </p>
                  <p className="text-sm font-medium text-[#181818]">
                    Type: {paper.examType}
                  </p>
                </div>
                <button
                  onClick={() => handleStart(paper.questionPaperId)}
                  className="w-full px-4 py-2 bg-[#181818] text-white font-semibold rounded-md hover:bg-gray-200 hover:text-[#181818] border transition duration-300 text-sm"
                >
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamAttend;
