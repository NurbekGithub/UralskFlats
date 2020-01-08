import React from "react"
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">{LocationTitle[location.pathname]}</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}