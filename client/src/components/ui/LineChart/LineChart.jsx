import React, { useState, useEffect } from "react";
import ReactApexCharts from "react-apexcharts";

const BarChart = ({ values, dates }) => {
  const [btcRevenue, setBtcRevenue] = useState(null);
  const [datesArray, setDates] = useState([]);

  useEffect(() => {
    // Check if the necessary data properties are available and in the correct format
    if (values && dates) {
      setBtcRevenue(values);
      setDates(dates);
    } else {
      console.error("Invalid or incomplete data for props");
      // Optionally set empty arrays to avoid rendering with old state
      setBtcRevenue([]);
      setDates([]);
    }
  }, [dates, values]); // Add an empty array as the second argument to the useEffect hook

  const options = {
    chart: {
      height: "auto",
      type: "area",

      toolbar: {
        autoSelected: "pan",
        show: false,
      },
    },
    series: [
      {
        name: "Revenue",
        data: btcRevenue, // Ensure data is an array
        color: "#000000",
      },
    ],

    stroke: {
      curve: "straight",
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 90, 100],
      },
    },

    markers: {
      size: 5, // Hide the point tags
    },

    grid: {
      borderColor: "#FFFFFF", // Customize grid line color if needed
      strokeDashArray: 8, // Set the dash array to make the lines dotted
      clipMarkers: false,
      xaxis: {
        lines: {
          show: false, // Hide vertical grid lines
        },
      },
    },

    xaxis: {
      categories: datesArray,
      labels: {
        show: true,
        style: {
          colors: Array(datesArray.length).fill("#FFFFFF"), // Change x-axis label colors
          fontSize: "12px",
          fontWeight: "700",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    yaxis: {
      labels: {
        style: {
          colors: ["#FFFFFF"], // Change y-axis label colors
          fontSize: "14px",
          fontWeight: "750",
        },
      },
    },

    tooltip: {
      theme: "dark", // Set the tooltip theme to dark
      marker: {
        show: false,
      },
    },
  };

  // Ensure not to render the component until valid data is available
  if (!btcRevenue || !datesArray) {
    return <div>Loading or Invalid data...</div>;
  }

  return (
    <ReactApexCharts
      options={options}
      series={options.series}
      height="100%"
      type="area" // Change the chart type to "bar"
      width="100%"
    />
  );
};

export default BarChart;
