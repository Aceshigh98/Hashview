import React from "react";
import BarChart from "../../ui/BarChart/BarChart";
import classes from "./TotalRevenueChart.module.css";

const TotalRevenueChart = ({ props }) => {
  return (
    <div className={classes["container"]}>
      <BarChart props={props}></BarChart>;
    </div>
  );
};

export default TotalRevenueChart;
