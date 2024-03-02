
const workerDetails = require('../API/luxor.js');
const Schema = require('../database/dbSchema.js'); 

//Mongo Connection

const getCurrentTimeInCT = () => {
    const UTC = new Date();
    const options = { timeZone: 'America/Chicago', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(UTC);
};

const updateHashrate = async (type) => {
    try {
        const data = await workerDetails();
        const workers = data.data.getWorkerDetails.edges;
        const currentTime = getCurrentTimeInCT();

        for (const worker of workers) {
            const node = worker.node;
            const updateOperation = {
                $set: {
                    minerId: node.minerId,
                    workerName: node.workerName,
                    status: node.status,
                    lastUpdated: currentTime 
                },


                $push: {
                    [`${type}Hashrate`]: { // Dynamically target the correct hashrate field
                        hashrate: node.hashrate,
                        date: currentTime
                    }
                }
            };

            await Schema.findOneAndUpdate(
                { minerId: node.minerId },
                updateOperation,
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
        }

        console.log(`Updated ${type} hashrate for all miners.`);
    } catch (error) {
        console.error(`Error updating ${type} hashrate:`, error);
    }
}

module.exports = updateHashrate;