/* eslint-disable react/jsx-wrap-multilines */
import React from "react"
import { Drawer } from "@material-ui/core"
import DeleteTransaction from "./DeleteTransaction"

export default function TransactionDrawer({
  handleDrawerClose,
  drawer,
  selectedTransaction,
}: any) {
  let DrawerComponent = null

  if (drawer === "delete") {
    DrawerComponent = <DeleteTransaction id={selectedTransaction.id} handleDrawerClose={handleDrawerClose} />
  }

  return (
    <Drawer anchor="bottom" open={Boolean(drawer)} onClose={handleDrawerClose}>
      {DrawerComponent}
    </Drawer>
  )
}