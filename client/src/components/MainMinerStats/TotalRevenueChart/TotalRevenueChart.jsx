import React from "react";
import LineChart from "../../ui/LineChart/LineChart";
import classes from "./TotalRevenueChart.module.css";

const TotalRevenueChart = (props) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["chart-container"]}>
        <LineChart {...props} />
      </div>
    </div>
  );
};

export default TotalRevenueChart;
