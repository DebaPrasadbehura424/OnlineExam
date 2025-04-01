import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LiaReadme, LiaTrashAlt, LiaEdit } from "react-icons/lia";
import { mypaperContextData } from "../../context/MypaperContext";

function MyPapers() {
  const { questionPapers, setQuestionPapers, instituteIdPaperId } =
    useContext(mypaperContextData);

  const navigate = useNavigate();
  //during student it is  show
  const handleStart = (id) => {
    sessionStorage.setItem("questionPaperId", id);
    navigate("/examquestion");
  };

  //during teacher it is  show
  const handleQuestionPaperId = (id) => {
    sessionStorage.setItem("questionPaperId", id);
    navigate("/showquestionpaper");
  };

  const handleDeletePaper = async (id) => {
    try {
      await axios.delete(` http://localhost:7777/questionPaper/delete/${id}`);
      setQuestionPapers(questionPapers.filter((paper) => paper._id !== id));
    } catch (error) {
      console.error("Error deleting question paper:", error);
    }
  };

  const handleEditPaper = (id) => {
    sessionStorage.setItem("questionPaperIdx", id);
    navigate("/editquestionpaper");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          My Question Papers
        </h1>

        {(questionPapers || []).length == 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-xl shadow-sm">
            <p className="text-base sm:text-lg text-gray-600">
              No question papers available yet.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Create a new paper to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {questionPapers.map((paper, index) => (
              <div
                key={paper._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col"
              >
                <div className="p-4 sm:p-5 flex-grow">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {paper.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {paper.subject}
                  </p>
                  <p className="text-xs text-gray-500 mb-3 sm:mb-4 truncate">
                    {paper.examTitle}
                  </p>
                  <div className="text-xs text-gray-600 space-y-1 sm:space-y-2">
                    <p className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">
                        {paper.examDuration} mins
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Exam Type:</span>
                      <span className="font-medium truncate">
                        {paper.examType}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
                  {instituteIdPaperId ? (
                    <button
                      onClick={() => handleStart(paper._id)}
                      className="w-full py-2 px-3 sm:px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Start Exam
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-1 sm:gap-2">
                      <button
                        onClick={() => handleQuestionPaperId(paper._id)}
                        className="flex items-center justify-center flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-200 text-xs font-medium truncate"
                      >
                        <LiaReadme className="mr-1 text-base sm:text-lg shrink-0" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditPaper(paper._id)}
                        className="p-1.5 sm:p-2 text-blue-600 hover:text-blue-700 transition-all duration-200"
                        aria-label="Edit"
                      >
                        <LiaEdit className="text-lg sm:text-xl" />
                      </button>
                      <button
                        onClick={() => handleDeletePaper(paper._id)}
                        className="p-1.5 sm:p-2 text-red-600 hover:text-red-700 transition-all duration-200 cursor-pointer"
                        aria-label="Delete"
                      >
                        <LiaTrashAlt className="text-lg sm:text-xl" />
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
