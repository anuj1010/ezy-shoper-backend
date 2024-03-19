const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectdb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("error in connecting DB", error);
  }
};

module.exports = connectdb;
