import React from "react";
import classes from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Hashview</h1>
      <p className={classes.paragraph}>
        Welcome to Hashview! This application is designed to help you monitor
        and manage your Bitcoin mining operations efficiently.
      </p>

      <section className={classes.section}>
        <h2 className={classes.subHeader}>Key Features</h2>
        <ul className={classes.list}>
          <li>Real-time monitoring of mining activity</li>
          <li>Detailed analytics and reporting</li>
          <li>User-friendly interface</li>
          <li>Secure and reliable data management</li>
        </ul>
      </section>

      <section className={classes.section}>
        <h2 className={classes.subHeader}>Technology Stack</h2>
        <p className={classes.paragraph}>
          Hashview is built using modern web technologies to ensure high
          performance and scalability. The key components of our technology
          stack include:
        </p>
        <ul className={classes.list}>
          <li>React for the front-end</li>
          <li>Node.js and Express for the back-end</li>
          <li>MongoDB for database management</li>
          <li>Chart.js for data visualization</li>
        </ul>
      </section>

      <section className={classes.section}>
        <h2 className={classes.subHeader}>Why Choose Our Dashboard?</h2>
        <p className={classes.paragraph}>
          Hashview stands out due to its focus on user experience and
          comprehensive feature set.
        </p>
        <ul className={classes.list}>
          <li>Easy to use with a clean interface</li>
          <li>High level of customization</li>
          <li>Reliable and secure</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
