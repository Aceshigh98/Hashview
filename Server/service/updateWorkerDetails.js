const workerDetails = require("../API/luxor.js");
const minersModel = require("../models/minersSchema.js");
const getTime = require("../utils/getCurrentTime.js");
const getDay = require("../utils/getCurrentDay.js");

/*Here's a brief overview of what this function does:

Fetches worker details from an external API.
Checks if a user with a specific userId exists in the database.
If the user doesn't exist, it creates a new user.
For each worker, it updates the worker's details in the user's miners array in the database.
If a worker with a specific minerId doesn't exist in the user's miners array, it adds a new miner to the array.*/

const updateWorkerDetails = async (type, user) => {
  // Extract the username and key from the user object
  const { userName, luxorUsername, luxorKey } = user;

  // Log the user details for debugging
  // console.log("User", user);
  // console.log("Updating worker details for user:", userName);
  // console.log("Luxor Username", luxorUsername);
  // console.log("Key", luxorKey);

  try {
    // Fetch worker details from the external API
    const data = await workerDetails(luxorUsername, luxorKey);
    // Extract the workers array from the response data
    const workers = data.data.getWorkerDetails.edges;
    // Get the current time and day
    const time = getTime();
    // Get the current day
    const day = getDay();
    // Set the userId to the username for now
    const userId = userName; // This should be dynamically assigned based on the context.

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
    // Update the miner details for each worker
    for (const worker of workers) {
      const node = worker.node;
      // Filter to find the miner in the user's miners array
      const filter = { userName: userId, "miners.minerId": node.minerId };
      // Update operations to update the miner details
      const updateOperations = {
        // Update the miner details here
        $set: {
          "miners.$.minerId": node.minerId,
          "miners.$.workerName": node.workerName,
          "miners.$.status": node.status,
          "miners.$.hashrate": node.hashrate,
          lastUpdated: time,
        },
        // Update hashrate chart and table here
        $push: {
          [`miners.$.hashrateChart.${type}`]: {
            $each: [{ value: node.hashrate, date: day }],
            $slice: -5,
          },
          // Add hashrate table updates here
          [`miners.$.hashrateTable.${type}`]: {
            $each: [{ value: node.hashrate, date: day }],
            $slice: -5,
          },
          // Add revenue chart and table updates here
          [`miners.$.revenueChart.${type}`]: {
            $each: [{ value: node.revenue, date: day }],
            $slice: -5,
          },
          // Additional pushes here...
        },
      };
      // Update the miner details in the user's miners array
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

    console.log("Updated miner details for all miners.  User: " + userId);
  } catch (error) {
    console.error("Error updating miner details: " + userName, error);
  }
};

module.exports = updateWorkerDetails;
