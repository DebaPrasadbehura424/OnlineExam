import React, { useContext, useEffect, useState } from "react";
import { mypaperContextData } from "../../context/MypaperContext";

function Students() {
  const { students, loading } = useContext(mypaperContextData);
  const myInstituteIdSession = sessionStorage.getItem("myInstituteId");
  const myInstituteIdLocal = localStorage.getItem("myInstituteId");
  const myInstituteId = myInstituteIdSession || myInstituteIdLocal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          Students
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 animate-pulse">
              Loading students...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {students.length > 0 ? (
              students.map((student) => {
                const studentName = student.studentName || "Unknown Student";
                const profilePic = student.profilePic || "default-avatar.jpg";
                const studClass = student.studClass || "> 10th Class";

                return (
                  <div
                    key={student.studId}
                    className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <img
                      src={profilePic}
                      alt={studentName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-indigo-200 flex-shrink-0"
                      onError={(e) => (e.target.src = "default-avatar.jpg")}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-md sm:text-lg font-semibold text-gray-800 truncate">
                        {studentName}
                      </h3>
                      <p className="text-sm text-gray-600">{studClass}</p>
                    </div>
                  </div>
                );
              })
            ) : myInstituteId ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md">
                <p className="text-lg text-gray-600">No students found.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Add students to your institute to see them here.
                </p>
              </div>
            ) : (
              <div className="col-span-full text-center py-12 bg-red-50 border border-red-200 rounded-xl shadow-md">
                <p className="text-lg font-semibold text-red-600">
                  Institute Not Found
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Please create an institute first or visit the institute page.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;
