import React from "react";
import classes from "./Navbar.module.css";
import image from "../../../assets/logo.png";
import { IoMdInformationCircle } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import Divider from "../../ui/Divider/Divider";

const Navbar = () => {
  return (
    <section className={classes["container"]}>
      <div className={classes["title"]}>
        <h3>HashView</h3>
        <img alt="logo" src={image} className={classes["title-img"]}></img>
      </div>

      <div className={classes["icon-container"]}>
        <div className={classes["icon-subcontainer"]}>
          <IoMdInformationCircle className={classes["icon"]} />
          <Link to="/About" className={classes["nav-link"]}>
            About
          </Link>
        </div>
        <div className={classes["icon-subcontainer"]}>
          <CgWebsite className={classes["icon"]} />
          <a href="https://github.com/Aceshigh98/Miner-Dashboard">Porfolio</a>
        </div>
        <div className={classes["icon-subcontainer"]}>
          <TbLogout2 className={classes["icon"]} />
          <a href="https://github.com/Aceshigh98/Miner-Dashboard">Logout</a>
        </div>
      </div>
      <Divider />
    </section>
  );
};

export default Navbar;
