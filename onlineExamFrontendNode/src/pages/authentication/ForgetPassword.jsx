// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import sidephoto from "../../3dmodels/6333054.jpg";

// function ForgetPassword(props) {
//   const [inputType, setInputType] = useState("email");
//   const [value, setValue] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (inputType === "email") {
//       const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!emailPattern.test(value)) {
//         setErrorMessage("Please enter a valid email address.");
//         return;
//       }
//       await axios
//         .post("http://localhost:4040/email/send", { to: value })
//         .then((res) => {
//           if (res.status === 200) {
//             alert("OTP sent successfully");
//             navigate("/otpverify");
//           }
//         });
//     } else if (inputType === "number") {
//       const phonePattern = /^[0-9]{10}$/;
//       if (!phonePattern.test(value)) {
//         setErrorMessage("Please enter a valid 10-digit phone number.");
//         return;
//       }
//       await axios
//         .post(`http://localhost:4040/twilio/send/${value}`)
//         .then((res) => {
//           if (res.status === 200) {
//             alert("OTP sent successfully");
//             navigate("/otpverify");
//           }
//         });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="flex flex-col lg:flex-row max-w-4xl w-full p-6 bg-white rounded-lg shadow-xl">
//         <div className="lg:w-1/2 flex justify-center items-center">
//           <img
//             src={sidephoto}
//             alt="Side Illustration"
//             className="w-full h-auto object-cover rounded-lg"
//           />
//         </div>

//         <div className="lg:w-1/2 w-full mt-6 lg:mt-0 lg:pl-12">
//           <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
//             Forget Password
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex justify-center gap-6">
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="radio"
//                   name="inputType"
//                   value="email"
//                   checked={inputType === "email"}
//                   onChange={() => setInputType("email")}
//                   className="mr-2"
//                 />
//                 Email
//               </label>
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="radio"
//                   name="inputType"
//                   value="number"
//                   checked={inputType === "number"}
//                   onChange={() => setInputType("number")}
//                   className="mr-2"
//                 />
//                 Phone Number
//               </label>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 {inputType === "email"
//                   ? "Enter your Email:"
//                   : "Enter your Phone Number:"}
//               </label>
//               <input
//                 type={inputType === "email" ? "email" : "tel"}
//                 value={value}
//                 onChange={handleInputChange}
//                 placeholder={
//                   inputType === "email" ? "Your Email" : "Your Phone Number"
//                 }
//                 required
//                 className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {errorMessage && (
//               <div className="text-red-500 text-sm">{errorMessage}</div>
//             )}

//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Send OTP
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgetPassword;
