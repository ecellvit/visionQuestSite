import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import styles from '@/styles/leaderBoard.module.css';

export default function LeaderBoard(props) {

  const [data, setData] = useState();
  const [chartOptions, setChartOptions] = useState({});
  const [chartData, setChartData] = useState([]);

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

        const allTeams = [];

        if (!props.indVise) {
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
        } else {
          // only those with the industry props.industry
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
        }

        console.log(allTeams);

        const names = allTeams.map((team) => team.teamName);
        const vals = allTeams.map((team) => team.valuation);

        setChartOptions({
          chart: {
            id: 'horizontal-bar-chart',
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: names,
          },
        });

        setChartData([
          {
            name: 'Series 1',
            data: vals,
          },
        ])

        setData(allTeams)

      }).catch(err => {
        console.log(err)
      })

  }, []);


  let names = ['asdf', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
  let vals = [44, 55, 41, 67, 22]

  return (
    <>
      <br></br>
      <div className={styles.chart}>
        {/* <div>asdf</div>} */}
        {data &&
          <ReactApexChart options={chartOptions} series={chartData} type='bar' height={350} />
        }
      </div>
    </>
  );
}

