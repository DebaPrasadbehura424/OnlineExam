import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardOverView = () => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const teacherId = sessionStorage.getItem("teacherId");

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/question-papers/teacher/${teacherId}`
        );
        setQuestionPapers(response.data);
      } catch (error) {
        console.error("Error fetching question papers:", error);
      }
    };

    fetchQuestionPapers();
  }, [teacherId]);

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold">Exams Created</h3>
            <p>{questionPapers.length > 0 ? questionPapers.length : 0} Exams</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Students</h3>
            <p>120 Students</p>
          </div>
        </>
      </div>
    </div>
  );
};

export default DashboardOverView;
