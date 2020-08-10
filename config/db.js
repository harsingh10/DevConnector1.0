const mongoose = require("mongoose");
const config = require("config");
const dbConnect = config.get("mongoURI")
// const dotenv = require('dotenv');
// dotenv.config();

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to mongodb: ", err);
    //exit process
    process.exit(1);
  }
}


