const express = require("express");
const router = express.Router();
const revenueSchema = require("../schemas/revenueSchema");

router.get("/dailyrevenue", async (req, res) => {
  try {
    const data = await revenueSchema.find();
    res.json(data);
  } catch (error) {
    console.log("Error fetching Data: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
