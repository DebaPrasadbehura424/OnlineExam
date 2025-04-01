import React from "react";

function IsEditingFalse({ formData, handleInputChange }) {
  return (
    <div>
      <input
        type="text"
        name="instituteName"
        value={formData.instituteName}
        onChange={handleInputChange}
        className="w-full text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-indigo-400 focus:border-indigo-600 outline-none text-center py-2 mb-8"
      />
      <div className="space-y-8">
        {["description", "mission"].map((field) => (
          <div key={field}>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </h3>
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="w-full p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              rows="4"
            />
          </div>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {["useEmail", "location"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "useEmail" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IsEditingFalse;
