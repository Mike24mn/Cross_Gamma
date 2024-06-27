import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

// Current user can either be passed as a prop or saved via state and tracked like that
// i believe, we will mess with the desctructuring and different ways of managing this
// soon

function CurrentPositions({ user }) {
  return (
    <div>
      <p>here is some text for our Current Positions page</p>
      <h1>
        We will eventually use this page as an options table page that analyzes open
        position of a LOGGED IN user
      </h1>
    </div>
  );
}

export default CurrentPositions;