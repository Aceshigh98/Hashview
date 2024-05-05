import React from "react";
import classes from "./OverallStats.module.css";
import Card from "../../../ui/Card/Card";

// This component is a placeholder for the actual data that will be displayed in the OverallStats section of the Hero component.
const OverallStats = () => {
  const cardProps = {
    type: "Hashrate",
    value: "423",
  };

  return (
    <div className={classes["container"]}>
      <Card {...cardProps} />
      <Card {...cardProps} />
      <Card {...cardProps} />
    </div>
  );
};

export default OverallStats;
