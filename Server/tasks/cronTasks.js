// scheduler.js
const cron = require("node-cron");
const getUserCredentials = require("../service/luxorUserData");
const updateWorkerDetails = require("../service/updateWorkerDetails");

const tasks = async () => {
  try {
    const userCredentials = await getUserCredentials();
    // Execute the task immediately for all users
    for (const credentials of userCredentials) {
      await updateWorkerDetails("daily", credentials);
    }
    // Schedule the task to run every hour at 15, 30, and 45 minutes past
    cron.schedule("15 * * * *", () => {
      for (const credentials of userCredentials) {
        console.log("Running task every hour at 15 minutes past.");
        updateWorkerDetails("daily", credentials);
      }
    });

    // Schedule the task to run every hour at 30 minutes past

    cron.schedule("30 * * * *", () => {
      for (const credentials of userCredentials) {
        console.log("Running task every hour at 30 minutes past.");
        updateWorkerDetails("weekly", credentials);
      }
    });

    // Schedule the task to run every hour at 45 minutes past

    cron.schedule("45 * * * *", () => {
      for (const credentials of userCredentials) {
        console.log("Running task every hour at 45 minutes past.");
        updateWorkerDetails("monthly", credentials);
      }
    });
  } catch (error) {
    console.error("Error setting up cron jobs:", error);
  }
};

module.exports = tasks;
