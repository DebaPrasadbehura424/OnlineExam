import React, { useContext } from "react";
import { questionPaperContextData } from "../../context/QuestionPaperContext";
import { useNavigate } from "react-router-dom";

function YourInstitute() {
  const { institute } = useContext(questionPaperContextData);
  const navigate = useNavigate();

  const handleMyInstitutePapers = (id) => {
    sessionStorage.setItem("instituteIdPaperId", id);
    navigate("/findpapers");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-800 mb-16 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent animate-fade-in tracking-wide">
          Your Institutes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {institute.map((institute, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 opacity-0 animate-slide-up overflow-hidden relative group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-100/30 to-teal-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-semibold text-teal-900 mb-3 truncate">
                  {institute.instituteName}
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed bg-white/70 p-4 rounded-xl shadow-inner">
                  {institute.description}
                </p>
                <div className="space-y-4 mb-6">
                  <p className="text-sm flex flex-col sm:flex-row sm:items-center">
                    <span className="font-medium text-teal-800 mr-2">
                      Mission:
                    </span>
                    <span className="text-gray-700">{institute.mission}</span>
                  </p>
                  <p className="text-sm flex flex-col sm:flex-row sm:items-center">
                    <span className="font-medium text-teal-800 mr-2">
                      Location:
                    </span>
                    <span className="text-gray-700">{institute.location}</span>
                  </p>
                </div>
                <button
                  className="w-full bg-teal-600 text-white py-3 px-8 rounded-full font-medium text-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-70 transition-all duration-400 transform hover:scale-105"
                  onClick={() => handleMyInstitutePapers(institute.teacher)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default YourInstitute;
