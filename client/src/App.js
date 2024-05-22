import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Make sure to create and import App.css for styling
import MainLayout from "./layouts/MainLayout.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const MinersPage = lazy(() => import("./pages/MinersPage.jsx"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/Miner/:minerId" element={<MinersPage />} />
            <Route path="/About" element={<AboutPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
