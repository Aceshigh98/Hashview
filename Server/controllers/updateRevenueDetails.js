const workerDetails = require("../API/luxor");
const minersRevenueModel = require("../schemas/revenueSchema");
const getTime = require("../utils/getCurrentTime");

const updateRevenue = async () => {
  try {
    const data = await workerDetails();
    const time = getTime();
    const userId = "Aceshigh9000";
    const workers = data.data.getWorkerDetails.edges;

    //total revenue pulled in from all miners.
    let revenue = workers.reduce(
      (acc, { node }) => acc + parseFloat(node.revenue || 0),
      0
    );

    const updateOperation = {
      $set: {
        userName: userId,
        lastUpdated: time,
      },
      $push: {},
    };

    updateOperation.$push["revenues"] = { revenue: revenue, date: time };

    //iterate through all of the miners daily revenue into one sum.

    const user = await minersRevenueModel.findOne({ userName: userId });

    if (user) {
      const updateResult = await minersRevenueModel.updateOne(
        { userName: userId },
        updateOperation
      );
    }
    // If the user does not exist, create a new document
    else {
      const newUser = new minersRevenueModel({
        userName: userId,
        lastUpdated: time,
        revenues: [{ revenue }],
      });
      await newUser.save(); // Save the new user document
    }

    console.log("Daily total revenue has been updated.");
  } catch (error) {
    console.log("Error updating revenue: ", error);
  }
};

module.exports = updateRevenue;
