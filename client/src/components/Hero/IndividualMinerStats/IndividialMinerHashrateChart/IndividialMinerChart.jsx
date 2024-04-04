import React from 'react';
import classes from './IndividualMinerChart.module.css'
import ReactApexCharts from 'react-apexcharts';
import { useContext } from 'react';

const IndividialMinerChart = () => {

  //Define options for the chart

  const { data } = useContext(DataContext);

  var options = {
    chart: {
      height: 280,
      type: "area",
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [
      {
        name: "Series 1",
        data: [45, 52, 38, 45, 19, 23, 2],
        color: '#f0ba33' 
      }
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 90, 100]
      }
    }
    ,
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan"
      ]
    }
  };
  return (
    <div className={classes['container']}>
        <ReactApexCharts
         options={options}
         series={options.series}
         height={400}
         type="area"
         width="100%"
         />
    </div>
  )
}

export default IndividialMinerChart;