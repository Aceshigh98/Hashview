const cors = require("cors");
const express = require("express");
const minersRoutes = require("./routes/minersRoute");
const userRoutes = require("./routes/user");
const tasks = require("./tasks/cronTasks");
const http = require("http");

// Connecting to MongoDB
const connectDB = require("./database/dbConfig");

// Ensure the environment variable PORT is defined
const PORT = process.env.PORT || 5000;

// Scheduled tasks
tasks();

connectDB(); // Establish the database connection

const app = express();

app.use(express.json()); // For parsing application/json
app.use(cors());

// Unprotected Routes... Login and Signup
app.use("/api/user", userRoutes);
// Protected Routes ... Miners Data and User Data
app.use("/api/data", minersRoutes);

// Create HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
