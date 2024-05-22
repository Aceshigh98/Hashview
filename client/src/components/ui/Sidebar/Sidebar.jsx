import React, { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "./Sidebar.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Get user from AuthContext
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [minerIds, setMinerIds] = useState([]);
  const [minerNames, setMinerNames] = useState([]);

  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      console.error("Please log in");
      return;
    }
    const fetchData = async () => {
      const minerIds = await axios.post(
        "http://localhost:80/api/minersIds",
        {
          userName: user.userName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const minerNames = await axios.post(
        "http://localhost:80/api/minersWorkerNames",

        {
          userName: user.userName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const response = await Promise.all([minerIds, minerNames]);
      const dataIds = response[0].data; // Change this line
      const dataNames = response[1].data; // Change this line
      setMinerIds(dataIds);
      setMinerNames(dataNames);
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClass = isOpen ? "open" : "close";

  return (
    <aside className={classes["sidebar-container"]}>
      <IoMdMenu onClick={toggleSidebar} className={classes["menu-icon"]} />
      <div className={`${classes[sidebarClass]} ${classes["sidebar"]} `}>
        <div className={classes["name-container"]}>
          <Link to={`/`} onClick={toggleSidebar}>
            <h1>Home</h1>
          </Link>
        </div>
        {minerIds.map((minerId, index) => (
          <div key={index} className={classes["name-container"]}>
            <Link to={`/Miner/${minerId}`} onClick={toggleSidebar}>
              <h1>Miner: {minerNames[index]}</h1>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
