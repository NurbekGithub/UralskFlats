import React, { useState, useCallback, useEffect } from "react"
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import BusinessIcon from "@material-ui/icons/Business"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation();
  const toggle = useCallback(() => {
    setIsOpen((isOpen: boolean) => !isOpen)
  }, [])
  useEffect(() => {
    setIsOpen(false)
  }, [location])
  return (
    <SwipeableDrawer open={isOpen} onOpen={toggle} onClose={toggle}>
      <List>
        <ListItem divider button component={Link} to="/">
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Квартиры" />
        </ListItem>
        <ListItem divider button component={Link} to="/transactions">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Журнал" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}
