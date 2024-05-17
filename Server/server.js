const cors = require("cors");
const express = require("express");
const minersRoutes = require("./routes/minersRoute");
const userRoutes = require("./routes/user");
const tasks = require("./tasks/cronTasks");

//Connecting to Mongo Database.
const connectDB = require("./database/dbConfig");

//Scheduled tasks
tasks();

connectDB(); // Establish the database connection

const app = express();

app.use(cors());

app.use(express.json()); // For parsing application/json

//Routes
app.use("/api", minersRoutes);
app.use("/api/user", userRoutes);

// Start Server
app.listen(80, () => {
  console.log("Server is running on port 80.");
});
