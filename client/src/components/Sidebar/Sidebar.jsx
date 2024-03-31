import React, { useState, useContext } from 'react';
import { DataContext } from '../../API/data';
import { IoMdMenu } from "react-icons/io";
import classes from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const data = useContext(DataContext);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const sidebarClass = isOpen ? 'open' : 'close';

    return (
        <div className={classes['sidebar-container']}>
            <IoMdMenu onClick={toggleSidebar} className={classes['menu-icon']}/>
            <div className={`${classes.sidebar} ${classes[sidebarClass]}`}>
                <div className={classes['name-container']}>
                    <Link to={`../MainMinerStats`}>
                        <h1>Home</h1>
                    </Link>
                </div>
                {data.data.map((user, userIndex) => (
                    user.miners.map((miner, minerIndex) => (
                        <div key={`${userIndex}-${minerIndex}`} className={classes['name-container']}>
                            <Link to={`/Miner/${miner.minerId}`}>
                                <h1>Miner: {miner.workerName}</h1>
                            </Link>
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
