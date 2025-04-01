import React from "react";

function Card({ handleSubmit, handleInputChange, formData }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
        Create Your Institute
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          "instituteName",
          "description",
          "mission",
          "useEmail",
          "location",
        ].map((field) => (
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
              required
            />
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
          >
            Create Institute
          </button>
        </div>
      </form>
    </div>
  );
}

export default Card;
