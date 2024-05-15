import React from "react";
import classes from "./Card.module.css";

const Card = ({ type, value, Image, tag }) => {
  return (
    <div className={classes["container"]}>
      <h3>Miners {type}</h3>
      <Image />
      <h1>
        {value}
        {tag}
      </h1>
    </div>
  );
};

export default Card;
