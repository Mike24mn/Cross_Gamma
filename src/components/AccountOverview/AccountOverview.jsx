import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

import * as React from "react";
import Box from "@mui/material/Box";
import "./AccountOverview.css";

function AccountOverview({ user }) {
  // hardcoded for now
  const netLiquidatingValue = 216223.91
  const premiaSoldToday = 349.53 // use abs value on maybe?
  const ytdPerformancePercent = 20
  const ytdPerformanceValue = 43212.02

  // use to local string so we can get a better format for the variable numbers
  // ... if needed, we will see

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
        <div>This will be a chart of user account performance</div>
      </div>
    </div>
  );
}

export default AccountOverview;
