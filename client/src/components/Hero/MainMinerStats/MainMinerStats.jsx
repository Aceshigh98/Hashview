import React from "react";
import Title from "../../ui/Title/Title";
import TotalHashrateChart from "./TotalHashrateChart/TotalHashrateChart";
import TotalRevenueChart from "./TotalRevenueChart/TotalRevenueChart";
import OverallStats from "./OverallStats/OverallStats";
import classes from "./MainMinerStats.module.css";

const MainMinerStats = () => {
  return (
    <section className={classes["container"]}>
      <Title />
      <div className={classes["stats-container"]}>
        <OverallStats />
      </div>
      <div className={classes["chart-container"]}>
        <TotalHashrateChart />
        <TotalRevenueChart />
      </div>
    </section>
  );
};

export default MainMinerStats;
