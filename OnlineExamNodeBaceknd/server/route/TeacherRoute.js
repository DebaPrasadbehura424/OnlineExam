const express = require("express");
const teacherRoutes = express.Router();
const teacherController = require("../controller/TeacherController");
teacherRoutes.post("/register", teacherController.teacherRegister);
teacherRoutes.post("/login", teacherController.teacherLogin);
teacherRoutes.get("/profile", teacherController.teacherProfile);
teacherRoutes.get(
  "/questionPaperCreatedByTeacher/:teacherId",
  teacherController.questionPaperCreatedByTeacher
);
teacherRoutes.delete("/delete/:teacherId", teacherController.deleteIntitute);
module.exports = teacherRoutes;
