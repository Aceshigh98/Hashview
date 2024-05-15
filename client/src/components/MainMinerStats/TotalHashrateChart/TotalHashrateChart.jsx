import React from "react";
import classes from "./TotalHashrateChart.module.css";
import BarChart from "../../ui/BarChart/BarChart";

const TotalHashrateChart = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["chart-container"]}>
        <BarChart {...props} />
      </div>
    </div>
  );
};

export default TotalHashrateChart;
