const cron = require('node-cron');

// Assuming updateHashrate is a function defined in updateDB.js
//const updateWorkerDetails = require('./database/updateWorkerDetails');
const updateHashrateDetails = require('../controllers/updateHashrateDetails');
const updateWorkerDetails = require('../controllers/updateWorkerDetails');

const controller = (type) => {
    updateWorkerDetails(type);
    updateHashrateDetails(type);
}

// Schedule the hashrate updates
//cron.schedule('* * * * *', () => console.log('This is a test cron job running every minute.'));

controller('daily');

//cron.schedule('* * * * *', () => updateHashrate('hourly')); // Every minute
//cron.schedule('*/2 * * * *', () => updateHashrate('daily')); // Every 2 minutes
//cron.schedule('*/3 * * * *', () => updateHashrate('weekly')); // Every 3 minutes