import React from "react";
import classes from "./Navbar.module.css";
import image from "../../../assets/logo.png";
import { IoMdInformationCircle } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import Divider from "../../ui/Divider/Divider";
import { useLogout } from "../../../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header className={classes["container"]}>
      <div className={classes["title"]}>
        <h3>HashView</h3>
        <img
          alt="logo"
          src={image}
          className={classes["title-img"]}
          onClick={() => (window.location.href = "/")}
        ></img>
      </div>

      <div className={classes["icon-container"]}>
        <a
          href="https://github.com/Aceshigh98/Hashview"
          className={classes["icon-subcontainer"]}
        >
          <FaGithub className={classes["icon"]} />
          Github
        </a>
        <div>
          <Link to="/About" className={classes["icon-subcontainer"]}>
            <IoMdInformationCircle className={classes["icon"]} />
            About
          </Link>
        </div>
        <div onClick={handleClick} className={classes["icon-subcontainer"]}>
          <TbLogout2 className={classes["icon"]} />
          <Link to="/login">Logout</Link>
        </div>
      </div>
      <Divider />
    </header>
  );
};

export default Navbar;
