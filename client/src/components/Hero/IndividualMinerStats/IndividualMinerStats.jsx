import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../API/data";
import IndividualStats from "./IndividualStats/IndividualStats";
import IndividualMinerTable from "./IndividualMinerTable/IndividualMinerTable";
import IndividialMinerHashrateChart from "./IndividialMinerHashrateChart/IndividialMinerChart";
import IndividualMinerRevenueChart from "./IndividualMinerRevenueChart/IndividualMinerRevenueChart";
import classes from "./IndividualMinerStats.module.css";

const MinerStats = () => {
  const { minerId } = useParams(); // Extract minerId from URL
  const { data } = useContext(DataContext); // Assuming data is an array of miners

  // Find the specific miner from your data
  let miner = null;
  for (const item of data) {
    const foundMiner = item.miners.find((m) => m.minerId === minerId);
    if (foundMiner) {
      miner = foundMiner;
      break; // Stop searching once we find the miner
    }
  }

  // Check if miner data exists
  if (!miner) {
    return <div>Miner not found</div>;
  }

  return (
    <div className={classes["container"]}>
      <div className={classes["stats-container"]}>
        <IndividualStats miner={miner} />
        <IndividualMinerTable miner={miner} />
      </div>
      <div className={classes["chart-container"]}>
        <IndividialMinerHashrateChart miner={miner} />
        <IndividualMinerRevenueChart miner={miner} />
      </div>
    </div>
  );
};

export default MinerStats;
