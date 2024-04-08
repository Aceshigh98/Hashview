const express = require("express");
const router = express.Router();
const hashRateSchema = require("../schemas/hashrateSchema");

//Wire up routes where it fetches the username.

const userName = "Aceshigh9000";

//Hourly hashrate route.

router.get("/hashrate/:type", async (req, res) => {
  try {
    const { type } = req.params; // Extract 'type' from URL parameters

    // Validate 'type' to ensure it's one of the allowed values
    if (!["hourlyHashrate", "dailyHashrate", "weeklyHashrate"].includes(type)) {
      return res.status(400).json({ message: "Invalid hashrate type" });
    }

    const pipeline = [
      {
        $match: { userName: userName },
      },
      {
        $project: {
          hashrates: {
            $map: {
              input: "$hashrates",
              as: "hashrate",
              in: {
                minerId: "$$hashrate.minerId",
                [type]: { $slice: [`$$hashrate.${type}`, -5] }, // Dynamically slice the specified type of hashrate
              },
            },
          },
          userName: userName, // Include userName in the projection
        },
      },
    ];

    const data = await hashRateSchema.aggregate(pipeline);

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching Data: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
