import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Common/Navbar/Navbar";
import Footer from "../components/Common/Footer/Footer";
import Sidebar from "../components/ui/Sidebar/Sidebar";
import { World } from "../util/globe"; // Import the World component
import classes from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={classes.container}>
      <div className={classes.globeBackground}>
        <World />
      </div>
      <Navbar />
      <Sidebar />
      <main>
        <Outlet /> {/* Render the matched child route */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
