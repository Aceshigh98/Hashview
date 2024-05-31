import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SignupPage.module.css";
import { World } from "../../util/globe";
import { useSignup } from "../../hooks/useSignup";
import image from "../../assets/logo.png";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [luxorUsername, setLuxorUsername] = useState("");
  const [luxorKey, setLuxorKey] = useState("");
  const { signup, error, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password, luxorUsername, luxorKey);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["left-container"]}>
        <form className={classes["form-container"]} onSubmit={handleSubmit}>
          <h1>Hashview</h1>
          <img alt="logo" src={image} className={classes["title-img"]}></img>
          <h3>Enter your information below to create an account.</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <input
            type="text"
            placeholder="Luxor Username"
            onChange={(e) => setLuxorUsername(e.target.value)}
            value={luxorUsername}
            required
          />
          <input
            type="text"
            placeholder="Luxor Key"
            onChange={(e) => setLuxorKey(e.target.value)}
            value={luxorKey}
            required
          />
          {error && <p className={classes["error"]}>{error}</p>}
          <button disabled={loading} type="submit">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <p className={classes["p-tag"]}>Already have an Account?</p>
          <Link to="/login" className={classes["login-button"]}>
            Login
          </Link>
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

export default SignupPage;
