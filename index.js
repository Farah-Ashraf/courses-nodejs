require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("node:path");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");

const connectDB = require("./connections/db-connection");
const courseRouter = require("./routes/courses.routes");
const userRouter = require("./routes/users.routes");
const httpStatusText = require("./utils/httpStatusText");

const app = express();

// Connect to MongoDB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Enable CORS for all origins
app.use(cors());

// Middleware to read JSON request bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Courses Management API is running",
    database:
      mongoose.connection.readyState === 1
        ? "Successfully connected to MongoDB"
        : "Not connected to MongoDB",
    documentation: "/api-docs",
  });
});

// Static route: Allow clients to access files stored in the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Courses routes
app.use("/api/courses", courseRouter);

// Users routes
app.use("/api/users", userRouter);

// Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Not found routes
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error middleware
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

// Export app for Vercel
module.exports = app;