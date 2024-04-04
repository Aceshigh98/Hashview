const workerDetails = require('../API/luxor.js');
const User = require('../schemas/minersSchema'); // Assuming this is now the User model
const getTime = require('../utils/getCurrentTime');



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
                $push: {
                    [`miners.$.${type}Hashrate`]: {
                        hashrate: node.hashrate,
                        date: time
                    }
                }
            };

            // Conditionally add dailyRevenue to the update if type is 'daily'
            if (type === 'daily') {
                updateOperations.$push['miners.$.dailyRevenue'] = {
                    revenue: node.revenue,
                    date: time
                };
            }

            
            
            
            
            
            const user = await User.findOne({ username: userId });

            if (user) {
                // If user exists, update or add the miner
                const updateResult = await User.updateOne(
                    { username: userId, "miners.minerId": node.minerId },
                    updateOperations,
                    {
                        arrayFilters: [{ "miner.minerId": node.minerId }],
                        upsert: true, // Careful with upsert here as it may not work as expected with arrayFilters without proper initial document structure
                        new: true
                    }
                );

                // If no document was updated (meaning the miner doesn't exist), add the new miner
                if (updateResult.matchedCount === 0) {
                    await User.updateOne(
                        { username: userId },
                        {
                            $push: {
                                miners: {
                                    minerId: node.minerId,
                                    workerName: node.workerName,
                                    status: node.status,
                                    dailyRevenue: [{revenue: node.revenue, date: time}],
                                    lastUpdated: time,
                                    [`${type}Hashrate`]: [{ hashrate: node.hashrate, date: time }] // Pushing a new hashrate object
                                }
                            }
                        }
                    );
                }
            } else {
                // If the user does not exist, create a new document
                const newUser = new User({
                    username: userId,
                    miners: [{
                        minerId: node.minerId,
                        workerName: node.workerName,
                        status: node.status,
                        dailyRevenue: [{revenue: node.revenue, date: time}],
                        lastUpdated: time,
                        [`${type}Hashrate`]: [{ hashrate: node.hashrate, date: time }] // Initialize with the new hashrate object
                    }]
                });
                await newUser.save(); // Save the new user document
            }

        }
        console.log(`Updated ${type} hashrate for all miners.`);
    } catch (error) {
        console.error(`Error updating ${type} hashrate:`, error);
    }
};



module.exports = updateWorkerDetails;

