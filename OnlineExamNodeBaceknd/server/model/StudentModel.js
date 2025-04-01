const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studEmail: {
      type: String,
      unique: true,
      required: true,
    },
    studPassword: {
      type: String,
      required: true,
    },
    studClass: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    institutes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyInstitute",
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
