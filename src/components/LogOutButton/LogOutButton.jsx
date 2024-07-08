import { useDispatch } from "react-redux";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64a9ad",
    },
  },
});

function LogOutButton() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={2} direction="row">
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ bgcolor: "#64a9ad" }}
        >
          Logout
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default LogOutButton;
