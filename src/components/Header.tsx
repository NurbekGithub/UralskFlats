import React, { useContext } from "react"
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core"
import { Link } from 'react-router-dom';
import Auth from "./Auth";
import { SidebarContext } from "../context/SidebarContext";
import MenuIcon from "@material-ui/icons/Menu"
import { HeaderContext } from "../context/HeaderContext";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
}))

export default function Header() {
  const classes = useStyles()
  const headerTitle = useContext(HeaderContext)[0];
  const setSidebarOpen = useContext(SidebarContext)[1];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">{headerTitle}</Link>
          </Typography>
          <Auth />
        </Toolbar>
      </AppBar>
    </div>
  )
}