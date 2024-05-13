import React from "react";
import Hero from "../components/Common/Hero/Hero";
import IndividualMinerStats from "../components/IndividualMinerStats/IndividualMinerStats";

const MinersPage = () => {
  return (
    <>
      <Hero>
        <IndividualMinerStats />
      </Hero>
    </>
  );
};

export default MinersPage;
