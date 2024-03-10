import React from 'react'
import classes from "./Footer.module.css";
import Divider from "../Divider/Divider";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    
    <section className={classes["footer-container"]}>
      <Divider/>
      <div className={classes['title']}>
        <p>© 2024, made by Aceshigh. Mining Statistics Dashboard.</p>
      </div>
      <div className={classes['icon-container']}>
        <div className={classes['icon-subcontainer']}>
          <FaGithub className={classes['icon']}/>
          <a>Github</a>
        </div>
        <div className={classes['icon-subcontainer']}>
          <FaLinkedin className={classes['icon']}/>
          <a>LinkedIn</a>
        </div>
      </div>
    </section>
  )
}

export default Footer