import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

const RightSide = styled.div`
  font-family: "Open Sans", sans-serif;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-evenly;
  width: 10%;
  margin-right: 1.5em;
  @media screen and (min-width: 900px) {
    margin-right: 0;
  }
`;
const LeftSide = styled.div`
  font-family: "Open Sans", sans-serif;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-evenly;
  width: 15%;
  margin-left: 1.5em;
  @media (min-width: 900px) {
    margin-left: 0;
  }
`;
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#5e5e5e",
          marginBottom: "2em",
          marginTop: "1em",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <RightSide>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Winday
            </Typography>
          </RightSide>
          <LeftSide>
            <Button color="inherit">התחברות</Button>
            <Button color="inherit">הרשמה</Button>
          </LeftSide>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
