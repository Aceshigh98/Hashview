import React from "react";
import LineChart from "../../ui/LineChart/LineChart";
import classes from "./TotalRevenueChart.module.css";

const TotalRevenueChart = ({ values, dates }) => {
  const formattedValues = values.map((item) => item.toFixed(8));

  return (
    <div className={classes["container"]}>
      <div className={classes["chart-container"]}>
        <LineChart values={formattedValues} dates={dates} />
      </div>
    </div>
  );
};

export default TotalRevenueChart;
