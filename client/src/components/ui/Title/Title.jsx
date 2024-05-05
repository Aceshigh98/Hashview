import React from "react";
import classes from "./Title.module.css";

const user = "Aceshigh98";

const Title = () => {
  return (
    <div className={classes["container"]}>
      Hello {user}, <br></br>
      Welcome to HashView.{" "}
    </div>
  );
};

export default Title;
