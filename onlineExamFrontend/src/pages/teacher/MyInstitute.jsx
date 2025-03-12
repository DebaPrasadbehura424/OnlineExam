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

  const teacherId = sessionStorage.getItem("teacherId");
  const myInstituteId = sessionStorage.getItem("myInstituteId");

  useEffect(() => {
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
        console.error("Error fetching institute data:", error);
      });
  }, [teacherId, myInstituteId]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormData({
      instituteName: myInstituteData.instituteName,
      description: myInstituteData.description,
      mission: myInstituteData.mission,
      useEmail: myInstituteData.useEmail,
      location: myInstituteData.location,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      formData.instituteName === "" ||
      formData.description === "" ||
      formData.mission === "" ||
      formData.useEmail === "" ||
      formData.location === ""
    ) {
      alert("Error: Please fill in all the fields.");
      return;
    }
    if (!formData.useEmail.includes("@gmail.com")) {
      alert("Error: Please follow the Gmail format.");
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
        setIsEditing(!isEditing);
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
      "Are you sure? You won't be able to revert this!"
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:4040/institute/delete/${myInstituteId}`)
        .then((response) => {
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

  if (myInstituteData) {
    return (
      <div className="max-w-4xl mx-auto p-10 bg-gradient-to-r bg-gray-800 rounded-xl shadow-xl text-white">
        <div className="text-center mb-8">
          {isEditing ? (
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleInputChange}
              autoComplete="off"
              className="border-b-4 border-white bg-transparent text-3xl font-semibold text-center focus:outline-none"
            />
          ) : (
            <h2 className="text-4xl font-semibold">
              {myInstituteData.instituteName}
            </h2>
          )}
        </div>

        <div className="mb-6">
          {isEditing ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300 bg-transparent text-lg"
              rows="4"
            />
          ) : (
            <div className=" flex items-center gap-2">
              <h3 className="text-2xl font-semibold">Description : </h3>
              <p className="text-xl">{myInstituteData.description}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Mission</h3>
          {isEditing ? (
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300 bg-transparent text-lg"
              rows="4"
            />
          ) : (
            <p className="text-lg">{myInstituteData.mission}</p>
          )}
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Email:</p>
            {isEditing ? (
              <input
                type="email"
                name="useEmail"
                value={formData.useEmail}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300 bg-transparent"
              />
            ) : (
              <p>{myInstituteData.useEmail}</p>
            )}
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300 bg-transparent"
              />
            ) : (
              <p>{myInstituteData.location}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6">
          {isEditing && (
            <button
              className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:outline-none"
              onClick={toggleEdit}
            >
              <FaEdit className="inline mr-2" />
              Cancel
            </button>
          )}
          <button
            onClick={isEditing ? handleSave : toggleEdit}
            className="px-6 py-2 bg-[#1900BF] text-white rounded-full focus:outline-none"
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
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-[#B10109] text-white rounded-full focus:outline-none"
          >
            <FaTrash className="inline mr-2" />
            Delete Institute
          </button>
        </div>
      </div>
    );
  } else {
    if (myInstituteId == null) {
      return (
        <div className="max-w-4xl mx-auto p-10  rounded-xl shadow-xl text-black bg-gray-400">
          <h2 className="text-4xl font-semibold text-center mb-6">
            Create Your Institute
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="instituteName"
              placeholder="Institute Name"
              value={formData.instituteName}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-4 border-2 border-gray-200 rounded-lg mb-4"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 rounded-lg mb-4 "
              rows="4"
              required
            />
            <textarea
              name="mission"
              placeholder="Mission"
              value={formData.mission}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 rounded-lg mb-4 "
              rows="4"
              required
            />
            <input
              type="email"
              name="useEmail"
              placeholder="Institute Email"
              value={formData.useEmail}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-4 border-2 border-gray-200 rounded-lg mb-4 "
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-4 border-2 border-gray-200 rounded-lg mb-4 "
              required
            />
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 focus:outline-none"
              >
                Create Institute
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default MyInstitute;
