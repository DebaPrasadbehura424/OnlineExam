const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const { connectDb } = require("./server/mongodb/database");

const teacherRoutes = require("./server/route/TeacherRoute");
const studentRoutes = require("./server/route/StudentRoute");
const instituteRoutes = require("./server/route/MyinstituteRoute");
const questionPaperRoutes = require("./server/route/QuestionPaperRoute");
app.use(cors());
// app.use(
//   cors({
//     origin: "https://online-exam-forntendnode.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Accept",
//       "X-Requested-With",
//     ],
//   })
// );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.get("/", (_, res) => {
  res.send("backend totk");
});

app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);
app.use("/institute", instituteRoutes);
app.use("/questionPaper", questionPaperRoutes);

const PORT = process.env.HOST || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
