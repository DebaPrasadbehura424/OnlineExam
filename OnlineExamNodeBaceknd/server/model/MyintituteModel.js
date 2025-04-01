const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const myInstituteSchema = new Schema(
  {
    instituteName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    useEmail: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      unique: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const MyInstitute = mongoose.model("MyInstitute", myInstituteSchema);

module.exports = MyInstitute;
