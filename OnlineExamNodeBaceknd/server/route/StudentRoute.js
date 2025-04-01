const express = require("express");
const studentRoutes = express.Router();
const studentController = require("../controller/StudentController");
studentRoutes.post("/register", studentController.studentRegister);
studentRoutes.post("/login", studentController.studentLogin);
studentRoutes.get("/profile", studentController.studentProfile);
studentRoutes.get("/showInstitute/:studentId", studentController.showInstitute);

module.exports = studentRoutes;
