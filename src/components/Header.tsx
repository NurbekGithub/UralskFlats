import React, { useContext } from "react"
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core"
import { Link, useLocation } from 'react-router-dom';
import Auth from "./Auth";
import { SidebarContext } from "../context/SidebarContext";
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const LocationTitle: any = {
  '/': 'Квартиры',
  '/transactions': "Журнал"
}

export default function Header() {
  const classes = useStyles()
  const location = useLocation();
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
            <Link to="/">{LocationTitle[location.pathname]}</Link>
          </Typography>
          <Auth />
        </Toolbar>
      </AppBar>
    </div>
  )
}