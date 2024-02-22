
const workerDetails = require('./luxor.js');

async function fetchGraphQLData() {
    try {
        const data = await workerDetails();
        const edges = data.data.getWorkerDetails.edges;
        console.log(edges);

        // Map each worker detail to a separate object
        const workerObjects = edges.map(edge => {
            const node = edge.node;
            const workerName = node.workerName;
            const minerId = node.minerId;
            const status = node.status;
            const hashrate = node.hashrate;

            return {
                minerId: minerId,
                workerName: workerName,
                status: status,
                hashrate: hashrate,
                time: Date.now()
            };
        });

        return workerObjects;
    } catch (error) {
        console.error('Error:', error);
        // Handle errors here
        throw error; // Re-throwing the error to propagate it further if needed
    }
}

module.exports = fetchGraphQLData;