const express = require("express");
const router = express.Router();
const revenueSchema = require("../schemas/revenueSchema");

router.get("/dailyRevenue", async (req, res) => {
  try {
    const pipeline = [
      { $match: { userName: "Aceshigh9000" } },
      {
        $project: {
          _id: 0, // Exclude the _id field
          userName: 1, // Include the userName field
          recentRevenues: { $slice: ["$revenues", -5] }, // Add a new field 'recentRevenues' containing the last 5 elements of the 'revenues' array
        },
      },
    ];

    const data = await revenueSchema.aggregate(pipeline);

    res.json(data);
  } catch (error) {
    console.log("Error fetching Data: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
