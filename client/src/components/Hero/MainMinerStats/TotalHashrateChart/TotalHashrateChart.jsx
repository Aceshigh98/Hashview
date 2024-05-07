import React from "react";
import classes from "./TotalHashrateChart.module.css";
import BarChart from "../../../ui/BarChart/BarChart";

const data = [400, 500, 600, 700, 800];

const TotalHashrateChart = () => {
  return (
    <div className={classes["container"]}>
      <BarChart props={data}></BarChart>
    </div>
  );
};

export default TotalHashrateChart;
