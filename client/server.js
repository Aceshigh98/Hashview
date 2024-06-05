const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Catch all handler to return index.html for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Load SSL certificates
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

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start server on port 443
httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
