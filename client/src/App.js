import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx"
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer.jsx";
import { DataProvider } from "./API/data.jsx";

function App() {
  return (
  <DataProvider>
    <div>
      <Navbar/>
      <Hero/>
      <Footer/>
   </div>
  </DataProvider>  
  );
}

export default App;
