/* eslint-disable react/jsx-wrap-multilines */
import React from "react"
import {
  Drawer,
} from "@material-ui/core"
import NewFlatFormContainer from "./NewFlatFormContainer"
import EditFlatFormContainer from "./EditFlatFormContainer"
import DeleteFlat from "./DeleteFlat"
import NewTransaction from "../transactions/NewTransaction"
import NewBooking from "../bookings/NewBooking"

export default function FlatDrawer({
  handleDrawerClose,
  drawer,
  selectedFlat,
}: any) {
  let DrawerComponent = null

  if (drawer === "new") {
    DrawerComponent = <NewFlatFormContainer />
  }

  if (drawer === "edit") {
    DrawerComponent = (
      <EditFlatFormContainer selectedFlat={selectedFlat} />
    )
  }

  if (drawer === "delete") {
    DrawerComponent = <DeleteFlat id={selectedFlat.id} handleDrawerClose={handleDrawerClose} />
  }

  if (drawer === "transaction") {
    DrawerComponent = (
      <NewTransaction selectedFlatId={selectedFlat.id} handleDrawerClose={handleDrawerClose} />
    )
  }
  if (drawer === "booking") {
    DrawerComponent = (
      <NewBooking selectedFlatId={selectedFlat.id} handleDrawerClose={handleDrawerClose} />
    )
  }
  return (
    <Drawer anchor="bottom" open={Boolean(drawer)} onClose={handleDrawerClose}>
      {DrawerComponent}
    </Drawer>
  )
}