/* eslint-disable react/jsx-wrap-multilines */
import React from "react"
import {
  Drawer,
} from "@material-ui/core"
import NewFlatFormContainer from "./NewFlatFormContainer"
import EditFlatFormContainer from "./EditFlatFormContainer"
import DeleteFlat from "./DeleteFlat"
import NewTransaction from "../transactions/NewTransaction"

export default function FlatDrawer({
  handleDrawerClose,
  drawer,
  selectedFlat,
  set,
  del,
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
    DrawerComponent = <DeleteFlat selectedFlat={selectedFlat} handleDrawerClose={handleDrawerClose} />
  }

  if (drawer === "transaction") {
    DrawerComponent = (
      <NewTransaction selectedFlat={selectedFlat} setFlat={set} />
    )
  }
  return (
    <Drawer anchor="bottom" open={Boolean(drawer)} onClose={handleDrawerClose}>
      {DrawerComponent}
    </Drawer>
  )
}