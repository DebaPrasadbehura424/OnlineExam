// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Demo() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [loadingState, setLoadingState] = useState(false);
//   const navigate = useNavigate();
//   const card = sessionStorage.getItem("card");

//   useEffect(() => {
//     axios
//       .get("http://localhost:4040/oath2", { withCredentials: true })
//       .then((res) => {
//         const mydata = res.data.login || res.data.email;

//         setUser(mydata);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user data", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleRoleSelect = async (role) => {
//     if (!user) {
//       alert("User Not Found: No user email found.");
//       return;
//     }

//     let userEmail = user.toLowerCase();
//     if (!userEmail.includes("@gmail.com")) {
//       userEmail += "@gmail.com";
//     }

//     setLoadingState(true);
//     setTimeout(() => {
//       setSelectedRole(role);
//       setLoadingState(false);
//     }, 1000);

//     if (card == "register") {
//       if (role === "Teacher") {
//         await axios
//           .post("http://localhost:4040/teachers/registerOauth2", {
//             email: userEmail,
//           })
//           .then((response) => {
//             if (response.status === 201) {
//               sessionStorage.setItem("token", response.data.token);
//               localStorage.setItem("token", response.data.token);
//               sessionStorage.setItem(
//                 "teacherId",
//                 response.data.teacher.teacherId
//               );
//               localStorage.setItem(
//                 "teacherId",
//                 response.data.teacher.teacherId
//               );
//               navigate("/loginhelper");
//             }
//           })
//           .catch((err) => {
//             alert(
//               "Registration Failed: Your account already exists on our platform."
//             );
//             console.error(err);
//           });
//       } else {
//         await axios
//           .post("http://localhost:4040/students/registerOauth2", {
//             studEmail: userEmail,
//           })
//           .then((res) => {
//             if (res.status === 201) {
//               alert(
//                 "Student Registration Successful: You have been successfully registered as a student."
//               );
//               sessionStorage.setItem("token", res.data.token);
//               sessionStorage.setItem("studentId", res.data.student.studId);
//               localStorage.setItem("token", res.data.token);
//               localStorage.setItem("studentId", res.data.student.studId);
//               navigate("/studHelper");
//             }
//           })
//           .catch((err) => {
//             alert(
//               "Registration Failed: Something went wrong with student registration."
//             );
//             console.error(err);
//           });
//       }
//     } else {
//       if (role === "Teacher") {
//         await axios
//           .post("http://localhost:4040/teachers/loginOauth2", {
//             email: userEmail,
//           })
//           .then((response) => {
//             if (response.status === 200) {
//               alert(
//                 "Teacher login Successful: You have been successfully login as a Teacher."
//               );
//               sessionStorage.setItem("token", response.data.token);
//               localStorage.setItem("token", response.data.token);
//               sessionStorage.setItem(
//                 "teacherId",
//                 response.data.teacher.teacherId
//               );
//               localStorage.setItem(
//                 "teacherId",
//                 response.data.teacher.teacherId
//               );
//               navigate("/loginhelper");
//             }
//           })
//           .catch((err) => {
//             alert("login Failed: Your account already exists on our platform.");
//             console.error(err);
//           });
//       } else {
//         await axios
//           .post("http://localhost:4040/students/loginOauth2", {
//             studEmail: userEmail,
//           })
//           .then((res) => {
//             if (res.status === 200) {
//               alert(
//                 "Student login Successful: You have been successfully login as a student."
//               );
//               sessionStorage.setItem("token", res.data.token);
//               sessionStorage.setItem("studentId", res.data.student.studId);
//               localStorage.setItem("token", res.data.token);
//               localStorage.setItem("studentId", res.data.student.studId);
//               navigate("/studHelper");
//             }
//           })
//           .catch((err) => {
//             alert("Registration Failed: Something went wrong with your data.");
//             console.error(err);
//           });
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Select Your Role
//         </h2>

//         {loadingState ? (
//           <div className="flex justify-center items-center">
//             <div className="animate-spin border-t-4 border-blue-600 border-solid rounded-full h-10 w-10 mb-4"></div>
//             <p>Loading...</p>
//           </div>
//         ) : (
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={() => handleRoleSelect("Student")}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
//             >
//               Student
//             </button>
//             <button
//               onClick={() => handleRoleSelect("Teacher")}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
//             >
//               Teacher
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Demo;
