import React from "react";
import MainLayout from "./layouts/MainLayout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Hero from "./components/Hero/Hero.jsx";
import IndividualMinerStats from "./components/Hero/IndividualMinerStats/IndividualMinerStats.jsx";
import MainMinerStats from "./components/Hero/MainMinerStats/MainMinerStats.jsx";
import { DataProvider } from "./API/data.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { World } from "./components/ui/globe.jsx"; // Import the World component
import "./App.css"; // Make sure to create and import App.css for styling

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="globeBackground">
          <World />
        </div>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Hero />}>
              <Route path="/MainMinerStats" element={<MainMinerStats />} />
              <Route
                path="/Miner/:minerId"
                element={<IndividualMinerStats />}
              />
              <Route path="/About" element={<AboutPage />} />
            </Route>
          </Routes>
        </MainLayout>
      </Router>
    </DataProvider>
  );
}

export default App;
