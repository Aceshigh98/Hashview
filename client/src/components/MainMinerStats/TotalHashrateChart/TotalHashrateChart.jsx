import React from "react";
import classes from "./TotalHashrateChart.module.css";
import BarChart from "../../ui/BarChart/BarChart";

const TotalHashrateChart = ({ props }) => {
  return (
    <div className={classes["container"]}>
      <BarChart props={props}></BarChart>
    </div>
  );
};

export default TotalHashrateChart;
