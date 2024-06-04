const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const luxorVerify = require("../utils/testLuxor.js");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  luxorUsername: { type: String, required: true },
  luxorKey: { type: String, required: true },
});

// static signup method

userSchema.statics.signup = async function (
  userName,
  password,
  luxorUsername,
  luxorKey
) {
  //Check if all fields are provided
  if (!userName || !password || !luxorUsername || !luxorKey) {
    throw Error("All fields are required");
  }

  //Check if user already exists
  const userExists = await this.findOne({ userName });
  if (userExists) {
    throw new Error("Username already exists.");
  }
  //Check if luxor user already exists
  const luxorUserExists = await this.findOne({ luxorUsername });
  if (luxorUserExists) {
    throw new Error("Luxor username already exists.");
  }
  //Check if password is strong
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character."
    );
  }
  //Check if luxor credentials are valid
  const luxorStatus = await luxorVerify(luxorUsername, luxorKey);
  if (luxorStatus !== 200) {
    throw new Error(
      "Invalid Luxor credentials. Luxor Username and Key must be valid."
    );
  }
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //Create a new user
  const user = await this.create({
    userName,
    password: hash,
    luxorUsername,
    luxorKey,
  });

  return user;
};

// static login method

userSchema.statics.login = async function (userName, password) {
  //Check if all fields are provided
  if (!userName || !password) {
    throw Error("All fields are required");
  }

  //Check if user exists
  const user = await this.findOne({ userName });
  if (!user) {
    throw new Error("User does not exist");
  }

  //Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
