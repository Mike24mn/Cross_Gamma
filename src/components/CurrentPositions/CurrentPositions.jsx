import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import "./CurrentPositions.css"
import BasicModal from "../ModalComponent/ModalComponent.jsx"; // import modal

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64a9ad", // Turquoise color, from ColorSync Utility (so it matches the logo)
    },
    background: {
      default: "#424242", // background color
      paper: "#616161", //  paper color
    },
  },
});

function CurrentPositions() {
  const userId = useSelector((state) => state.user.id);
  const positionsAndStuff = useSelector((store) => store.positionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_POSITIONS", payload: { userId } });
    }
  }, [userId, dispatch]);

  console.log("positionsAndStuff:", positionsAndStuff); // delete eventually, just used for checking data

  const filteredPositions = positionsAndStuff.filter(
    (position) =>
      position.ticker !== null &&
      position.strike !== null &&
      position.initial_underlying_price !== null &&
      position.contracts !== null &&
      position.current_otm_percent !== null &&
      position.initial_otm_percent !== null &&
      position.initial_premia !== null &&
      position.entry_date !== null &&
      position.expiry !== null &&
      position.dte !== null
  ).map(position => ({
    ...position,
    current_otm_percent: Math.random() * 30, // rand int between 0 and 30%
    initial_otm_percent: Math.random() * 80 + 20, // rand int between 20 and 100%
    dte: Math.random() * 365 // rand int between 0 and 365
     })) // this bottom part maps the positions array above it and uses 
     // the spread operator to add some hard coded data 
     // to use for the app demo, since Schwab Oauth
     // is still in the works unfortunately
     
  // ^^ this logic above is meant to only add official positions from
  // the future schwab api calls to our CurrentPositions page,
  // so basically we can still add notes about tickers
  // on the notes page, but only account positions
  // pulled from schwab will show up on the actual positions
  // page here. This opens the door to hypothesize and take notes
  // about future positions you plan on entering, or on
  // strategies about your entrance, i.e, you could enter
  // a note that has the ticker AAPL (Apple) and say
  // "Reminder to sell calls on AAPL post-earnings release"
  // with the earnings release date entered in the entry date
  // column. An eventual stretch goal could also be to send alerts
  // to users based on this information, reminding them to enter
  // the position they were considering and to check the App for
  // details, or at least give the optionality to create these alerts

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <h2 style={{ color: "white" }}>Current Positions:</h2>
        <h1></h1>

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="positions table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Ticker:</TableCell>
                <TableCell>Strike (C/P):</TableCell>{" "}
                {/* Need to add some conditional rendering to differentiate calls from puts... */}
                <TableCell>Underlying Price:</TableCell>
                <TableCell>Contracts:</TableCell>
                <TableCell>Current % OTM:</TableCell>
                <TableCell>Initial % OTM:</TableCell>
                <TableCell>Net Premium:</TableCell>
                <TableCell>Entry Date:</TableCell>
                <TableCell>Expiration Date:</TableCell>
                <TableCell>DTE:</TableCell>
                <TableCell>Action:</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredPositions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell>{position.ticker}</TableCell>
                  <TableCell>{position.strike}</TableCell>
                  <TableCell>{position.initial_underlying_price}</TableCell>
                  <TableCell>{position.contracts}</TableCell>
                  <TableCell
                    className={`dangerPosition ${
                      position.current_otm_percent > 15
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {position.current_otm_percent.toFixed(1)}%
                  </TableCell>
                  <TableCell>{position.initial_otm_percent.toFixed(1)}%</TableCell>
                  <TableCell>${Math.abs(position.initial_premia).toLocaleString()}</TableCell>
                  <TableCell>{position.entry_date.substring(0, 10)}</TableCell>
                  <TableCell>{position.expiry.substring(0, 10)}</TableCell>
                  <TableCell>{position.dte.toFixed()}</TableCell>
                  <TableCell>
                    <BasicModal variant="contained" color="primary">
                      Add Note
                    </BasicModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}

export default CurrentPositions;
