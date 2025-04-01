const express = require("express");
const instituteRoutes = express.Router();
const instituteController = require("../controller/InstituteController");
instituteRoutes.post("/create", instituteController.InstituteCreate);
instituteRoutes.post("/addstudent", instituteController.InstituteAddStudent);
instituteRoutes.get(
  "/showstudent/:myInstituteId",
  instituteController.InstituteShowStudents
);
instituteRoutes.put("/edit", instituteController.InstituteEdit);
instituteRoutes.get(
  "/showMyInsitute/:teacherId",
  instituteController.showMyInsitute
);
instituteRoutes.get(
  "/showMyInsituteAll",
  instituteController.showMyInsituteAll
);

module.exports = instituteRoutes;
