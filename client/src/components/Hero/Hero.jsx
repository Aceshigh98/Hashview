import React from 'react'
import classes from "./Hero.module.css";
import Sidebar from '../Sidebar/Sidebar';

const Hero = () => {
  return (
    <section className={classes["hero-container"]}>
      <Sidebar className={classes['sidebar']}/>

    </section>
  )
}

export default Hero;