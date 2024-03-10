import React from 'react'
import classes from "./Navbar.module.css";
import { IoMdInformationCircle } from "react-icons/io";
import { CgWebsite } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import Divider from '../Divider/Divider';

const Navbar = () => {
  return (
<section className={classes['container']}>
    <div className={classes['title']}>
      <h3 > Miner Dashboard</h3>
    </div>
   
    <div className={classes['icon-container']}>
      <div className={classes['icon-subcontainer']}>
        <IoMdInformationCircle className={classes['icon']}/>
        <a>About</a>
      </div>
      <div className={classes['icon-subcontainer']}>
        <CgWebsite className={classes['icon']}/>
        <a>Porfolio</a>
      </div>
      <div className={classes['icon-subcontainer']}>
        <TbLogout2 className={classes['icon']}/>
        <a>Logout</a>
      </div> 
    </div>
    <Divider/>
</section>
    
  )
}

export default Navbar