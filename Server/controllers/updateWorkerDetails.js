const workerDetails = require("../API/luxor.js");
const minersModel = require("../schemas/minersSchema"); // Assuming this is now the User model
const getTime = require("../utils/getCurrentTime");

const updateWorkerDetails = async (type) => {
  try {
    const data = await workerDetails();
    const workers = data.data.getWorkerDetails.edges;
    const time = getTime();
    const userId = "Aceshigh9000"; // This needs to be defined or fetched based on your application's logic.

    for (const worker of workers) {
      const node = worker.node;

      // Construct the basic update operations for all updates
      const updateOperations = {
        $set: {
          "miners.$.workerName": node.workerName,
          "miners.$.status": node.status,
          "miners.$.lastUpdated": time,
        },
        $push: {},
      };

      updateOperations.$push[`miners.$.${type}Hashrate`] = {
        hashrate: node.hashrate,
        date: time,
      };

      if (type === "daily") {
        updateOperations.$push["miners.$.dailyRevenue"] = {
          revenue: node.revenue,
          date: time,
        };
      }

      const user = await minersModel.findOne({ userName: userId });

      // If user exists, update or add the miner
      const updateResult = await minersModel.updateOne(
        { userName: userId, "miners.minerId": node.minerId },
        updateOperations,
        {
          arrayFilters: [{ "miners.minerId": node.hashrate }],
        }
      );

      // If no document was updated (meaning the miner doesn't exist), add the new miner
      if (updateResult.matchedCount === 0) {
        await minersModel.updateOne(
          { userName: userId },
          {
            $push: {
              miners: {
                minerId: node.minerId,
                workerName: node.workerName,
                status: node.status,
                dailyRevenue: [{ revenue: node.revenue, date: time }],
                lastUpdated: time,
                [`${type}Hashrate`]: [{ hashrate: node.hashrate, date: time }],
              },
            },
          }
        );
      }

      //If no user was found create and save a new user to db.
      if (!user) {
        const newUser = new minersModel({
          userName: userId,
          miners: [
            {
              minerId: node.minerId,
              workerName: node.workerName,
              status: node.status,
              dailyRevenue: [{ revenue: node.revenue, date: time }],
              lastUpdated: time,
              [`${type}Hashrate`]: [{ hashrate: node.hashrate, date: time }],
            },
          ],
        });
        await newUser.save();
      }
    }
    console.log(`Updated ${type} hashrate for all miners.`);
  } catch (error) {
    console.error(`Error updating ${type} hashrate:`, error);
  }
};

module.exports = updateWorkerDetails;
