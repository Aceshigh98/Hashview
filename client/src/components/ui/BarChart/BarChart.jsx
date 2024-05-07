import React from "react";
import classes from "./BarChart.module.css";
import ReactApexCharts from "react-apexcharts";

const BarChart = ({ data }) => {
  // Ensure not to render the component until valid data is available
  if (!data) {
    return <div>Loading or Invalid data...</div>;
  }

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
        name: "Hashrate",
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
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
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
        type="area"
        width="100%"
      />
    </div>
  );
};

export default BarChart;
