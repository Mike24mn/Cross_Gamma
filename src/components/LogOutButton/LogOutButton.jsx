import { useDispatch } from 'react-redux';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function LogOutButton(props) {
  const dispatch = useDispatch();
  return (

    <Stack spacing={2} direction="row">
      <Button onClick={() => dispatch({ type: 'LOGOUT' })} variant="contained">Logout</Button>
    </Stack>
  );
}

export default LogOutButton;
