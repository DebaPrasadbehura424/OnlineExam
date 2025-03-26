import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateExamPaper() {
  const [questionName, setQuestionName] = useState("");
  const [subject, setSubject] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const navigate = useNavigate();
  const teacherId = sessionStorage.getItem("teacherId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const examData = {
      questionName,
      subject,
      examDuration,
      examType: "MCQ",
      createrId: teacherId,
    };

    try {
      const response = await axios.post(
        "http://localhost:4040/question-papers/createQuestionPaper",
        examData
      );
      if (response.status === 200) {
        sessionStorage.setItem(
          "questionPaperIdx",
          response.data.questionPaperId
        );
        navigate("/create-question");
      }
    } catch (error) {
      console.error("Error creating exam paper", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Exam Paper
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Paper Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question Paper Name
            </label>
            <input
              type="text"
              value={questionName}
              onChange={(e) => setQuestionName(e.target.value)}
              placeholder="Enter the question paper name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100"
              required
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter the subject of the exam"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100"
              required
            />
          </div>

          {/* Exam Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Exam Type
            </label>
            <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
              MCQ
            </div>
          </div>

          {/* Exam Duration */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Exam Duration (in minutes)
            </label>
            <input
              type="number"
              value={examDuration}
              onChange={(e) => setExamDuration(e.target.value)}
              placeholder="Enter the exam duration"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100"
              min="1"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={!questionName || !subject || !examDuration}
            >
              Create Exam Paper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateExamPaper;
