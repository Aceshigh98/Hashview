import React from "react";
import classes from "./TotalHashrateChart.module.css";
import BarChart from "../../../ui/BarChart/BarChart";

const TotalHashrateChart = (props) => {
  const data = props;

  return (
    <div className={classes["container"]}>
      <BarChart props={data}></BarChart>
    </div>
  );
};

export default TotalHashrateChart;
