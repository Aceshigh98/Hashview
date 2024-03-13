import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx"
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer.jsx";
import IndividualMinerStats from "./components/Hero/IndividualMinerStats/IndividualMinerStats.jsx";
import MainMinerStats from "./components/Hero/MainMinerStats/MainMinerStats.jsx";
import { DataProvider } from "./API/data.jsx";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
  <DataProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero />}>
          <Route path= '/MainMinerStats' element={<MainMinerStats />}/> //Nested Route to display Miner details by Miner ID.
          <Route path= '/Miner/:minerId' element={<IndividualMinerStats />}/> //Nested Route to display Miner details by Miner ID.
        </Route>
      </Routes>
      <Footer/>
   </Router>
  </DataProvider>  
  );
}

export default App;
