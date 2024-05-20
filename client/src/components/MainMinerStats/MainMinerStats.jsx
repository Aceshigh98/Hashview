import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../ui/Title/Title";
import TotalHashrateChart from "./TotalHashrateChart/TotalHashrateChart";
import TotalRevenueChart from "./TotalRevenueChart/TotalRevenueChart";
import OverallStats from "./OverallStats/OverallStats";
import classes from "./MainMinerStats.module.css";

const MainMinerStats = () => {
  const [stats, setStats] = useState({
    userName: "",
    totalHashrate: [],
    totalRevenue: [],
    totalDollarRevenue: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:80/api/minersDetails")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);

        setStats({
          totalHashrate: data.totalHashrate,
          totalRevenue: data.totalRevenue,
        });
        axios
          .get("http://api.aceshighbitcoin.com/API_DATA")
          .then((res) => res.data)
          .then((data) => {
            console.log(data.btcData.price);
            console.log(stats.totalRevenue[stats.totalRevenue.length - 1]);
            setStats({
              ...stats,
              totalDollarRevenue:
                data.btcData.price *
                stats.totalRevenue[stats.totalRevenue.length - 1],
            });
          });
      });

    console.log(stats);
  }, []);
  return (
    <div className={classes["container"]}>
      <Title username={stats.userNAme} />
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
