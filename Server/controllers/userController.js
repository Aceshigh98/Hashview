const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { initialWorkerDetails } = require("../service/updateWorkerDetails");

//create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "3d" });
};

//login user

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await userModel.login(userName, password);
    //create token
    const token = createToken(user._id);
    res.status(200).json({ userName, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

//signup user

const signupUser = async (req, res) => {
  console.log(req.body);
  const { userName, password, luxorUsername, luxorKey } = req.body;

  await initialWorkerDetails(userName, luxorUsername, luxorKey);

  try {
    const user = await userModel.signup(
      userName,
      password,
      luxorUsername,
      luxorKey
    );
    //create token
    const token = createToken(user._id);

    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400);
    console.log("POST request failed: Line 47 userController.js");
  }
};

module.exports = { signupUser, loginUser };
