import React, { useState } from "react";
import classes from "./LoginPage.module.css";
import { World } from "../../util/globe"; // Import the World component
import { useLogin } from "../../hooks/useLogin"; // Import the useLogin hook
import image from "../../assets/logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin(); // Use the useLogin hook

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    await login(username, password); // Call the login function from the useLogin hook
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["left-container"]}>
        <form className={classes["form-container"]} onSubmit={handleSubmit}>
          <h1>Hashview</h1>
          <img alt="logo" src={image} className={classes["title-img"]}></img>
          <h3>Enter your information below to login.</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && <p className={classes.error}>{error}</p>}
          <button disabled={loading} type="submit">
            Login
          </button>
        </form>
      </div>
      <div className={classes["right-container"]}>
        <div className={classes.globeBackground}>
          <World />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
