// src/components/Leaderboard.js

import React, {Component} from 'react';
import ApexCharts from 'apexcharts';
//import '../styles/leaderBoard.css'

export default function LeaderBoard() {

  const chartOptions = {
    chart: {
      id: 'basic-line',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
  };

  const chartData = [
    {
      name: 'Series 1',
      data: [30, 40, 25, 50, 49],
    },
  ];

  return (
    <div className="chart">
      <ApexCharts options={chartOptions} series={chartData} type="line" height={350} />
    </div>
  );

}

