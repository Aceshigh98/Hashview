const cron = require("node-cron");
const getUserCredentials = require("../service/luxorUserData");
const { updateWorkerDetails } = require("../service/updateWorkerDetails");

// scheduler.js

const tasks = async () => {
  try {
    const userCredentials = await getUserCredentials();
    // Execute the task immediately for all users
    for (const credentials of userCredentials) {
      await updateWorkerDetails("daily", credentials);
    }
    // Schedule the task to run every day at 1:00 AM
    cron.schedule("0 1 * * *", () => {
      for (const credentials of userCredentials) {
        console.log("Running task every day at 1:00 AM.");
        updateWorkerDetails("daily", credentials);
      }
    });

    // Schedule the task to run every Monday at 2:00 AM
    cron.schedule("0 2 * * 1", () => {
      for (const credentials of userCredentials) {
        console.log("Running task every Monday at 2:00 AM.");
        updateWorkerDetails("weekly", credentials);
      }
    });

    // Schedule the task to run on the 1st day of every month at 3:00 AM
    cron.schedule("0 3 1 * *", () => {
      for (const credentials of userCredentials) {
        console.log("Running task on the 1st day of every month at 3:00 AM.");
        updateWorkerDetails("monthly", credentials);
      }
    });
  } catch (error) {
    console.error("Error setting up cron jobs:", error);
  }
};

module.exports = tasks;
