const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionPaperSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    examDuration: {
      type: Number,
      required: true,
    },
    examType: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

module.exports = QuestionPaper;
