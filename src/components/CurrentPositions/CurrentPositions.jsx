import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

function CurrentPositions() {
  const userId = useSelector((state) => state.user.id);
  const positionsAndStuff = useSelector((store) => store.positionsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      console.log();
      dispatch({ type: "FETCH_POSITIONS", payload: { userId } }); // Fetch positions for the current logged in user
    }
  }, [userId, dispatch]);

  // WILL NEED  MATH/LOGIC TO
  // GET THE INFORMATION WE WANT ON THE DOM, THIS WILL
  // BE A COMBINATION OF BASIC MATH PERFORMED ON VALUES
  // SAVED ON THE DATABASE AND ONES PULLED FROM THE API,
  // IT SHOULD BE NOTED THAT IF THE OAuth
  // PROCESS DOES NOT GO AS ANTICIPATED, YOU COULD
  // HARDCODE SOME OF THIS AND STILL GET YOUR
  // POINT ACROSS WITH WHAT THE APP IS INTENDED FOR

  return (
    <div>
    <p>Here is some text for our Current Positions page</p>
    <h1>
      We will eventually use this page as an options table page that analyzes
      open positions of a LOGGED IN user
    </h1>
    <ul>
      {positionsAndStuff.map((position) => (
        <li key={position.id}>
          <p>Ticker: {position.ticker}</p>
          <p>Contracts: {position.contracts}</p>
          <p>Strike: {position.strike}</p>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default CurrentPositions;
