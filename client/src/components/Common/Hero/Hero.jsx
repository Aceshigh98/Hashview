import React from "react";
import classes from "./Hero.module.css";

const Hero = ({ children }) => {
  return (
    <div className={classes["hero-container"]}>
      <div>{children}</div>
    </div>
  );
};

export default Hero;
