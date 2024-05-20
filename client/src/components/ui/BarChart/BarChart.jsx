import React, { useState, useEffect } from "react";
import ReactApexCharts from "react-apexcharts";

const BarChart = ({ values, dates }) => {
  const [data, setData] = useState(null);
  const [datesArray, setDates] = useState([]);

  useEffect(() => {
    // Check if the necessary data properties are available and in the correct format
    if (values && dates) {
      setData(values);
      setDates(dates);
    } else {
      console.error("Invalid or incomplete data for props");
      // Optionally set empty arrays to avoid rendering with old state
      setData([]);
    }
  }, [values, dates]); // Add values and dates as dependencies

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
        borderRadius: 10, // Rounded corners
        horizontal: false,
        columnWidth: "40%",
      },
    },
    xaxis: {
      categories: datesArray, // Ensure datesArray is an array of strings
      labels: {
        show: true,
        style: {
          colors: Array(datesArray.length).fill("#FFFFFF"), // Change x-axis label colors
          fontSize: "12px",
          fontWeight: "700",
        },
      },
      axisBorder: {
        show: false, // Hide the x-axis border
      },
      axisTicks: {
        show: true, // Hide the x-axis ticks
      },
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
    },
  };

  // Ensure not to render the component until valid data is available
  if (!data) {
    return <div>Loading or Invalid data...</div>;
  }

  return (
    <ReactApexCharts
      options={options}
      series={options.series}
      height="100%"
      type="bar" // Change the chart type to "bar"
      width="100%"
    />
  );
};

export default BarChart;
