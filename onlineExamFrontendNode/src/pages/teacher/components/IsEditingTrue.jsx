import React from "react";

function IsEditingTrue({ myInstituteData }) {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8 border-b border-gray-200 pb-6">
        {myInstituteData.instituteName}
      </h2>
      <div className="space-y-8">
        {["description", "mission"].map((field) => (
          <div key={field}>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {myInstituteData[field]}
            </p>
          </div>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {["useEmail", "location"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <p className="text-gray-600">{myInstituteData[field]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IsEditingTrue;
