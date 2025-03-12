import React, { useContext } from "react";
import { questionPaperContextData } from "../../context/QuestionPaperContext";
import { useNavigate } from "react-router-dom";

function YourInstitute() {
  const { institute } = useContext(questionPaperContextData);
  const navigate = useNavigate();
  const handleMyInstitutePapers = (id) => {
    sessionStorage.setItem("instituteIdPaper", id);
    navigate("/my-papers");
  };

  return (
    <div className="min-h-screen bg-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#181818] mb-10">
          Your Institutes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {institute.map((institute) => (
            <div
              key={institute.myInstituteId}
              className="bg-gradient-to-t from-gray-200 via-white to-gray-100 p-6 rounded-lg shadow-md transition-shadow duration-200 transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-[#181818] mb-2">
                {institute.instituteName}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {institute.description}
              </p>
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>
                  <strong className="text-[#181818]">Mission:</strong>{" "}
                  {institute.mission}
                </p>
                <p>
                  <strong className="text-[#181818]">Location:</strong>{" "}
                  {institute.location}
                </p>
              </div>
              <button
                className="w-full bg-[#181818] text-white py-2 rounded-md hover:bg-[#333333] transition duration-200"
                onClick={() =>
                  handleMyInstitutePapers(institute.teacher?.teacherId)
                }
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourInstitute;
