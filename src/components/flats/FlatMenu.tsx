import { Menu, MenuItem, Typography } from "@material-ui/core";

import React from "react";

export default function FlatMenu({
  anchorEl,
  handleClose,
  handleEdit,
  handleDelete,
  handleAddTransaction,
}: any) {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleAddTransaction}>Сдать</MenuItem>
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete} component={Typography} color="secondary">
        Удалить
      </MenuItem>
    </Menu>
  )
}