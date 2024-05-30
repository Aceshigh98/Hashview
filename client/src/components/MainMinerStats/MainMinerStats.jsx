import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import Title from "../ui/Title/Title";
import TotalHashrateChart from "./TotalHashrateChart/TotalHashrateChart";
import TotalRevenueChart from "./TotalRevenueChart/TotalRevenueChart";
import OverallStats from "./OverallStats/OverallStats";
import classes from "./MainMinerStats.module.css";

const MainMinerStats = () => {
  // Get user from AuthContext
  const { user } = useAuthContext();

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
        const minerDetailsResponse = await axios.post(
          "http://localhost:5000/api/data/minersDetails",
          {
            userName: user.userName,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const minerDetailsData = minerDetailsResponse.data;

        setStats((prevStats) => ({
          ...prevStats,
          totalHashrate: minerDetailsData.totalHashrate,
          totalRevenue: minerDetailsData.totalRevenue,
          userName: minerDetailsData.userName,
        }));

        // Fetch BTC data
        const options = {
          headers: {
            accept: "application/json",
          },
        };

        // Fetch the current price of BTC
        const btcDataResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            ...options,
            params: {
              vs_currency: "usd",
              ids: "bitcoin",
            },
          }
        );
        // Extract the current price of BTC
        const btcData = btcDataResponse.data[0].current_price;

        // Calculate total dollar revenue
        const lastTotalRevenue =
          minerDetailsData.totalRevenue[
            minerDetailsData.totalRevenue.length - 1
          ].value;
        // Update the state variable with the new data
        setStats((prevStats) => ({
          ...prevStats,
          totalDollarRevenue: btcData * lastTotalRevenue,
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    // Check if the user is logged in
    if (user) {
      fetchMinerDetails();
    }
  }, [user]); // Removed `stats` from the dependency array

  // Check if the necessary data properties are available and in the correct format
  return (
    <div className={classes.container}>
      <Title username={stats.userName} />
      <div className={classes["stats-container"]}>
        <OverallStats stats={stats} />
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
