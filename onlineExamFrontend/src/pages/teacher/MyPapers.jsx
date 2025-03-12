import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LiaReadme, LiaTrashAlt, LiaEdit } from "react-icons/lia";
import { questionPaperContextData } from "../../context/QuestionPaperContext";

function MyPapers() {
  const [questionPapers, setQuestionPapers] = useState([]);
  const teacherId = sessionStorage.getItem("teacherId");
  const instituteIdPaper = sessionStorage.getItem("instituteIdPaper");
  const { setQuestioonPaperId } = useContext(questionPaperContextData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/question-papers/teacher/${
            teacherId || instituteIdPaper
          }`
        );
        setQuestionPapers(response.data);
      } catch (error) {
        console.error("Error fetching question papers:", error);
      }
    };

    fetchQuestionPapers();
  }, [teacherId]);

  const handleStart = (id) => {
    sessionStorage.setItem("questionPaperIdx", id);
    setQuestioonPaperId(id);
    navigate("/examquestion");
  };

  const handleQuestionPaperId = (id) => {
    sessionStorage.setItem("questionPaperIdx", id);
    navigate("/showquestionpaper");
  };

  const handleDeletePaper = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4040/question-papers/questionPaper/${id}`
      );
      setQuestionPapers(
        questionPapers.filter((paper) => paper.questionPaperId !== id)
      );
    } catch (error) {
      console.error("Error deleting question paper:", error);
    }
  };

  const handleEditPaper = (id) => {
    sessionStorage.setItem("questionPaperIdx", id);
    navigate(`/editquestionpaper/${id}`);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {questionPapers.length === 0 ? (
          <p className="text-center text-lg text-gray-600 opacity-70">
            No question papers available.
          </p>
        ) : (
          questionPapers.map((paper) => (
            <div
              key={paper.questionPaperId}
              className="bg-white text-[#181818] p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out"
              style={{
                height: "auto",
              }}
            >
              <h2 className="text-md font-semibold mb-1 text-gray-800 line-clamp-2">
                {paper.title}
              </h2>
              <p className="text-sm font-semibold text-gray-700">
                {paper.subject}
              </p>
              <p className="text-xs text-gray-600 mb-2">{paper.examTitle}</p>
              <div className="text-xs text-gray-700 space-y-1">
                <p>Full Marks: {paper.questions.length}</p>
                <p>Duration: {paper.examDuration} mins</p>
                <p>Exam Type: {paper.examType}</p>
              </div>
              {instituteIdPaper && (
                <button
                  onClick={() => handleStart(paper.questionPaperId)}
                  className="w-full px-4 py-2 bg-[#181818] text-white font-semibold rounded-md hover:bg-gray-200 hover:text-[#181818] border transition duration-300 text-sm"
                >
                  Start Exam
                </button>
              )}
              {!instituteIdPaper && (
                <div className="mt-4 flex flex-wrap justify-between items-center space-x-2">
                  <button
                    onClick={() => handleQuestionPaperId(paper.questionPaperId)}
                    className="bg-gray-800 text-white px-4 py-1 rounded-md text-xs font-medium hover:bg-gray-900 transition"
                  >
                    <LiaReadme className="inline-block mr-2" />
                    View
                  </button>
                  <button
                    onClick={() => handleEditPaper(paper.questionPaperId)}
                    className="text-blue-600 text-lg cursor-pointer hover:text-blue-700 transition"
                  >
                    <LiaEdit className="inline-block mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePaper(paper.questionPaperId)}
                    className="text-red-600 text-lg cursor-pointer hover:text-red-700 transition"
                  >
                    <LiaTrashAlt className="inline-block" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyPapers;
