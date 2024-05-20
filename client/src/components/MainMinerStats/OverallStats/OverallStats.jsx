import React from "react";
import classes from "./OverallStats.module.css";
import Card from "../../ui/Card/Card";
import { FaBitcoin } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";

const OverallStats = ({ props }) => {
  const {
    totalHashrate = [],
    totalRevenue = [],
    totalDollarRevenue = 0,
  } = props;

  const hashrateValue =
    totalHashrate.length > 0
      ? (totalHashrate[totalHashrate.length - 1].value / 1000000000000).toFixed(
          2
        )
      : 0;

  const revenueValue =
    totalRevenue.length > 0
      ? totalRevenue[totalRevenue.length - 1].value.toFixed(8)
      : 0;

  const dollarRevenueValue = totalDollarRevenue
    ? totalDollarRevenue.toFixed(2)
    : 0;

  return (
    <div className={classes.container}>
      <Card
        type="Hashrate"
        value={hashrateValue}
        Image={IoMdSpeedometer}
        tag=" TH/s"
      />
      <Card
        type="Daily Bitcoin Revenue"
        value={revenueValue}
        Image={FaBitcoin}
        tag=" BTC"
      />
      <Card
        type="Daily USD Revenue"
        value={dollarRevenueValue}
        Image={FaDollarSign}
        tag="$"
      />
    </div>
  );
};

export default OverallStats;
