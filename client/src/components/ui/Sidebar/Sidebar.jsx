import React, { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import classes from "./Sidebar.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minerIds, setMinerIds] = useState([]);
  const [minerNames, setMinerNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const minerIds = await axios.get("http://localhost:80/api/minersIds");
      const minerNames = await axios.get(
        "http://localhost:80/api/minersWorkerNames"
      );
      const response = await Promise.all([minerIds, minerNames]);
      const dataIds = response[0].data; // Change this line
      const dataNames = response[1].data; // Change this line
      setMinerIds(dataIds);
      setMinerNames(dataNames);
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClass = isOpen ? "open" : "close";

  return (
    <div className={classes["sidebar-container"]}>
      <IoMdMenu onClick={toggleSidebar} className={classes["menu-icon"]} />
      <div className={`${classes.sidebar} ${classes[sidebarClass]}`}>
        <div className={classes["name-container"]}>
          <Link to={`../MainMinerStats`}>
            <h1>Home</h1>
          </Link>
        </div>
        {minerIds.map((minerId, index) => (
          <div key={index} className={classes["name-container"]}>
            <Link to={`/Miner/${minerId}`}>
              <h1>Miner: {minerNames[index]}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
