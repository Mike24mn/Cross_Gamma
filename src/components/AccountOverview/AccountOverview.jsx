
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";

import * as React from 'react';
import Box from '@mui/material/Box';
import './AccountOverview.css';

function AccountOverview({ user }) {
  return (
    <div>
      <h2>Account Overview</h2>
    <div className="boxes">
      <div className="boxOne">
        <Box
          height={100}
          width={150}
          my={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          p={2}
          sx={{ border: '1px solid black', bgcolor: '#656565', color: 'white'  }}
        >
          <div>Net Liquidating Value:</div>
          <div>$200,000</div>
        </Box>
      </div>

      <div className="boxTwo">
        <Box
          height={100}
          width={150}
          my={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          p={2}
          sx={{ border: '1px solid black', bgcolor: '#656565', color: 'white',   }}
        >
          <div>Premia Sold Today (insert date logic):</div>
          <div>$349.50</div>
        </Box>
      </div>
      <div className="boxFour">
        <Box
          height={116}
          width={150}
          my={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          p={1}
          sx={{ border: '1px solid black', bgcolor: '#656565', color: 'white',   }}
        >
          <div>YTD Performance:</div>
          <div>22%</div>
          <div>+$23,450</div>
        </Box>
      </div>

      <div className="boxThree">
        <Box
          height={100}
          width={600}
          my={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={3}
          sx={{ border: '2px solid black', bgcolor: '#656565', color: 'white'  }}
        >
          <div>This will be a chart of user account performance:</div>
        </Box>
      </div>
    </div>
    </div>
  );
}

export default AccountOverview;