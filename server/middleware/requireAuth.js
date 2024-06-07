const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Verify authentication

  const { authorization } = req.headers;

  // Check if authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: "Authorization header is required" });
  }

  // Split the authorization header to get the token
  const token = authorization.split(" ")[1];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  try {
    // Verify the token
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);

    // Attach the user data to the request object
    req.user = await userModel.findOne({ _id }).select("_id");

    // Check if user exists
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "User not found (requireAuth line 31)" });
    }

    // Move to the next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
