import React from "react";
import classes from "./Title.module.css";

// This should be dynamically assigned based on the context.
const user = "Aceshigh98";

const Title = () => {
  return (
    <div className={classes["container"]}>
      <h1 className={classes["title-h1"]}>Hello {user},</h1>
      <div className={classes["sub-container"]}>
        <h3 className={classes["title-h3"]}>Welcome to HashView.</h3>
      </div>
    </div>
  );
};

export default Title;
