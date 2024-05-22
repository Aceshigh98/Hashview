const express = require("express");
const router = express.Router();
const {
  fetchMinersId,
  fetchMinersDetails,
  fetchMiner,
  fetchMinersWorkerNames,
} = require("../controllers/minerController");
const requireAuth = require("../middleware/requireAuth");

// Middleware to parse JSON bodies
router.use(requireAuth);

// Get miner details by ID
router.post("/minerDetails/:id", fetchMiner);
// Get all miners details
router.post("/minersDetails", fetchMinersDetails);
// Get all miners IDs
router.post("/minersIds", fetchMinersId);
//get all miners Worker Names
router.post("/minersWorkerNames", fetchMinersWorkerNames);

module.exports = router;
