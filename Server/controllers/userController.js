//login user

const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ messg: "Signup User" });
};

//signup user

const signupUser = async (req, res) => {
  const { userName, password, luxorUsername, luxorKey } = req.body;

  try {
    const user = await userModel.signup(
      userName,
      password,
      luxorUsername,
      luxorKey
    );
    res.status(200).json({ userName, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signupUser, loginUser };
