import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";

export const Journal = ()=> {
    return (
        <>
        <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6">
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
        </>
    );
}