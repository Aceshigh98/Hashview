const cors = require("cors");
const express = require("express");
const minersRoutes = require("./routes/minersRoute");
const userRoutes = require("./routes/user");
const tasks = require("./tasks/cronTasks");

//Connecting to Mongo Database.
const connectDB = require("./database/dbConfig");

const PORT = process.env.PORT || 80;

//Scheduled tasks
tasks();

connectDB(); // Establish the database connection

const app = express();

app.use(express.json()); // For parsing application/json
app.use(cors());

//Unprotected Routes... Login and Signup
app.use("/api/user", userRoutes);
//Protected Routes ... Miners Data and User Data
app.use("/api/data", minersRoutes);

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on port 5000.");
});
