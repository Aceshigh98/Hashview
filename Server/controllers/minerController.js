const minersSchema = require("../models/minersModel.js");

// This should be dynamically assigned based on the context.

//Get Miner based off of MinerId
const fetchMiner = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;
    // Ensure userName is provided
    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }
    const user = await minersSchema.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
    const { userName } = req.body;
    // Ensure userName is provided
    if (!userName) {
      return res.status(400).json({ message: "Username is required: line 35" });
    } // Error
    const user = await minersSchema.findOne({ userName: userName });
    // Ensure user exists
    if (!user) {
      return res.status(404).json({ message: "User not found Error" });
    }
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
    const { userName } = req.body;
    // Ensure userName is provided
    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }
    const user = await minersSchema.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
    const { userName } = req.body;
    // Ensure userName is provided
    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }
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
