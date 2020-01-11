import React, { useCallback, useEffect, useContext } from "react"
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
import { UserContext } from "../context/UserContext"
import { SidebarContext } from "../context/SidebarContext"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useContext(SidebarContext)
  const { isAdmin } = useContext(UserContext);
  const location = useLocation();
  const toggle = useCallback(() => {
    setIsOpen((isOpen: boolean) => !isOpen)
  }, [setIsOpen])
  useEffect(() => {
    setIsOpen(false)
  }, [location, setIsOpen])
  return (
    <SwipeableDrawer open={isOpen} onOpen={toggle} onClose={toggle}>
      <List>
        <ListItem divider button component={Link} to="/">
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Квартиры" />
        </ListItem>
        {isAdmin && <ListItem divider button component={Link} to="/transactions">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Журнал" />
        </ListItem>}
      </List>
    </SwipeableDrawer>
  )
}
