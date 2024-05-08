import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../ui/Title/Title";
import TotalHashrateChart from "./TotalHashrateChart/TotalHashrateChart";
import TotalRevenueChart from "./TotalRevenueChart/TotalRevenueChart";
import OverallStats from "./OverallStats/OverallStats";
import classes from "./MainMinerStats.module.css";

const MainMinerStats = () => {
  //const [stats, setStats] = useState(null);

  const stats = {
    totalHashrate: [400, 500, 600, 700, 800],
    totalRevenue: [400, 500, 600, 700, 900],
    totalRevenueInDollars: [400, 500, 600, 700, 400],
    dates: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  };

  // useEffect(() => {
  //   axios
  //     .get("/api/stats")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setStats(data);
  //     });
  // }, []);
  return (
    <section className={classes["container"]}>
      <Title />
      <div className={classes["stats-container"]}>
        <OverallStats props={stats} />
      </div>
      <div className={classes["chart-container"]}>
        <TotalHashrateChart props={stats.totalHashrate} />
        <TotalRevenueChart props={stats.totalRevenue} />
      </div>
    </section>
  );
};

export default MainMinerStats;
