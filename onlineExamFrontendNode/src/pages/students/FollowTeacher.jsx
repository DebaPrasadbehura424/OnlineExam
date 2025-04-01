import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { questionPaperContextData } from "../../context/QuestionPaperContext";

function FollowTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { institute, setInstitute } = useContext(questionPaperContextData);
  const myInstituteId = sessionStorage.getItem("myInstituteId");
  const studentId = sessionStorage.getItem("studentId");

  //done properly
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7777/institute/showMyInsituteAll"
        );
        if (response.status === 200) {
          setTeachers(response.data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
        setError("Failed to load teachers. Please try again later.");
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const connectedInstituteIds = institute.map((i) => i._id);
  const filteredTeachers = teachers.filter(
    (item) =>
      item._id !== myInstituteId && !connectedInstituteIds.includes(item._id)
  );

  const handleConnectBar = async (instituteId) => {
    const updatedTeachers = teachers.filter((t) => t._id !== instituteId);
    setTeachers(updatedTeachers);
    try {
      const response = await axios.post(
        `http://localhost:7777/institute/addstudent`,
        {
          instituteId,
          studentId,
        }
      );
      if (response.status === 200) {
        setInstitute((prev) => [...prev, response.data]);
        alert("Successfully connected to the institute!");
      }
    } catch (err) {
      setTeachers(teachers);
      if (err.response?.status === 400) {
        alert("You are already connected to this institute.");
      } else {
        console.error("Connection error:", err);
        alert("Failed to connect. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 animate-fade-in">
          Explore & Connect with Teachers
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
              <div
                className="absolute inset-0 animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 opacity-50"
                style={{ animationDuration: "1.5s" }}
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-100 p-6 rounded-xl shadow-lg mb-8 animate-slide-up">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 opacity-0 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6 flex flex-col items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative mb-6 z-10">
                      <div className="relative w-24 h-24 group">
                        <img
                          src="https://www.pix-star.com/blog/wp-content/uploads/2021/05/digital-photo-frames.jpg"
                          alt={item.teacher?.name || "Teacher"}
                          className="w-full h-full rounded-full object-cover border-4 border-indigo-500 group-hover:border-purple-500 transition-all duration-300 transform group-hover:scale-110 shadow-md"
                          onError={(e) =>
                            (e.target.src = "/fallback-avatar.png")
                          }
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center z-10 px-2">
                      {item.instituteName || "Unknown Institute"}
                    </h3>
                    <button
                      onClick={() => handleConnectBar(item._id)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 px-6 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 z-10"
                      disabled={!studentId}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 py-16 bg-white rounded-xl shadow-inner animate-fade-in">
                No new teachers available to connect with at this time.
              </div>
            )}
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

export default FollowTeacher;
