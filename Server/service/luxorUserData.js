const user = require("../models/userModel");

const getUserCredentials = async () => {
  try {
    const users = await user.find({}, "userName luxorUsername luxorKey").exec();

    const usersDetails = users.map((user) => {
      return {
        userName: user.userName,
        luxorUsername: user.luxorUsername,
        luxorKey: user.luxorKey,
      };
    });

    console.log("usersDetails", usersDetails);
    return usersDetails;
  } catch (error) {
    console.log("Error in getUserCredentials", error);
    throw error;
  }
};

module.exports = getUserCredentials;
