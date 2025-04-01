import React from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
function Buttons({ isEditing, toggleEdit, handleSave, handleDelete }) {
  return (
    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      {isEditing && (
        <button
          onClick={toggleEdit}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          <FaEdit className="inline mr-2" /> Cancel
        </button>
      )}
      <button
        onClick={isEditing ? handleSave : toggleEdit}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
      >
        {isEditing ? (
          <>
            <FaSave className="inline mr-2" /> Save
          </>
        ) : (
          <>
            <FaEdit className="inline mr-2" /> Edit
          </>
        )}
      </button>
      <button
        onClick={handleDelete}
        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
      >
        <FaTrash className="inline mr-2" /> Delete
      </button>
    </div>
  );
}

export default Buttons;
