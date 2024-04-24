import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Footer from "./components/Footer/Footer.jsx";
import IndividualMinerStats from "./components/Hero/IndividualMinerStats/IndividualMinerStats.jsx";
import MainMinerStats from "./components/Hero/MainMinerStats/MainMinerStats.jsx";
import { DataProvider } from "./API/data.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { World } from "./components/ui/globe.jsx"; // Import the World component
import "./App.css"; // Make sure to create and import App.css for styling

function App() {
  const globeConfig = {};

  const data = [
    // Your data for the globe
  ];

  return (
    <DataProvider>
      <Router>
        <div className="globeBackground">
          <World globeConfig={globeConfig} data={data} />
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />}>
            <Route path="/MainMinerStats" element={<MainMinerStats />} />
            <Route path="/Miner/:minerId" element={<IndividualMinerStats />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </DataProvider>
  );
}

export default App;
