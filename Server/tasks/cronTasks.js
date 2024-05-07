const cron = require("node-cron");

const updateWorkerDetails = require("../service/updateWorkerDetails");

cron.schedule("15 * * * *", () => {
  console.log("Running task every hour at 15 minutes past.");
  updateWorkerDetails("daily");
});

cron.schedule("30 * * * *", () => {
  console.log("Running task every hour at 30 minutes past.");
  updateWorkerDetails("weekly");
});

cron.schedule("45 * * * *", () => {
  console.log("Running task every hour at 45 minutes past.");
  updateWorkerDetails("monthly");
});

// //Schedule the hashrate updates
// //Set to run at every hour throught the day.
// cron.schedule("0 * * * *", () => updateHashrateDetails("hourly"));
// //Set to run at 12:30 PM once a day.
// cron.schedule("30 12 * * *", () => updateHashrateDetails("daily"));
// //Set to run at 12:30 AM every Sunday.
// cron.schedule("30 0  * * 0", () => updateHashrateDetails("weekly"));

// // Schedule the worker details updates
// //Set to run at 12:45AM once a day.
// cron.schedule(" 45 0 * * *", () => updateWorkerDetails()); // Every 2 minutes

// // // Schedule the revenue updates
// //Set to run at 12:45 PM once a day.
// cron.schedule(" 45 12 * * *", () => updateRevenueDetails()); // Every 2 minutes
