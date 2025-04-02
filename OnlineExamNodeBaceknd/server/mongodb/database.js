const mongoose = require("mongoose");

module.exports.connectDb = () => {
  const mongoDbAtlasUri =
    "mongodb+srv://debaprasadbehura89:s5dY5LSzdhymR4AB@cluster0.9chhe.mongodb.net/OnlineExamCenter?retryWrites=true&w=majority&appName=Cluster0";
  const mongoDbCompassUri = "mongodb://localhost:27017/onlineExamportal";
  mongoose
    .connect(mongoDbCompassUri)
    .then(() => {
      console.log("database  is successfully connected ");
    })
    .catch((err) => {
      console.log("database is not connected");
    });
};
