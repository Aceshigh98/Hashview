//login user

const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await userModel.login(userName, password);
    res.status(200).json({ userName, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
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
