import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  const { type, value, image } = props;

  return (
    <div className={classes["container"]}>
      <h3>Miners {type}</h3>
      <img src={image} alt="miner" />
      <h1>{value} TH/S</h1>
    </div>
  );
};

export default Card;
