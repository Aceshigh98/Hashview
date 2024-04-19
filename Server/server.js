const cors = require("cors");
const express = require("express");
const minerDetailsRoute = require("./routes/minersDetailsRoute");
const minerHashratesRoute = require("./routes/minersHashratesRoute");
const minerRevenueRoute = require("./routes/minersRevenueRoute");

//Connecting to Mongo Database.
const connectDB = require("./database/dbConfig");

//Scheduled tasks
require("./tasks/cronTasks");

connectDB(); // Establish the database connection

const app = express();

app.use(cors());

app.use(express.json()); // For parsing application/json

//Routes
app.use("/api", minerDetailsRoute);

// Start Server
app.listen(80, () => {
  console.log("Server is running on port 80.");
});
