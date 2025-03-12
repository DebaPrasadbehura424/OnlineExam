import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateExamPaper(props) {
  const [step, setStep] = useState(1);
  const [questionName, setQuestionName] = useState("");
  const [subject, setSubject] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const navigate = useNavigate();

  const teacherId = sessionStorage.getItem("teacherId");

  const handleSubmit = async () => {
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
      if (response.status == 200) {
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 space-y-8">
      <h1 className="text-4xl font-semibold text-center text-gray-800">
        Create Exam Paper
      </h1>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Step 1: Basic Exam Information
          </h2>

          <div className="hover:shadow-xl transition duration-300 p-6 bg-gray-100 rounded-lg cursor-pointer">
            <label className="block text-lg font-medium text-gray-700">
              Question Paper Name
            </label>
            <input
              type="text"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={questionName}
              onChange={(e) => setQuestionName(e.target.value)}
              placeholder="Enter the question paper name"
            />
          </div>

          <div className="hover:shadow-xl transition duration-300 p-6 bg-gray-100 rounded-lg cursor-pointer">
            <label className="block text-lg font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter the subject of the exam"
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              disabled={!questionName || !subject}
            >
              Next: Set Exam Type & Details
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Step 2: Set Exam Type & Details
          </h2>

          <div className="hover:shadow-xl transition duration-300 p-6 bg-gray-100 rounded-lg cursor-pointer">
            <label
              htmlFor="examType"
              className="block text-lg font-medium text-gray-700"
            >
              Exam Type
            </label>
            <p>MCQ</p>
          </div>

          <div className="hover:shadow-xl transition duration-300 p-6 bg-gray-100 rounded-lg cursor-pointer">
            <label
              htmlFor="examDuration"
              className="block text-lg font-medium text-gray-700"
            >
              Exam Duration (in minutes)
            </label>
            <input
              type="number"
              id="examDuration"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={examDuration}
              onChange={(e) => setExamDuration(e.target.value)}
              placeholder="Enter the exam duration"
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Create Exam Paper
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateExamPaper;
