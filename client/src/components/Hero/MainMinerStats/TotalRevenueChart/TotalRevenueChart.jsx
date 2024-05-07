import React from "react";
import BarChart from "../../../ui/BarChart/BarChart";
import classes from "./TotalRevenueChart.module.css";

const data = [400, 500, 600, 700, 800];

const TotalRevenueChart = () => {
  return (
    <div className={classes["container"]}>
      <BarChart props={data}></BarChart>;
    </div>
  );
};

export default TotalRevenueChart;
