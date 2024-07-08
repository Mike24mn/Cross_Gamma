import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector , useDispatch } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

import React, { useEffect, useMemo } from "react"; // all from react
// memoization helps with the chart being displayed properly
// since it caches data, we will see how it performs now since
// before is was super choppy and had rerendering issues

import Box from "@mui/material/Box";
import "./AccountOverview.css";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function AccountOverview({ user }) {

   const dispatch = useDispatch()
   const chartData = useSelector((state) => state.chartReducer)
  // hardcoded for now until Oauth is completed
  const netLiquidatingValue = 216223.91
  const premiaSoldToday = 349.53 // use abs value on maybe?
  const ytdPerformancePercent = 20
  const ytdPerformanceValue = 43212.02
  const userId = useSelector((state) => state.user.id)



  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_CHART", payload: { userId } })
    }
  }, [userId, dispatch])

  // use to local string so we can get a better format for the variable numbers
  // ... if needed, we will see

  const incomingChartData = useMemo(() => {

    if (!chartData || !chartData.quotes || chartData.quotes.length === 0) {
        console.log("problem with chart");
        return;
    }
    const dates = chartData.quotes.map(quote => new Date(quote.date).toLocaleDateString()) // take dates from inc chart data (quote.date), creates an new Date instance object with each, then maps them to new date array and formats them nicely based on locale convetions (i.e, tolocale part)
    // ^^Note to self: instances inherit from "classes", here we inherit general outline created by Date and create individual instances from it
    // (Future self: look at your zybooks work to see your python code equivalencies) 
    console.log("dates", dates);
    const scaleIt = netLiquidatingValue / chartData.quotes[chartData.quotes.length - 1].close
    console.log("scaleIt is:", scaleIt)
    // ^^take the hardcoded value of netLiquidatingValue above and divide
    // it by quotes last index value's closing price
    // this is to get a good scalar ratio for manipulating the demonstration chart
    // i'd like to use. 
    const accValues = chartData.quotes.map(quote => quote.close * scaleIt)
    console.log("accValues are: ", accValues)
    // ^^map over quotes and multiple the closing price for each quote by the scaleIt ration
    // this helps with tight correspondance/fitment to the example chart,
    // save it to an array called accValues for later usage. THESE ARE POINTS ON THE CHART
    return {
      labels: dates,
      datasets: [
        {
          label: "Account Value",
          data: accValues,
          fill: false,
          borderColor: "rgb(75,192,192)",
          tension: 0.2, // curve the line, just a little bit

        }
      ]
    }
}, [chartData, netLiquidatingValue])


const options = {
  responsive:true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top", // put legend on top of chart
    },
    title: {
      display: true, // show title
      text: "Account Value Over Time"  // text of it
    }
  },
  scales: {
    y: {
      beginAtZero: false, // offset chart to not start at zero
      ticks: { // set spacing ticks
        callback: function(value) {
          return '$' + value.toLocaleString()
        }
      }
    }
  }
}

  return (
    <div className="account-overview">
      <h2>Account Overview</h2>
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-title">Net Liquidating Value:</div>
          <div className="stat-value">
            ${netLiquidatingValue.toLocaleString()}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-title">Premia Sold Today:</div>
          <div
            className={`stat-value ${
              premiaSoldToday >= 0 ? "positive" : "negative"
            }`}
          >
            ${Math.abs(premiaSoldToday).toLocaleString()}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-title">YTD Performance:</div>
          <div
            className={`stat-value ${
              ytdPerformancePercent >= 0 ? "positive" : "negative"
            }`}
          >
            {ytdPerformancePercent}%
          </div>
          <div
            className={`stat-value ${
              ytdPerformanceValue >= 0 ? "positive" : "negative"
            }`}
          >
            {ytdPerformanceValue >= 0 ? "+" : "-"}$
            {Math.abs(ytdPerformanceValue).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="chart-container">
        {incomingChartData ? (
          <div style={{ width: '80%', height: '100%' }}>
            <Line data={incomingChartData} options={options} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
    </div>
    </div>
  );
}

export default AccountOverview;
