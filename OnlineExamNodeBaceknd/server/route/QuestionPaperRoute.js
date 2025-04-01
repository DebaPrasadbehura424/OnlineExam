const express = require("express");
const router = express.Router();
const {
  createQuestionPaper,
  addQuestionsToPaper,
  deleteQuestionPaper,
  showquestions,
  getQuestionPaper,
} = require("../controller/QuestionPaperController");
router.post("/question-paper", createQuestionPaper);
router.get("/getQuestionPaper", getQuestionPaper);
router.put("/questions", addQuestionsToPaper);
router.delete("/delete/:id", deleteQuestionPaper);
router.get("/showquestions/:questionPaperId", showquestions);

module.exports = router;
