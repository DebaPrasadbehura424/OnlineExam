import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

function MyInstitute() {
  const [isEditing, setIsEditing] = useState(false);
  const [myInstituteData, setMyInstituteData] = useState(null);
  const [formData, setFormData] = useState({
    instituteName: "",
    description: "",
    mission: "",
    useEmail: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  const teacherId = sessionStorage.getItem("teacherId");
  const myInstituteId = sessionStorage.getItem("myInstituteId");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4040/institute/get/${teacherId}`)
      .then((response) => {
        if (response.status !== 404) {
          setMyInstituteData(response.data);
          sessionStorage.setItem("myInstituteId", response.data.myInstituteId);
          localStorage.setItem("myInstituteId", response.data.myInstituteId);
        }
      })
      .catch((error) => {
        console.error("Error fetching institute data:");
      })
      .finally(() => setLoading(false));
  }, [teacherId, myInstituteId]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormData({
      instituteName: myInstituteData?.instituteName || "",
      description: myInstituteData?.description || "",
      mission: myInstituteData?.mission || "",
      useEmail: myInstituteData?.useEmail || "",
      location: myInstituteData?.location || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => val === "")) {
      alert("Error: Please fill in all the fields.");
      return;
    }
    if (!formData.useEmail.includes("@gmail.com")) {
      alert("Error: Please use a valid Gmail address.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:4040/institute/update/${myInstituteId}`,
        formData
      );
      if (response.status === 200) {
        setMyInstituteData(response.data);
        alert("Success: Data updated successfully.");
        setIsEditing(false);
        setFormData({
          instituteName: "",
          description: "",
          mission: "",
          useEmail: "",
          location: "",
        });
      }
    } catch (error) {
      console.error("Error updating institute:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4040/institute/create/${teacherId}`, formData)
      .then((response) => {
        setMyInstituteData(response.data);
        sessionStorage.setItem("myInstituteId", response.data.myInstituteId);
        localStorage.setItem("myInstituteId", response.data.myInstituteId);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error saving institute data:", error);
      });
  };

  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure? This action cannot be undone!"
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:4040/institute/delete/${myInstituteId}`)
        .then(() => {
          alert("Success: Institute deleted successfully.");
          setMyInstituteData(null);
          sessionStorage.removeItem("myInstituteId");
          localStorage.removeItem("myInstituteId");
        })
        .catch((error) => {
          console.error("Error deleting institute:", error);
        });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {myInstituteData ? (
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            {/* Header */}
            <div className="mb-8 border-b border-gray-200 pb-6">
              {isEditing ? (
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleInputChange}
                  className="w-full text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-indigo-400 focus:border-indigo-600 outline-none text-center py-2 transition-all duration-200"
                />
              ) : (
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
                  {myInstituteData.instituteName}
                </h2>
              )}
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  Description
                </h3>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 resize-none"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {myInstituteData.description}
                  </p>
                )}
              </div>

              {/* Mission */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  Mission
                </h3>
                {isEditing ? (
                  <textarea
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 resize-none"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {myInstituteData.mission}
                  </p>
                )}
              </div>

              {/* Email & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="useEmail"
                      value={formData.useEmail}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-600">{myInstituteData.useEmail}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-600">{myInstituteData.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              {isEditing && (
                <button
                  onClick={toggleEdit}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium shadow-md hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <FaEdit className="inline mr-2" />
                  Cancel
                </button>
              )}
              <button
                onClick={isEditing ? handleSave : toggleEdit}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {isEditing ? (
                  <>
                    <FaSave className="inline mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <FaEdit className="inline mr-2" />
                    Edit
                  </>
                )}
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <FaTrash className="inline mr-2" />
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
              Create Your Institute
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institute Name
                </label>
                <input
                  type="text"
                  name="instituteName"
                  placeholder="Enter institute name"
                  value={formData.instituteName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 resize-none"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mission
                </label>
                <textarea
                  name="mission"
                  placeholder="Enter mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 resize-none"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="useEmail"
                  placeholder="Enter institute email"
                  value={formData.useEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Create Institute
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyInstitute;
