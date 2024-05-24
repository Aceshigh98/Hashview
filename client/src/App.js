import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css"; // Make sure to create and import App.css for styling
import MainLayout from "./layouts/MainLayout.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MinersPage from "./pages/MinersPage.jsx";
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/Miner/:minerId"
              element={user ? <MinersPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/About"
              element={user ? <AboutPage /> : <Navigate to="/login" />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
