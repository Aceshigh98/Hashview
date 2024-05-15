import React, { useState, useEffect } from "react";
import classes from "./IndividualMinerChart.module.css";
import ReactApexCharts from "react-apexcharts";

const IndividualMinerChart = ({ miner }) => {
  const [activeTab, setActiveTab] = useState("daily");
  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);

  const THDivider = 1000000000000;

  useEffect(() => {
    const setMinerData = (tab) => {
      // Check if the necessary data properties are available and in the correct format
      if (miner) {
        const hashrates = miner.hashrateChart[tab].map((item) =>
          (item.value / THDivider).toFixed(2)
        );
        const dates = miner.hashrateChart[tab].map((item) => item.date);

        setData(hashrates);
        setDates(dates);
      } else {
        console.error("Invalid or incomplete data for miner.hashrateChart");
        // Optionally set empty arrays to avoid rendering with old state
        setData([]);
        setDates([]);
      }
    };

    setMinerData(activeTab);
  }, [miner, activeTab]); // Dependencies to only rerun on changes to miner or activeTab

  const options = {
    chart: {
      height: 280,
      type: "area",
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5,
      },
      toolbar: {
        show: false, // Hides the toolbar
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: `${
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        } Hashrate`,
        data: data,
        color: "#f0ba33",
      },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 90, 100],
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF", // Change y-axis label color
          fontSize: "12px",
          fontWeight: "700",
        },
      },
    },
    xaxis: {
      categories: dates,
      labels: {
        show: true,
        style: {
          colors: Array(dates.length).fill("#FFFFFF"), // Change x-axis label colors
          fontSize: "12px",
          fontWeight: "700",
        },
      },
    },
  };

  // Ensure not to render the component until valid data is available
  if (!miner || !miner.hashrateChart || !miner.hashrateChart[activeTab]) {
    return <div>Loading or Invalid data...</div>;
  }

  return (
    <div className={classes["container"]}>
      <div className={classes["tabs"]}>
        <button
          onClick={() => setActiveTab("daily")}
          className={activeTab === "daily" ? classes["active"] : ""}
        >
          Daily Hashrate
        </button>
        <button
          onClick={() => setActiveTab("weekly")}
          className={activeTab === "weekly" ? classes["active"] : ""}
        >
          Weekly Hashrate
        </button>
        <button
          onClick={() => setActiveTab("monthly")}
          className={activeTab === "monthly" ? classes["active"] : ""}
        >
          Monthly Hashrate
        </button>
      </div>
      <ReactApexCharts
        options={options}
        series={options.series}
        height={400}
        type="area"
        width="100%"
      />
    </div>
  );
};

export default IndividualMinerChart;
