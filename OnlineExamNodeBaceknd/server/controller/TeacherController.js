const bcrypt = require("bcryptjs");
const teacherModel = require("../model/TeacherModel");
const MyintituteModel = require("../model/MyintituteModel");
const jwt = require("jsonwebtoken");
const QuestionPaperModel = require("../model/QuestionPaperModel");

module.exports.teacherRegister = async (req, res) => {
  const { email, password, subject, role } = req.body;

  try {
    const isTeacherExit = await teacherModel.findOne({ email });
    if (isTeacherExit) {
      return res.status(400).json({ message: "Teacher already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 6);
    const newTeacher = new teacherModel({
      email,
      password: hashpassword,
      subject,
      role: role || "Teacher",
    });
    await newTeacher.save();
    const token = jwt.sign(
      { teacherId: newTeacher._id, email: newTeacher.email },
      process.env.SECRETKEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      teacher: newTeacher,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering teacher", error: err.message });
  }
};
module.exports.teacherLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await teacherModel.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Teacher does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { teacherId: teacher._id, email: teacher.email },
      process.env.SECRETKEY,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      token: token,
      teacherId: teacher._id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error logging in teacher", error: error.message });
  }
};
module.exports.teacherProfile = async (req, res) => {
  const token = req.header("Authorization").slice(7);
  const decoded = jwt.verify(token, process.env.SECRETKEY);
  const teacherId = decoded.teacherId;
  const getTeacher = await teacherModel.findById(teacherId);
  if (getTeacher == null) {
    return res.status(400).json("teacher is not found");
  }
  return res.status(200).json(getTeacher);
};
module.exports.questionPaperCreatedByTeacher = async (req, res) => {
  const { teacherId } = req.params;

  if (!teacherId) {
    return res.status(400).json({ message: "Teacher ID is required" });
  }

  try {
    const questionPapers = await QuestionPaperModel.find({ teacher: teacherId })
      .select("subject examDuration examType createdAt updatedAt questions")
      .exec();

    if (questionPapers.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json({
      questionPapers: questionPapers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching Question Papers",
      error: error.message,
    });
  }
};
module.exports.deleteIntitute = async (req, res) => {
  const { teacherId } = req.params;
  const isTeacherExit = await teacherModel.findById(teacherId);
  if (!isTeacherExit) {
    return res.status(404).json("teacher not found");
  }

  const myInstituteId = isTeacherExit.myInstitute;
  const myInstituteBody = await MyintituteModel.findById(myInstituteId);

  if (!myInstituteBody) {
    return res.status(404).json("Institute not found");
  }

  isTeacherExit.myInstitute = null;
  await MyintituteModel.deleteOne({ _id: myInstituteId });
  await isTeacherExit.save();

  return res.status(200).json("delete successfully");
};
