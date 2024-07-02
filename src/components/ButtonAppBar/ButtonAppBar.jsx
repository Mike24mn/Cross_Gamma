import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton'; 

export default function ButtonAppBar({ user }) {
  const [anchorEl, setAnchorEl] = useState(null); // anchor point for our menu

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', backgroundColor: '#000' }}>
      <AppBar position="static" sx={{ width: '100%', backgroundColor: '#000' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, backgroundColor: "#000'" }} 
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu 
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
             {/* if no user id, route to login */}
            {!user.id ? (
              <MenuItem onClick={handleMenuClose} >
                <Link to="/login">Login</Link>
              </MenuItem>
            ) : (
              
              <>
              {/* if user id, allow routes to acc overview, curr pos, and notes, also render that logout button! */}
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/overview">Account Overview</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/currentpos">Current Positions</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/notes">Notes</Link>
                </MenuItem>
              </>
            )}
             {/* if no user id allow route to about as well */}
            <MenuItem onClick={handleMenuClose}>
              <Link to="/about">About</Link>
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          {user.id ? (
          <Button color="inherit">
                    <LogOutButton />
          </Button>
          ) : (<span></span>)} 
         {/* span above is for rendering nothing if user not logged in */}
        </Toolbar >
      </AppBar>
    </Box>
  );
}