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
      height: "auto",
      type: "bar",
      toolbar: {
        show: false, // Hides the toolbar
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Hashrate",
        data: data, // Ensure data is an array
        color: "#FFFFFF",
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

    plotOptions: {
      bar: {
        borderRadius: 5, // Rounded corners
        horizontal: false,
        columnWidth: "40%",
      },
    },
    xaxis: {
      categories: dates,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false, // Hide the x-axis border
      },
      axisTicks: {
        show: false, // Hide the x-axis ticks
      },
      show: false, // Completely hide the x-axis
    },

    yaxis: {
      labels: {
        style: {
          colors: ["#FFFFFF"], // Change y-axis label colors
          fontSize: "12px",
          fontWeight: "700",
        },
      },
    },

    tooltip: {
      theme: "dark", // Set the tooltip theme to dark
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
        height="auto"
        type="bar" // Change the chart type to "bar"
        width="100%"
      />
    </div>
  );
};

export default BarChart;
