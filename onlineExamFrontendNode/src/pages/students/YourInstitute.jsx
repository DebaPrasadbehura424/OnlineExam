import React, { useContext } from "react";
import { questionPaperContextData } from "../../context/QuestionPaperContext";
import { useNavigate } from "react-router-dom";

function YourInstitute() {
  const { institute } = useContext(questionPaperContextData);
  console.log(institute);

  const navigate = useNavigate();

  const handleMyInstitutePapers = (id) => {
    sessionStorage.setItem("instituteIdPaperId", id);
    navigate("/findpapers");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16 bg-clip-text bg-gradient-to-r from-gray-800 to-indigo-600 animate-fade-in tracking-tight">
          Your Institutes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {institute.map((institute, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 opacity-0 animate-slide-up overflow-hidden relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-gray-50 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"></div>
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 line-clamp-1">
                  {institute.instituteName}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed bg-gray-50/50 p-2 rounded-lg">
                  {institute.description}
                </p>
                <div className="space-y-3 mb-6">
                  <p className="text-sm flex flex-col sm:flex-row sm:items-center">
                    <span className="font-medium text-gray-900 mr-2">
                      Mission:
                    </span>
                    <span className="text-gray-600">{institute.mission}</span>
                  </p>
                  <p className="text-sm flex flex-col sm:flex-row sm:items-center">
                    <span className="font-medium text-gray-900 mr-2">
                      Location:
                    </span>
                    <span className="text-gray-600">{institute.location}</span>
                  </p>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-gray-800 to-indigo-600 text-white py-2.5 px-6 rounded-lg font-medium text-sm hover:from-gray-900 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleMyInstitutePapers(institute.teacher)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Move styles to global scope or a CSS file */}
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

export default YourInstitute;
