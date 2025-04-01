import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { mypaperContextData } from "../../context/MypaperContext";
import Card from "./components/Crad";
import CardButton from "./components/CradButton";
import IsEditingFalse from "./components/IsEditingFalse";
import IsEditingTrue from "./components/IsEditingTrue";
function MyInstitute() {
  const [isEditing, setIsEditing] = useState(false);

  const teacherId = sessionStorage.getItem("teacherId");

  const { loading, myInstituteData, setMyInstituteData } =
    useContext(mypaperContextData);
  const [formData, setFormData] = useState({
    instituteName: "",
    description: "",
    mission: "",
    useEmail: "",
    location: "",
    teacher: teacherId,
  });

  //not cheack yet
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({
        instituteName: myInstituteData?.instituteName || "",
        description: myInstituteData?.description || "",
        mission: myInstituteData?.mission || "",
        useEmail: myInstituteData?.useEmail || "",
        location: myInstituteData?.location || "",
        teacher: teacherId,
      });
    }
  };
  //done
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //not cheack yet
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
      const response = await axios.put(`http://localhost:7777/institute/edit`, {
        ...formData,
        instituteId: myInstituteId,
      });
      if (response.status === 200) {
        setMyInstituteData(response.data.myInstitute);
        alert("Success: Data updated successfully.");
        setIsEditing(false);
        setFormData({
          instituteName: "",
          description: "",
          mission: "",
          useEmail: "",
          location: "",
          teacher: teacherId,
        });
      }
    } catch (error) {
      console.error("Error updating institute:", error);
    }
  };
  //works properly done
  const handleSubmit = (e) => {
    e.preventDefault();
    setMyInstituteData(formData);
    axios
      .post("http://localhost:7777/institute/create", formData)
      .then((response) => {
        alert("Institute is created successfully");
        sessionStorage.setItem("myInstituteId", response.data.institute._id);
        setMyInstituteData(response.data.institute);
      })
      .catch((error) => console.error("Error saving institute data:", error));
  };
  //works properly done
  const handleDelete = () => {
    if (window.confirm("Are you sure? This action cannot be undone!")) {
      axios
        .delete(`http://localhost:7777/teacher/delete/${teacherId}`)
        .then(() => {
          alert("Success: Institute deleted successfully.");
          setMyInstituteData(null);
          sessionStorage.setItem("myInstituteId", "undefined");
        })
        .catch((error) => console.error("Error deleting institute:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : myInstituteData ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {isEditing ? (
              <IsEditingFalse
                formData={formData}
                handleInputChange={handleInputChange}
              />
            ) : (
              <IsEditingTrue myInstituteData={myInstituteData} />
            )}
            <CardButton
              isEditing={isEditing}
              toggleEdit={toggleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
            />
          </div>
        ) : (
          <Card
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
}

export default MyInstitute;
