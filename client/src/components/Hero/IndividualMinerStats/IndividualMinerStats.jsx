import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IndividualStats from "./IndividualStats/IndividualStats";
import IndividualMinerTable from "./IndividualMinerTable/IndividualMinerTable";
import IndividialMinerHashrateChart from "./IndividialMinerHashrateChart/IndividialMinerChart";
import IndividualMinerRevenueChart from "./IndividualMinerRevenueChart/IndividualMinerRevenueChart";
import classes from "./IndividualMinerStats.module.css";

const MinerStats = () => {
  const { minerId } = useParams(); // Extract minerId from URL

  const [miner, setMiner] = useState(null);

  useEffect(() => {
    const fetchMiner = async () => {
      const response = await axios.get(
        `http://localhost:80/api/minerDetails/${minerId}`
      );
      const data = response.data; // Change this line
      console.log(data);
      setMiner(data);
    };

    fetchMiner();
  }, [minerId]); // Add minerId as a dependency

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
