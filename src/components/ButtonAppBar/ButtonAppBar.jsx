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
import LogOutButton from '../LogOutButton/LogOutButton'; // Adjust the import path as necessary

export default function ButtonAppBar({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);

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
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {!user.id ? (
              <MenuItem onClick={handleMenuClose}>
                <Link to="/login">Login</Link>
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/user">Home</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/info">Info Page</Link>
                </MenuItem>
              </>
            )}
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}