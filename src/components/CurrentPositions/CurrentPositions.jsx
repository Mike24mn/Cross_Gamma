import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Button,} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

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
                <TableCell>Strike (C/P):</TableCell>
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
              {positionsAndStuff.map((position) => (
                <TableRow key={position.id}>
                  <TableCell>{position.ticker}</TableCell>
                  <TableCell>{position.strike}</TableCell>
                  <TableCell>{position.initial_underlying_price}</TableCell>
                  <TableCell>{position.contracts}</TableCell>
                  <TableCell>{position.current_otm_percent}</TableCell>
                  <TableCell>{position.initial_otm_percent}</TableCell>
                  <TableCell>{position.initial_premia}</TableCell>
                  <TableCell>{position.entry_date.substring(0, 10)}</TableCell>
                  <TableCell>{position.expiry.substring(0, 10)}</TableCell>
                  <TableCell>{position.dte}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAddNote(position.id)}
                      variant="contained"
                      color="primary"
                        {/* gotta create a handleAddnote function still! */}
                    >Add Note
                    </Button>
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
