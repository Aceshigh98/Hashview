const workerDetails = require("../API/luxor.js");
const minersModel = require("../schemas/minersSchema");
const getTime = require("../utils/getCurrentTime");

const updateWorkerDetails = async (type) => {
  try {
    const data = await workerDetails();
    const workers = data.data.getWorkerDetails.edges;
    const time = getTime();
    const userId = "Aceshigh9000"; // This should be dynamically assigned based on the context.

    // Check if the user exists first to minimize unnecessary operations
    let user = await minersModel.findOne({ userName: userId });
    if (!user) {
      // Create a new user if not found
      user = new minersModel({
        userName: userId,
        miners: [],
        lastUpdated: time,
      });
      await user.save();
    }

    for (const worker of workers) {
      const node = worker.node;

      const filter = { userName: userId, "miners.minerId": node.minerId };
      const updateOperations = {
        $set: {
          "miners.$.minerId": node.minerId,
          "miners.$.workerName": node.workerName,
          "miners.$.status": node.status,
          "miners.$.hahsrate": node.hashrate,
        },
        $push: {
          [`miners.$.hashrateChart.${type}`]: {
            $each: [{ value: node.hashrate, date: time }],
            $slice: -5,
          },

          [`miners.$.revenueTable.${type}`]: {
            $each: [{ value: node.hashrate, date: time }],
            $slice: -5,
          },

          [`miners.$.revenueChart.${type}`]: {
            $each: [{ value: node.revenue, date: time }],
            $slice: -5,
          },
          // Additional pushes here...
        },
      };
      const options = {
        arrayFilters: [{ "miners.minerId": node.minerId }],
        upsert: false,
      };

      const updateResult = await minersModel.updateOne(
        filter,
        updateOperations,
        options
      );
      console.log("Update result for minerId:", node.minerId, updateResult); // Log the outcome of the update
      if (updateResult.matchedCount === 0) {
        // If no miner was matched, add it to the user's miner array
        await minersModel.updateOne(
          { userName: userId },
          {
            $push: {
              miners: {
                minerId: node.minerId,
                workerName: node.workerName,
                status: node.status,
                hashrate: node.hashrate,
                hashrateChart: {
                  [type]: [{ value: node.hashrate, date: time }],
                },
                revenueChart: { [type]: [{ value: node.revenue, date: time }] },
                revenueTable: { [type]: [{ value: node.revenue, date: time }] },
              },
            },
          }
        );
      }
    }

    console.log("Updated miner details for all miners.");
  } catch (error) {
    console.error("Error updating miner details:", error);
  }
};

module.exports = updateWorkerDetails;
