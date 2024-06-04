import React from "react";
import { useState } from "react";
import classes from "./HelpModal.module.css";

const HelpModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <span onClick={toggleModal} className={classes["help-tag"]}>
        Need Help?
      </span>
      {showModal && (
        <div className={classes["modal"]}>
          <div className={classes["modal-content"]}>
            <span onClick={toggleModal} className={classes["close"]}>
              &times;
            </span>
            <h1>How to Use</h1>
            <ul>
              <li>
                <strong>Step 1:</strong> Visit Luxor Mining Pool and create an
                account.{" "}
                <a
                  href="https://mining.luxor.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Luxor Mining Pool
                </a>
              </li>
              <li>
                <strong>Step 2:</strong> Once you have created an account, you
                will use your Luxor Username and request a Luxor Key.
              </li>
              <li>
                <strong>Step 3:</strong> Once you have your Luxor Key, you are
                now eligible to create an account on Hashview.
              </li>
            </ul>
            <button onClick={toggleModal} className={classes["close-button"]}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpModal;
