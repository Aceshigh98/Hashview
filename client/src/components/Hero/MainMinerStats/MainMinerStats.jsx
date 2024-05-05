import React from "react";
import Title from "../../ui/Title/Title";
import TotalHashrateChart from "./TotalHashrateChart/TotalHashrateChart";
import TotalRevenueChart from "./TotalRevenueChart/TotalRevenueChart";
import classes from "./MainMinerStats.module.css";

const MainMinerStats = () => {
  return (
    <div className={classes.container}>
      <Title />
      <div className={classes["chart-container"]}>
        <TotalHashrateChart />
        <TotalRevenueChart />
      </div>
    </div>
  );
};

export default MainMinerStats;
