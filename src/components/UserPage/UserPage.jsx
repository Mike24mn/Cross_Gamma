import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
     <center>Your User ID is: {user.id}</center>
     
      <></>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
