import React from "react";
import classes from "./TotalHashrateChart.module.css";
import BarChart from "../../ui/BarChart/BarChart";

const TotalHashrateChart = ({ values, dates }) => {
  const formattedValues = values.map((item) =>
    (item / 1000000000000).toFixed(2)
  );
  return (
    <div className={classes.container}>
      <div className={classes["chart-container"]}>
        <BarChart values={formattedValues} dates={dates} />
      </div>
    </div>
  );
};

export default TotalHashrateChart;
