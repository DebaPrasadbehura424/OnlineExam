const studentModel = require("../model/StudentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.studentRegister = async (req, res) => {
  const { studEmail, studPassword, studClass, role } = req.body;

  try {
    const isStudentExit = await studentModel.findOne({ studEmail });
    if (isStudentExit) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashpassword = await bcrypt.hash(studPassword, 6);

    const newStudent = new studentModel({
      studEmail,
      studPassword: hashpassword,
      studClass,
      role: role || "Student",
    });

    await newStudent.save();

    const token = jwt.sign(
      { studentId: newStudent._id, studEmail: newStudent.studEmail },
      process.env.SECRETKEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      student: newStudent,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering student", error: err.message });
  }
};
module.exports.studentLogin = async (req, res) => {
  const { studEmail, studPassword } = req.body;

  try {
    const student = await studentModel.findOne({ studEmail });
    if (!student) {
      return res.status(400).json({ message: "Student does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      studPassword,
      student.studPassword
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { studentId: student._id, studEmail: student.studEmail },
      process.env.SECRETKEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token: token,
      studentId: student._id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error logging in student", error: error.message });
  }
};
module.exports.studentProfile = async (req, res) => {
  try {
    const token = req.header("Authorization").slice(7);
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const studentId = decoded.studentId;
    const getStudent = await studentModel.findById(studentId);
    if (getStudent == null) {
      return res.status(400).json("student is not found");
    }
    return res.status(200).json(getStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching student profile",
      error: error.message,
    });
  }
};
module.exports.showInstitute = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await studentModel
      .findById(studentId)
      .populate({ path: "institutes", select: "-students" })
      .exec();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
