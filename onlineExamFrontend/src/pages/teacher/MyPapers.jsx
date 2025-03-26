import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LiaReadme, LiaTrashAlt, LiaEdit } from "react-icons/lia";
import { questionPaperContextData } from "../../context/QuestionPaperContext";
import { mypaperContextData } from "../../context/MypaperContext";

function MyPapers() {
  const navigate = useNavigate();
  const { setQuestionPaperId } = useContext(questionPaperContextData);
  const { questionPapers, setQuestionPapers, instituteIdPaper } =
    useContext(mypaperContextData);

  const handleStart = (id) => {
    sessionStorage.setItem("questionPaperIdx", id);
    setQuestionPaperId(id);
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
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          My Question Papers
        </h1>

        {questionPapers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No question papers available yet.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Create a new paper to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {questionPapers.map((paper) => (
              <div
                key={paper.questionPaperId}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col"
              >
                <div className="p-5 flex-grow">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {paper.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {paper.subject}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {paper.examTitle}
                  </p>
                  <div className="text-xs text-gray-600 space-y-2">
                    <p className="flex justify-between">
                      <span>Full Marks:</span>
                      <span className="font-medium">
                        {paper.questions.length}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">
                        {paper.examDuration} mins
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Exam Type:</span>
                      <span className="font-medium">{paper.examType}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  {instituteIdPaper ? (
                    <button
                      onClick={() => handleStart(paper.questionPaperId)}
                      className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Start Exam
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() =>
                          handleQuestionPaperId(paper.questionPaperId)
                        }
                        className="flex items-center justify-center flex-1 py-2 px-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-200 text-xs font-medium"
                      >
                        <LiaReadme className="mr-1 text-lg" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditPaper(paper.questionPaperId)}
                        className="p-2 text-blue-600 hover:text-blue-700 transition-all duration-200"
                        aria-label="Edit"
                      >
                        <LiaEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDeletePaper(paper.questionPaperId)}
                        className="p-2 text-red-600 hover:text-red-700 transition-all duration-200"
                        aria-label="Delete"
                      >
                        <LiaTrashAlt className="text-xl" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPapers;
