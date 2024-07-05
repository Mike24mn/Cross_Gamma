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
import { styled } from '@mui/material/styles';  

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  width: '100%',
  display: 'block',
    fontWeight: 'bold',
    textDecoration: 'underline',
})

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
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: '#666',
              },
              
    '& .MuiMenuItem-root': {
      color: '#00CED1', 
      '&:hover': {
        backgroundColor: '#333', 
      },
    },
            }}
          >
             {/* if no user id, route to login */}
            {!user.id ? (
              <MenuItem  onClick={handleMenuClose} >
                <StyledLink to="/login">Login</StyledLink>
              </MenuItem>
            ) : (
              
              <>
              {/* if user id, allow routes to acc overview, curr pos, and notes, also render that logout button! */}
                <MenuItem onClick={handleMenuClose}>
                  <StyledLink to="/overview">Account Overview</StyledLink>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <StyledLink to="/currentpos">Current Positions</StyledLink>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <StyledLink to="/notes">Notes</StyledLink>
                </MenuItem>
              </>
            )}
             {/* if no user id allow route to about as well */}
             <MenuItem onClick={handleMenuClose}>
              <StyledLink to="/about">About</StyledLink>
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