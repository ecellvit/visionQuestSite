import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import styles from '@/styles/leaderBoard.module.css';

export default function LeaderBoard(props) {

  const [data, setData] = useState();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER + "/getVps", {
      content: "application/json",
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }).then(res => res.json())
      .then(dt => {
        console.log("chart", dt);


        // if (props.indVise) {
        //   let newObj = {};
        //   for (const key in dt) {
        //     if (key.toUpperCase() == props.industry.toUpperCase()) {
        //       setData(dt[key])
        //       return
        //     }
        //   }
        // } else {
        //   setData(dt);
        // }

        const allTeams = [];

        for (const ct in dt) {
          if (dt.hasOwnProperty(ct)) {
            const teamsInCategory = dt[ct];

            // Iterate through teams in the ct
            for (const team of teamsInCategory) {
              allTeams.push({
                "teamName": team.teamName,
                "ct": ct,
                "valuation": team.valuation
              });
            }
          }
        }

        console.log(allTeams);

      }).catch(err => {
        console.log(err)
      })

  }, []);

  let chartOptions = {};
  let chartData = [];

  let names = ['asdf', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
  let vals = [44, 55, 41, 67, 22]

  console.log(data);
  if (data){
    names = data.map((team) => team.teamName);
    vals = data.map((team) => team.valuation);
  }

  chartOptions = {
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
      categories: names,
    },
  };

  chartData = [
    {
      name: 'Series 1',
      data: vals,
    },
  ];

  return (
    <>
      <br></br>
      <div className={styles.chart}>
        {/* <div>asdf</div>} */}
        <ReactApexChart options={chartOptions} series={chartData} type='bar' height={350} />
      </div>
    </>
  );
}

