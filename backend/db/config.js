const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const connectDB = async () => {
  try {
    const DB = process.env.DATABASE;
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
