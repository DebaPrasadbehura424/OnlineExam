import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaEdit, FaChartBar, FaUsers, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mypaperContextData } from "../../context/MypaperContext";
const DashboardOverView = () => {
  const navigate = useNavigate();
  const handleQuestionPaperId = (id) => {
    sessionStorage.setItem("questionPaperId", id);
    navigate("/showquestionpaper");
  };
  const { student, questionPapers, setQuestionPapers } =
    useContext(mypaperContextData);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your exams, track progress, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Exams Created
                </h3>
                <p className="text-2xl font-bold text-blue-900">
                  {(questionPapers || []).length > 0
                    ? questionPapers?.length
                    : 0}
                </p>
              </div>
              <FaChartBar className="text-blue-500 text-3xl" />
            </div>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  Total Students
                </h3>
                <p className="text-2xl font-bold text-green-900">
                  {(student || []).length > 0 ? student.length : 0}
                </p>
              </div>
              <FaUsers className="text-green-500 text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Exams....
            </h2>
          </div>
          {(questionPapers || []).length ? (
            <div className="space-y-4">
              {questionPapers.slice(0, 5).map((paper) => (
                <div
                  key={paper._id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base tracking-tight">
                      {paper.subject || "Untitled Exam"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      {paper.examType || "No type"},{" "}
                      <span className="font-semibold">
                        {paper.examDuration} min
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleQuestionPaperId(paper._id)}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    title="View Exam"
                  >
                    <FaEye className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 font-medium">
              No exams created yet. Start by creating one!
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <button
                className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                onClick={() => navigate("/create-paper")}
              >
                <FaPlus className="mr-2" /> Create New Exam
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300"
                onClick={() => alert("Now this service is not allowed")}
              >
                <FaEdit className="mr-2" /> Student Follow
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Dashboard Tips
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Use the "Create New Exam" button to start building a question
                paper.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Monitor student progress by checking the "Total Students" stats.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverView;
