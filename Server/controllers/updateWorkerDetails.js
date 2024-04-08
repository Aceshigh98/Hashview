const workerDetails = require("../API/luxor.js");
const minersModel = require("../schemas/minersSchema"); // Assuming this is now the User model
const getTime = require("../utils/getCurrentTime");

const updateWorkerDetails = async () => {
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
          "miners.$.minerId": node.minerId,
          "miners.$.workerName": node.workerName,
          "miners.$.status": node.status,
          "miners.$.hashrate": node.hashrate,
          "miners.$.lastUpdated": time,
        },
      };

      const user = await minersModel.findOne({ userName: userId });

      // If user exists, update or add the miner
      const updateResult = await minersModel.updateOne(
        { userName: userId, "miners.minerId": node.minerId },
        updateOperations
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
                hashrate: node.hashrate,
                lastUpdated: time,
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
              hashrate: node.hashrate,
              lastUpdated: time,
            },
          ],
        });
        await newUser.save();
      }
    }
    console.log(`Updated miner details for all miners. `);
  } catch (error) {
    console.error(`Error updating miner details: `, error);
  }
};

module.exports = updateWorkerDetails;
