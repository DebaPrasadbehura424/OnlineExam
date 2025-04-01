import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const myInstituteId = sessionStorage.getItem("myInstituteId");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (myInstituteId) {
      const fetchStudents = async () => {
        await axios
          .get(`http://localhost:7777/institute/showstudent/${myInstituteId}`)
          .then((res) => {
            if (res.status == 200) {
              setStudents(res.data.students);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchStudents();
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-10 text-center animate-fade-in">
          Your Students
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {(students || []).length > 0 ? (
            students.map((student, index) => {
              const emails = student.studEmail || "Unknown Student";
              const studentName = emails.includes("@gmail.com")
                ? emails.split("@")[0]
                : emails;
              const studClass = student.studClass || "> 10th Class";

              return (
                <div
                  key={student._id}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex items-center space-x-3 sm:space-x-4 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 border border-gray-100 opacity-0 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src="https://www.pix-star.com/blog/wp-content/uploads/2021/05/digital-photo-frames.jpg"
                    alt={studentName}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-indigo-300 flex-shrink-0 transition-transform duration-300 hover:scale-105"
                    onError={(e) => (e.target.src = "default-avatar.jpg")}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                      {studentName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center">
                      <span className="font-medium text-indigo-700 mr-1">
                        Class:
                      </span>
                      <span className="truncate">{studClass}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10 sm:py-12 bg-red-50 border border-red-200 rounded-xl shadow-md animate-fade-in">
              <p className="text-base sm:text-lg font-semibold text-red-600">
                {myInstituteId != undefined
                  ? " please create institute if not created"
                  : "there is no student who follow you"}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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

export default Students;
