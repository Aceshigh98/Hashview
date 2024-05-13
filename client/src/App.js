import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { World } from "./util/globe.jsx"; // Import the World component
import "./App.css"; // Make sure to create and import App.css for styling
import MainLayout from "./layouts/MainLayout.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const MinersPage = lazy(() => import("./pages/MinersPage.jsx"));

function App() {
  return (
    <Router>
      <div className="globeBackground">
        <World />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Miner/:minerId" element={<MinersPage />} />
            <Route path="/About" element={<AboutPage />} />
          </Routes>
        </MainLayout>
      </Suspense>
    </Router>
  );
}

export default App;
