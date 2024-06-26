import { useDispatch } from 'react-redux'
import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'



function LogOutButton() {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/login')
  }

  return (

    <Stack spacing={2} direction="row">
      <Button onClick={handleLogout} variant="contained">Logout</Button>
    </Stack>
  );
}

export default LogOutButton;
