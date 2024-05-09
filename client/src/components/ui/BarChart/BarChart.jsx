import React, { useState, useEffect } from "react";
import classes from "./BarChart.module.css";
import ReactApexCharts from "react-apexcharts";

const BarChart = ({ props }) => {
  const [data, setData] = useState(null);

  const dates = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  useEffect(() => {
    // Check if the necessary data properties are available and in the correct format
    if (props) {
      setData(props);
    } else {
      console.error("Invalid or incomplete data for props");
      // Optionally set empty arrays to avoid rendering with old state
      setData([]);
    }
  }, []); // Add an empty array as the second argument to the useEffect hook

  const options = {
    chart: {
      height: 280,
      type: "bar",
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
      colors: ["#304758"],
    },
    series: [
      {
        name: "Hashrate",
        data: data, // Ensure data is an array
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
    xaxis: {
      categories: dates,
    },
  };

  // Ensure not to render the component until valid data is available
  if (!data) {
    return <div>Loading or Invalid data...</div>;
  }

  return (
    <div className={classes["container"]}>
      <ReactApexCharts
        options={options}
        series={options.series}
        height={400}
        type="bar" // Change the chart type to "bar"
        width="100%"
      />
    </div>
  );
};

export default BarChart;
