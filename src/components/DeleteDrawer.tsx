import React from 'react'
import { Drawer } from "@material-ui/core"
import DeleteComponent from './DeleteComponent'

interface DeleteDrawerProps {
  handleDelete(): void;
  handleClose(): void;
  isOpen: boolean;
}

export default function DeleteDrawer({ handleDelete, isOpen, handleClose }: DeleteDrawerProps) {
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={handleClose}>
      <DeleteComponent handleDelete={handleDelete} />
    </Drawer>
  )
}
