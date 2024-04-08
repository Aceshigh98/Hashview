const cron = require("node-cron");

// Assuming updateHashrate is a function defined in updateDB.js
//const updateWorkerDetails = require('./database/updateWorkerDetails');
const updateHashrateDetails = require("../controllers/updateHashrateDetails");
const updateWorkerDetails = require("../controllers/updateWorkerDetails");
const updateRevenueDetails = require("../controllers/updateRevenueDetails");

const scheduledTasks = (type) => {
  //updateWorkerDetails(type);
  //updateHashrateDetails(type);
  updateRevenueDetails();
};

// Schedule the hashrate updates
//cron.schedule('* * * * *', () => console.log('This is a test cron job running every minute.'));

scheduledTasks("weekly");

//cron.schedule('* * * * *', () => updateHashrate('hourly')); // Every minute
//cron.schedule('*/2 * * * *', () => updateHashrate('daily')); // Every 2 minutes
//cron.schedule('*/3 * * * *', () => updateHashrate('weekly')); // Every 3 minutes
