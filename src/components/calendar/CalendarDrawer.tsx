/* eslint-disable react/jsx-wrap-multilines */
import React from "react"
import {
  Drawer,
} from "@material-ui/core"
import NewTransaction from "../transactions/NewTransaction"
import NewBooking from "../bookings/NewBooking"

export default function CalendarDrawer({
  handleDrawerClose,
  drawer,
  selectedFlatId,
}: any) {
  let DrawerComponent = null

  if (drawer === "transaction") {
    DrawerComponent = (
      <NewTransaction selectedFlatId={selectedFlatId} handleDrawerClose={handleDrawerClose} />
    )
  }
  if (drawer === "booking") {
    DrawerComponent = (
      <NewBooking selectedFlatId={selectedFlatId} handleDrawerClose={handleDrawerClose} />
    )
  }
  return (
    <Drawer anchor="bottom" open={Boolean(drawer)} onClose={handleDrawerClose}>
      {DrawerComponent}
    </Drawer>
  )
}