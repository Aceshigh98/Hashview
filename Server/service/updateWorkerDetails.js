// This file contains the functions to update the worker details in the database

const minersModel = require("../models/minersModel");
const workerDetails = require("../API/luxor");
const { getTime, getDay } = require("../utils/time.js");

// This function is used to fetch the worker details from the Luxor API

const fetchWorkerDetails = async (luxorUsername, luxorKey) => {
  try {
    const data = await workerDetails(luxorUsername, luxorKey);
    return data.data.getWorkerDetails.edges;
  } catch (error) {
    console.error("Error fetching worker details from Luxor API");
    return error;
  }
};

// This function is use to calculate the total hashrate and revenue of all the workers

const calculateTotals = (workers) => {
  let totalHashrate = 0;
  let totalRevenue = 0;
  for (const worker of workers) {
    totalHashrate += Number(worker.node.hashrate);
    totalRevenue += Number(worker.node.revenue);
  }
  return { totalHashrate, totalRevenue };
};

// This function is used to update the miner details in the database

const updateMinerDetails = async (userId, worker, type, day, time) => {
  const node = worker.node;
  const filter = { userName: userId, "miners.minerId": node.minerId };
  const updateOperations = {
    $set: {
      "miners.$.minerId": node.minerId,
      "miners.$.workerName": node.workerName,
      "miners.$.status": node.status,
      "miners.$.hashrate": node.hashrate,
      lastUpdated: time,
    },
    $push: {
      [`miners.$.hashrateChart.${type}`]: {
        $each: [{ value: node.hashrate, date: day }],
        $slice: -5,
      },
      [`miners.$.hashrateTable.${type}`]: {
        $each: [{ value: node.hashrate, date: day }],
        $slice: -5,
      },
      [`miners.$.revenueChart.${type}`]: {
        $each: [{ value: node.revenue, date: day }],
        $slice: -5,
      },
    },
  };
  const options = {
    arrayFilters: [{ "miners.minerId": node.minerId }],
    upsert: false,
  };
  const updateResult = await minersModel.updateOne(
    filter,
    updateOperations,
    options
  );
  return updateResult;
};

//This function will update the totalhashrate and totalReveneue of the user

const updateTotalHashrateAndRevenue = async (
  userId,
  totalHashrate,
  totalRevenue,
  day
) => {
  const filter = { userName: userId };
  const updateOperation = {
    $push: {
      totalHashrate: {
        $each: [{ value: totalHashrate, date: day }],
        $slice: -8,
      },
      totalRevenue: {
        $each: [{ value: totalRevenue, date: day }],
        $slice: -8,
      },
    },
  };

  const updateResult = await minersModel.updateOne(filter, updateOperation);
  return updateResult;
};

// This function is used to add a new miner to the database

const addNewMiner = async (userId, worker, type, time) => {
  const node = worker.node;
  const updateResult = await minersModel.updateOne(
    { userName: userId },
    {
      $push: {
        miners: {
          minerId: node.minerId,
          workerName: node.workerName,
          status: node.status,
          hashrate: node.hashrate,
          hashrateChart: {
            [type]: [{ value: node.hashrate, date: time }],
          },
          revenueChart: { [type]: [{ value: node.revenue, date: time }] },
          revenueTable: { [type]: [{ value: node.revenue, date: time }] },
        },
      },
    }
  );
  return updateResult;
};

// This function is used to update the worker details

const updateWorkerDetails = async (type, user) => {
  const { userName, luxorUsername, luxorKey } = user;
  const userId = userName;
  const time = getTime();
  const day = getDay();

  try {
    // Fetch the worker details from the Luxor API
    const workers = await fetchWorkerDetails(luxorUsername, luxorKey);

    // Calculate the total hashrate and revenue of all the workers
    const { totalHashrate, totalRevenue } = calculateTotals(workers);

    // Check if the user exists in the database
    let userDoc = await minersModel.findOne({ userName: userId });
    if (!userDoc) {
      userDoc = new minersModel({
        userName: userId,
        miners: [],
        totalHashrate: [],
        totalRevenue: [],
        lastUpdated: time,
      });
      await userDoc.save();
    }

    // Update the miner details for all the workers
    for (const worker of workers) {
      const updateResult = await updateMinerDetails(
        userId,
        worker,
        type,
        day,
        time
      );
      if (updateResult.matchedCount === 0) {
        await addNewMiner(userId, worker, type, time);
      }
    }

    // Update the total hashrate and revenue of the user
    await updateTotalHashrateAndRevenue(
      userId,
      totalHashrate,
      totalRevenue,
      day
    );

    console.log(`Updated miner details for all miners. User: ${userId}`);
  } catch (error) {
    console.error(`Error updating miner details: ${userName}`, error);
  }
};

const initialWorkerDetails = async (userName, luxorUsername, luxorKey) => {
  const time = getTime();
  const day = getDay();

  try {
    // Fetch the worker details from the Luxor API
    const workers = await fetchWorkerDetails(luxorUsername, luxorKey);

    // Calculate the total hashrate and revenue of all the workers
    const { totalHashrate, totalRevenue } = calculateTotals(workers);

    // Check if the user exists in the database
    let userDoc = await minersModel.findOne({ userName: userName });

    if (!userDoc) {
      userDoc = new minersModel({
        userName: userName,
        miners: [],
        totalHashrate: [],
        totalRevenue: [],
        lastUpdated: time,
      });
      await userDoc.save();
    }

    // Update the miner details for all the workers
    for (const worker of workers) {
      const updateResult = await updateMinerDetails(
        userName,
        worker,
        day,
        time
      );
      if (updateResult.matchedCount === 0) {
        await addNewMiner(userName, worker, time);
      }
    }

    // Update the total hashrate and revenue of the user
    await updateTotalHashrateAndRevenue(
      userName,
      totalHashrate,
      totalRevenue,
      day
    );

    console.log(`Updated miner details for all miners. User: ${userName}`);
  } catch (error) {
    console.error(`Error updating miner details: ${userName}`, error);
  }
};

module.exports = { updateWorkerDetails, initialWorkerDetails };
