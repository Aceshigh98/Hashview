import React from "react";
import classes from "./Hero.module.css";

const Hero = ({ children }) => {
  return (
    <main className={classes["hero-container"]}>
      <div>{children}</div>
    </main>
  );
};

export default Hero;
