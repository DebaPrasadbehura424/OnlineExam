const MyInstituteModel = require("../model/MyintituteModel");
const TeacherModel = require("../model/TeacherModel");
const StudentModel = require("../model/StudentModel");

module.exports.InstituteCreate = async (req, res) => {
  const {
    instituteName,
    description,
    mission,
    useEmail,
    location,
    teacher,
    students,
  } = req.body;

  try {
    const existingTeacher = await TeacherModel.findById(teacher);

    if (!existingTeacher) {
      return res.status(400).json({ message: "Teacher not found" });
    }
    const newInstitute = new MyInstituteModel({
      instituteName,
      description,
      mission,
      useEmail,
      location,
      teacher,
      students: students || [],
    });
    await newInstitute.save();
    existingTeacher.myInstitute = newInstitute._id;
    await existingTeacher.save();

    res.status(201).json({
      institute: newInstitute,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating institute",
      error: error.message,
    });
  }
};
module.exports.InstituteDelete = async (req, res) => {
  const { instituteId } = req.body;
  const myInstitute = await MyInstituteModel.findById(instituteId);

  if (!myInstitute) {
    return res.status(404).json({ message: "Institute not found" });
  }

  await MyInstituteModel.deleteOne({ _id: instituteId });
  res.status(200).json({ message: "Institute deleted successfully" });
};
module.exports.InstituteAddStudent = async (req, res) => {
  const { instituteId, studentId } = req.body;
  const myInstitute = await MyInstituteModel.findById(instituteId);
  if (!myInstitute) {
    return res.status(404).json({ message: "Institute not found" });
  }
  myInstitute.students.push(studentId);
  const student = await StudentModel.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  student.institutes.push(instituteId);
  await myInstitute.save();
  await student.save();
  res.status(200).json({ message: "Student added to institute successfully" });
};
module.exports.InstituteShowStudents = async (req, res) => {
  const { myInstituteId } = req.params;
  const myInstitute = await MyInstituteModel.findById(myInstituteId)
    .populate("students")
    .exec();

  if (!myInstitute) {
    return res.status(404).json({ message: "Institute not found" });
  }
  res.status(200).json(myInstitute);
};
module.exports.InstituteEdit = async (req, res) => {
  const {
    instituteId,
    instituteName,
    description,
    mission,
    useEmail,
    location,
    teacher,
  } = req.body;

  try {
    const myInstitute = await MyInstituteModel.findById(instituteId);

    if (!myInstitute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    if (teacher) {
      const existingTeacher = await TeacherModel.findById(teacher);
      if (!existingTeacher) {
        return res.status(400).json({ message: "Teacher not found" });
      }
      myInstitute.teacher = teacher;
    }

    myInstitute.instituteName = instituteName || myInstitute.instituteName;
    myInstitute.description = description || myInstitute.description;
    myInstitute.mission = mission || myInstitute.mission;
    myInstitute.useEmail = useEmail || myInstitute.useEmail;
    myInstitute.location = location || myInstitute.location;

    await myInstitute.save();

    res.status(200).json({
      myInstitute,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating institute",
      error: error.message,
    });
  }
};
module.exports.showMyInsitute = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await TeacherModel.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const myInstitute = await MyInstituteModel.findById(teacher.myInstitute);

    if (!myInstitute) {
      return res.status(200).json([]);
    }
    res.status(200).json(myInstitute);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating institute",
      error: error.message,
    });
  }
};

module.exports.showMyInsituteAll = async (req, res) => {
  try {
    const instituteALL = await MyInstituteModel.find().select("-students");

    if ((instituteALL || []).length > 0) {
      return res.status(200).json(instituteALL);
    }

    return res.status(200).json([]);
  } catch (error) {
    console.error("Error fetching question papers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
