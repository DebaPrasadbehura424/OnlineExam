import React, { useEffect, useState } from "react";

function Students() {
  const myInstituteId = sessionStorage.getItem("myInstituteId");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (myInstituteId) {
      fetch(`http://localhost:4040/institute/getStudents/${myInstituteId}`)
        .then((res) => res.json())
        .then((data) => {
          setStudents(data);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    }
  }, [myInstituteId]);

  return (
    <div className="bg-gray-100 min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => {
            const studentName = student.studentName || "Unknown Student";
            const profilePic = student.profilePic || "default-avatar.jpg";
            const studClass = student.studClass || "> 10th Class";

            return (
              <div
                key={student.studId}
                className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex items-center space-x-4"
              >
                <img
                  src={profilePic}
                  alt={studentName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {studentName}
                  </h3>
                  <p className="text-sm text-gray-600">{studClass}</p>
                </div>
              </div>
            );
          })}
          {students.length === 0 && myInstituteId && (
            <div className="col-span-full text-center text-gray-800 py-6 bg-white rounded-lg shadow-md">
              No students found.
            </div>
          )}
          {!myInstituteId && (
            <div className="col-span-full text-center text-gray-800 py-6 bg-red-100 border-t-4 border-red-500 rounded-lg shadow-md">
              Please create institute first or if already created then visit
              that page
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;
