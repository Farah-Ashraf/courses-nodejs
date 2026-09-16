const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(url, {
      dbName: "learn-mongo",
    });

    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

module.exports = connectDB;
