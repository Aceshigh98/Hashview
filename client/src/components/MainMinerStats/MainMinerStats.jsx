import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../ui/Title/Title";
import TotalHashrateChart from "./TotalHashrateChart/TotalHashrateChart";
import TotalRevenueChart from "./TotalRevenueChart/TotalRevenueChart";
import OverallStats from "./OverallStats/OverallStats";
import classes from "./MainMinerStats.module.css";

const MainMinerStats = () => {
  // Use the useState hook to create a state variable and a function to update it
  const [stats, setStats] = useState({
    userName: "",
    totalHashrate: [],
    totalRevenue: [],
    totalDollarRevenue: 0,
  });

  useEffect(() => {
    const fetchMinerDetails = async () => {
      try {
        // Fetch miner details
        const minerDetailsResponse = await axios.get(
          "http://localhost:80/api/minersDetails"
        );
        const minerDetailsData = minerDetailsResponse.data;

        setStats((prevStats) => ({
          ...prevStats,
          totalHashrate: minerDetailsData.totalHashrate,
          totalRevenue: minerDetailsData.totalRevenue,
          userName: minerDetailsData.userName,
        }));

        // Fetch BTC data
        const btcDataResponse = await axios.get(
          "http://api.aceshighbitcoin.com/API_DATA"
        );
        const btcData = btcDataResponse.data;
        // Calculate total dollar revenue
        const lastTotalRevenue =
          minerDetailsData.totalRevenue[
            minerDetailsData.totalRevenue.length - 1
          ].value;
        // Update the state variable with the new data
        setStats((prevStats) => ({
          ...prevStats,
          totalDollarRevenue: btcData.btcData.price * lastTotalRevenue,
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchMinerDetails();
  }, []);

  // Check if the necessary data properties are available and in the correct format
  return (
    <div className={classes.container}>
      <Title username={stats.userName} />
      <div className={classes["stats-container"]}>
        <OverallStats props={stats} />
      </div>
      <div className={classes["chart-container"]}>
        <TotalHashrateChart
          values={stats.totalHashrate.map((item) => item.value)}
          dates={stats.totalHashrate.map((item) => item.date)}
        />
        <TotalRevenueChart
          values={stats.totalRevenue.map((item) => item.value)}
          dates={stats.totalRevenue.map((item) => item.date)}
        />
      </div>
    </div>
  );
};

export default MainMinerStats;
