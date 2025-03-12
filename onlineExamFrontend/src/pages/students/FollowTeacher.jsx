import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { questionPaperContextData } from "../../context/QuestionPaperContext";

function FollowTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const myInstituteId = sessionStorage.getItem("myInstituteId");
  const studentId = sessionStorage.getItem("studentId");

  const { institute } = useContext(questionPaperContextData);
  useEffect(() => {
    axios
      .get("http://localhost:4040/institute/getAll")
      .then((response) => {
        if (response.status === 200) {
          setTeachers(response.data || []);
          if (institute) {
            setLoading(false);
          }
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!loading) {
      setContentVisible(true);
    }
  }, [loading]);

  const connectedInstituteIds = institute.map((i) => i.myInstituteId);

  const filteredTeachers = teachers.filter(
    (item) =>
      item.myInstituteId !== myInstituteId &&
      !connectedInstituteIds.includes(item.myInstituteId)
  );

  const handleConnectBar = async (Id) => {
    await axios
      .post(
        `http://localhost:4040/institute/addStudentToInstitute/${Id}/${studentId}`
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully added to the institute.");
        } else if (res.status === 400) {
          alert("You are already connected to this institute.");
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong while connecting.");
      });
  };

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-gray-50">
      {loading && <div className="loading-spinner"></div>}

      <div className={`page-content ${contentVisible ? "visible" : ""}`}>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Our Teachers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTeachers.map((item) => (
            <div
              key={item.myInstituteId}
              className="bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition-all max-w-xs w-full p-6"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600700292797-1f1b5db76eae"
                    alt={item.teacher?.name || "Teacher's Photo"}
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600 transform transition-all hover:scale-105"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.instituteName || "Unknown Institute"}
                  </h3>
                </div>
                <div
                  className="mt-4"
                  onClick={() => handleConnectBar(item.myInstituteId)}
                >
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all w-full">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowTeacher;
