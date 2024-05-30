const user = require("../models/userModel");

const getUserCredentials = async () => {
  try {
    const users = await user.find({}, "userName luxorUsername luxorKey").exec();

    if (!users || users.length === 0) {
      console.log("No users found in the database");
      return [];
    }

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
