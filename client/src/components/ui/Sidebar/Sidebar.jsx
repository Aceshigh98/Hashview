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

  //

  useEffect(() => {
    const fetchData = async () => {
      console.log("Sidebar.jsx line 21: " + user.userName);
      console.log("Sidebar.jsx line 22: " + user.token);

      try {
        const minerIdsResponse = await axios.post(
          "http://localhost:5000/api/data/minersIds",
          {
            userName: user.userName,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const minerNamesResponse = await axios.post(
          "http://localhost:5000/api/data/minersWorkerNames",
          {
            userName: user.userName,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setMinerIds(minerIdsResponse.data);
        setMinerNames(minerNamesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
          <div key={minerId} className={classes["name-container"]}>
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
