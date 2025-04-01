const mongoose = require("mongoose");
module.exports.connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/onlineExamportal")
    .then(() => {
      console.log("database  is successfully connected ");
    })
    .catch((err) => {
      console.log("database is not connected");
    });
};
