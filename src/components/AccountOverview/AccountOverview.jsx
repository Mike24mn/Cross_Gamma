
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

import * as React from 'react';
import Box from '@mui/material/Box';
import './AccountOverview.css';

function AccountOverview({ user }) {
  return (
    <div className="boxes">
      <div className="boxOne" align="center">
      <Box 
      height={100}
      width={150}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
    Net Liquidating Value:
    <h6>$200,000</h6>
    </Box>
    </div>

    <div className="boxTwo" align="center">
      <Box 
      height={100}
      width={150}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
    Premia Sold Today (insert date logic):
    <h6>$349.50</h6>
    </Box>
    </div>

    <div className="boxThree" align="center">
      <Box 
      height={100}
      width={600}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
    This will be a chart of user account performance:
    </Box>
    </div>
    </div>
    
    
  );
}

export default AccountOverview;
