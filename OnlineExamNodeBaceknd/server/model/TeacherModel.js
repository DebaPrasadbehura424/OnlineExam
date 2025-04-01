const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Teacher schema
const teacherSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    myInstitute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyInstitute",
      default: null,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
