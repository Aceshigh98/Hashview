const express = require("express");
const router = express.Router();
const {
  fetchMinersId,
  fetchMinersDetails,
  fetchMiner,
  fetchMinersWorkerNames,
} = require("../controllers/minerController");

// Get miner details by ID
router.get("/minerDetails/:id", fetchMiner);
// Get all miners details
router.get("/minersDetails", fetchMinersDetails);
// Get all miners IDs
router.get("/minersIds", fetchMinersId);
//get all miners Worker Names
router.get("/minersWorkerNames", fetchMinersWorkerNames);

module.exports = router;
