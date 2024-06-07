import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import IndividualStats from "./IndividualStats/IndividualStats";
import IndividualMinerTable from "./IndividualMinerTable/IndividualMinerTable";
import IndividialMinerHashrateChart from "./IndividialMinerHashrateChart/IndividialMinerChart";
import IndividualMinerRevenueChart from "./IndividualMinerRevenueChart/IndividualMinerRevenueChart";
import classes from "./IndividualMinerStats.module.css";

const MinerStats = () => {
  // Get user from AuthContext
  const { user } = useAuthContext();
  const { minerId } = useParams(); // Extract minerId from URL
  const [miner, setMiner] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }
    // Fetch miner data
    const fetchMiner = async () => {
      try {
        const response = await axios.post(
          `https://www.hash-view.com/api/data/minerDetails/${minerId}`,
          {
            userName: user.userName,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setMiner(response.data);
      } catch (err) {
        console.error("Error fetching miner data:", err);
      }
    };

    fetchMiner();
  }, [minerId, user, navigate]); // Add minerId as a dependency and user

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
