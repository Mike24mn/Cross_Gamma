import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

function AccountOverview({ user }) {
  return (
    <div>
      <p>here is some text for our Account Overview page</p>
      <h1>
        We will eventually use this page as an account overview page, 
        showing a chart, nlv and premia sold today for LOGGED IN USERS
      </h1>
    </div>
  );
}

export default AccountOverview;
