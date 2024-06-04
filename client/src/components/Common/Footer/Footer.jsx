import React from "react";
import classes from "./Footer.module.css";
import Divider from "../../ui/Divider/Divider";

const Footer = () => {
  return (
    <footer className={classes["footer-container"]}>
      <Divider />
      <div className={classes["title"]}>
        <p>© 2024, made by Aceshigh. Mining Statistics Dashboard.</p>
      </div>
      <div className={classes["icon-container"]}>
        <div className={classes["icon-subcontainer"]}>
          <a href="https://luxor.tech/mining">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="109"
              height="39"
              fill="none"
            >
              <path
                fill="#F0BB31"
                d="M99.198 5.246c.4-.65 1.393-.493 1.569.247l.995 4.171a.853.853 0 0 1-.836 1.047h-3.559a.851.851 0 0 1-.733-1.294z"
              ></path>
              <path
                fill="url(#luxor-logo-md_svg__a)"
                d="M99.198 5.246c.4-.65 1.393-.493 1.569.247l.995 4.171a.853.853 0 0 1-.836 1.047h-3.559a.851.851 0 0 1-.733-1.294z"
              ></path>
              <path
                fill="#F0BB31"
                d="M101.282 1.038c-.213-.92 1.038-1.441 1.565-.65l6.011 9.012c.375.564-.037 1.311-.723 1.311h-3.928a.86.86 0 0 1-.842-.66z"
              ></path>
              <path
                fill="url(#luxor-logo-md_svg__b)"
                d="M101.282 1.038c-.213-.92 1.038-1.441 1.565-.65l6.011 9.012c.375.564-.037 1.311-.723 1.311h-3.928a.86.86 0 0 1-.842-.66z"
              ></path>
              <path
                fill="#FEFEFE"
                d="M2.585 31.585H17.79v-4.186H8.023V8.019H2.585zm23.86.362c2.886 0 4.666-1.318 5.572-3.065v2.703h4.834V14.348h-4.834v10.118c0 2.537-1.611 3.79-3.659 3.79-2.081 0-3.055-1.12-3.055-3.46V14.347H20.47v11.106c0 4.516 2.55 6.493 5.975 6.493zm13.135-.362h5.002l3.793-5.801 3.692 5.8h5.606l-6.177-9.162 5.606-8.074h-5.035l-3.222 5.174-3.29-5.174h-5.572l5.606 8.437zm27.7-3.263c-2.753 0-4.297-1.978-4.297-5.273v-.264c0-3.296 1.61-5.207 4.296-5.207 2.72 0 4.297 1.977 4.297 5.273v.23c0 3.263-1.578 5.24-4.297 5.24zm-.034 3.625c5.27 0 9.264-3.46 9.264-8.898v-.264c0-5.372-3.96-8.833-9.23-8.833s-9.266 3.527-9.266 8.932v.263c0 5.373 3.995 8.8 9.232 8.8m12.527-.362h4.868V22.95c0-3.296 2.08-4.45 5.673-4.417v-4.449c-2.854.033-4.565 1.252-5.673 3.56v-3.296h-4.868z"
              ></path>
              <defs>
                <linearGradient
                  id="luxor-logo-md_svg__a"
                  x1="99.146"
                  x2="99.146"
                  y1="4.837"
                  y2="10.711"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E5AA12"></stop>
                  <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                </linearGradient>
                <linearGradient
                  id="luxor-logo-md_svg__b"
                  x1="105.129"
                  x2="105.129"
                  y1="0"
                  y2="10.711"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E5AA12"></stop>
                  <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
