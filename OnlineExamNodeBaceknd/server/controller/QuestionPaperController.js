const QuestionPaper = require("../model/QuestionPaperModel");

module.exports.createQuestionPaper = async (req, res) => {
  const { subject, examDuration, examType, teacher } = req.body;

  if (!subject || !examDuration || !examType || !teacher) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newQuestionPaper = new QuestionPaper({
      subject,
      examDuration,
      examType,
      teacher,
    });

    await newQuestionPaper.save();

    res.status(201).json({
      message: "Question paper created successfully",
      questionPaper: newQuestionPaper,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating question paper",
      error: error.message,
    });
  }
};
module.exports.addQuestionsToPaper = async (req, res) => {
  const { questionPaperId, questions } = req.body;

  if (!questionPaperId || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const questionPaper = await QuestionPaper.findById(questionPaperId);

    if (!questionPaper) {
      return res.status(404).json({ message: "Question Paper not found" });
    }

    questionPaper.questions.push(...questions);

    await questionPaper.save();

    res.status(200).json({
      message: "Questions added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding questions",
      error: error.message,
    });
  }
};
module.exports.deleteQuestionPaper = async (req, res) => {
  const { id } = req.params;

  try {
    const questionPaper = await QuestionPaper.findByIdAndDelete(id);

    if (!questionPaper) {
      return res.status(404).json({ message: "Question Paper not found" });
    }

    res.status(200).json({
      message: "Question Paper deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting question paper",
      error: error.message,
    });
  }
};

module.exports.showquestions = async (req, res) => {
  const { questionPaperId } = req.params;

  try {
    const questionPaper = await QuestionPaper.findById(questionPaperId);

    if (!questionPaper) {
      return res.status(404).json([]);
    }

    res.status(200).json(questionPaper);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting question paper",
      error: error.message,
    });
  }
};
module.exports.getQuestionPaper = async (req, res) => {
  try {
    const questionPaperAll = await QuestionPaper.find().select("-questions");

    if ((questionPaperAll || []).length > 0) {
      return res.status(200).json(questionPaperAll);
    }

    return res.status(200).json([]);
  } catch (error) {
    console.error("Error fetching question papers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
