const minersSchema = require("../models/minersSchema");

// This should be dynamically assigned based on the context.
const userName = "Aceshigh9000";

//Get Miner based off of MinerId
const fetchMiner = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await minersSchema.findOne({ userName: userName });
    const miner = user.miners.find((miner) => miner.minerId === id);
    res.json(miner);
  } catch (error) {
    console.log("Error fetching Miner", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get all miners Ids
const fetchMinersId = async (req, res) => {
  try {
    const user = await minersSchema.findOne({ userName: userName });
    const minerIds = user.miners.map((miner) => miner.minerId);
    res.json(minerIds);
  } catch (error) {
    console.log("Error fetching Miner", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all miners Worker Names
const fetchMinersWorkerNames = async (req, res) => {
  try {
    const user = await minersSchema.findOne({ userName: userName });
    const minerWorkerNames = user.miners.map((miner) => miner.workerName);
    res.json(minerWorkerNames);
  } catch (error) {
    console.log("Error fetching Miner: All Miner Worker Names", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get all miners details
const fetchMinersDetails = async (req, res) => {
  try {
    const allDetails = await minersSchema.findOne({ userName: userName });
    res.json(allDetails);
  } catch (error) {
    console.log("Error fetching Miner: All Miner Details", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  fetchMiner,
  fetchMinersDetails,
  fetchMinersWorkerNames,
  fetchMinersId,
};
