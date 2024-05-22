import React from "react";
import classes from "./Title.module.css";

// This should be dynamically assigned based on the context.

const Title = ({ username }) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["sub-container"]}>
        <h1 className={classes["title-h1"]}>Hello {username},</h1>
      </div>
      <div className={classes["sub-container"]}>
        <h3 className={classes["title-h3"]}>Welcome to HashView.</h3>
      </div>
    </div>
  );
};

export default Title;
