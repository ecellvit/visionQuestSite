import React from 'react';
import ReactApexChart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import '@/styles/leaderBoard.module.css';

export default function LeaderBoard() {

  const data = {
    "undefined": [
        {
            "teamName": "asdf",
            "vps": 15000
        }
    ],
    "IT": [
        {
            "teamName": "garvit",
            "vps": 13500
        }
    ]
}

  const chartOptions = {
    chart: {
      id: 'horizontal-bar-chart',
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius:4,
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
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
      <ReactApexChart options={chartOptions} series={chartData} type='bar' height={350} />
    </div>
  );
}

