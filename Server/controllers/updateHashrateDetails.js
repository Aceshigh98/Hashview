const workerDetails = require("../API/luxor.js");
const hashRateModel = require("../schemas/hashrateSchema"); // Assuming this is now the User model
const getTime = require("../utils/getCurrentTime");

const updateHashrateDetails = async (type) => {
  try {
    const data = await workerDetails();
    const time = getTime();
    const userId = "Aceshigh9000"; // This needs to be defined or fetched based on your application's logic.
    const workers = data.data.getWorkerDetails.edges;

    //iterate over each worker that is being retrieved from the luxor API.
    for (const worker of workers) {
      const node = worker.node;

      // Construct the basic update operations for all updates

      const updateOperations = {
        $set: {
          username: userId,
          lastUpdated: time,
        },

        $push: {},
      };

      updateOperations.$push[`hashrates.$.${type}Hashrate`] = {
        minerId: node.minerId,
        hashrate: node.hashrate,
        date: time,
      };

      const user = await hashRateModel.findOne({ username: userId });

      console.log(user);

      const updateResult = await hashRateModel.updateOne(
        { username: userId },
        updateOperations
      );

      // If no document was updated (meaning the miner doesn't exist), add the new miner
      if (updateResult.matchedCount === 0) {
        await hashRateModel.updateOne(
          { username: userId },
          {
            $push: {
              [`${type}Hashrate`]: {
                minerId: node.minerId,
                hashrate: node.hashrate,
                date: time,
              },
            },
          }
        );
      }

      // If the user does not exist, create a new document

      if (!user) {
        const newUser = new hashRateModel({
          username: userId,
          lastUpdated: time,
          hashrates: {
            [`${type}Hashrate`]: [
              { minerId: node.minerId, hashrate: node.hashrate, date: time },
            ],
          }, // Initialize with the new hashrate object],
        });
        console.log("Hashrate-Debug: " + newUser);
        await newUser.save(); // Save the new user document
      }
    }
    console.log(`Updated ${type} hashrate for all miners.`);
  } catch (error) {
    console.error(`Error updating ${type} hashrate:`, error);
  }
};

module.exports = updateHashrateDetails;
