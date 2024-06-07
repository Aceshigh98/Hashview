const cors = require("cors");
const express = require("express");
const https = require("https");
const fs = require("fs");
const minersRoutes = require("./routes/minersRoute");
const userRoutes = require("./routes/user");
const tasks = require("./tasks/cronTasks");

// Connecting to MongoDB
const connectDB = require("./database/dbConfig");

const PORT = process.env.PORT || 443; // Change to the HTTPS port

// Scheduled tasks
tasks();

connectDB(); // Establish the database connection

const app = express();

// Let's Encrypt SSL Certificate
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/www.hash-view.com/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/www.hash-view.com/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/www.hash-view.com/chain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const httpsServer = https.createServer(credentials, app);

app.use(express.json()); // For parsing application/json
app.use(cors());

// Unprotected Routes... Login and Signup
app.use("/api/user", userRoutes);
// Protected Routes ... Miners Data and User Data
app.use("/api/data", minersRoutes);

// Start HTTPS Server
httpsServer.listen(PORT, () => {
  console.log("Server is running on port 5000 over HTTPS.");
});
