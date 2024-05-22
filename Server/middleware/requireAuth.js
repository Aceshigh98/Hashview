const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication

  const { authorization } = req.headers;

  //check if authorization header is present
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  //Split the authorization header to get the token
  const token = authorization.split(" ")[1];

  //verify the token
  try {
    //verify the token
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
    //attach the user data to the request object
    req.user = await userModel.findOne({ _id }).select("_id");
    //move to the next middleware
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuth;
