import React from 'react'
import classes from "./Hero.module.css";
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={classes["hero-container"]}>
      <Sidebar className={classes['sidebar']}/>
      <Outlet />
    </section>
  )
}

export default Hero;