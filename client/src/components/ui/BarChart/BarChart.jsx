import React, { useState, useEffect } from "react";
import classes from "./BarChart.module.css";
import ReactApexCharts from "react-apexcharts";

const BarChart = (props) => {
  const [data, setData] = useState(null);

  const dates = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  useEffect(() => {
    // Check if the necessary data properties are available and in the correct format
    if (props) {
      console.log(props.props);
      setData(props);
    } else {
      console.error("Invalid or incomplete data for props");
      // Optionally set empty arrays to avoid rendering with old state
      setData([]);
    }
  }, []);

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
        show: true, // Hides the toolbar
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Hashrate",
        data: data ? data : [], // Ensure data is an array
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
        type="area"
        width="100%"
      />
    </div>
  );
};

export default BarChart;
