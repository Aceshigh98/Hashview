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
    let revenue = 0;

    const updateOperation = {
      $set: {
        userName: userId,
        lastUpdated: time,
      },
      $push: {},
    };

    updateOperation.$push[revenue] = { revenue };

    //iterate through all of the miners daily revenue into one sum.
    for (worker of workers) {
      const node = worker.node;
      revenue += parseFloat(node.revenue);
    }

    const user = await minersRevenueModel.findOne({ userName: userId });

    const updateResult = await minersRevenueModel.updateOne(
      {
        userName: userId,
      },
      updateOperation
    );

    // If the user does not exist, create a new document
    if (!user) {
      const newUser = new minersRevenueModel({
        userName: userId,
        lastUpdated: time,
        revenue: revenue,
      });
      await newUser.save(); // Save the new user document
    }

    console.log("Daily total revenue has been updated.");
  } catch (error) {
    console.log("Error updating revenue: ", error);
  }
};

module.exports = updateRevenue;
