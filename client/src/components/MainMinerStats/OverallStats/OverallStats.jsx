import React from "react";
import classes from "./OverallStats.module.css";
import Card from "../../ui/Card/Card";
import { FaBitcoin } from "react-icons/fa6";
import { IoMdSpeedometer } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";

// This component is a placeholder for the actual data that will be displayed in the OverallStats section of the Hero component.
const OverallStats = ({ props }) => {
  return (
    <div className={classes["container"]}>
      <Card
        type={"Hashrate"}
        value={
          props.totalHashrate && props.totalHashrate.length > 0
            ? props.totalHashrate[props.totalHashrate.length - 1]
            : 0
        }
        Image={IoMdSpeedometer}
        tag={" TH/s"}
      />
      <Card
        type={"Daily Bitcoin Revenue"}
        value={
          props.totalRevenue && props.totalRevenue.length > 0
            ? props.totalRevenue[props.totalRevenue.length - 1]
            : 0
        }
        Image={FaBitcoin}
        tag={" BTC"}
      />
      <Card
        type={"Daily USD Revenue"}
        value={
          props.totalDollarRevenue && props.totalDollarRevenue.length > 0
            ? props.totalDollarRevenue[props.totalDollarRevenue.length - 1]
            : 0
        }
        Image={FaDollarSign}
        tag={" $"}
      />
    </div>
  );
};

export default OverallStats;
