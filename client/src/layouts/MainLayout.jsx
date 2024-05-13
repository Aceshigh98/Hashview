import React from "react";
import Navbar from "../components/Common/Navbar/Navbar";
import Footer from "../components/Common/Footer/Footer";
import Sidebar from "../components/ui/Sidebar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
