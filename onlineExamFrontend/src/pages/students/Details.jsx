import React, { useState } from "react";

const Details = () => {
  const [detailsType, setDetailsType] = useState("overview");

  const studentData = {
    attendedExams: 5,
    followedTeachers: 8,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {detailsType === "overview" ? (
        <div>
          <div className="mt-4">
            <p className="text-lg">
              <strong>Exams Attended:</strong> {studentData.attendedExams} exams
            </p>
            <p className="text-lg">
              <strong>Followed Teachers:</strong> {studentData.followedTeachers}{" "}
              teachers
            </p>
          </div>
        </div>
      ) : null}

      {/* Toggle buttons for switching details */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setDetailsType("overview")}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Overview
        </button>
      </div>
    </div>
  );
};

export default Details;
