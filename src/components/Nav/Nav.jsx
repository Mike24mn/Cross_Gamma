import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <ButtonAppBar user={user} />
    </div>
  );
}

export default Nav;
