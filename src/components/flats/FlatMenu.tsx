import { Menu, MenuItem, Typography } from "@material-ui/core";

import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function FlatMenu({
  anchorEl,
  handleClose,
  handleEdit,
  handleDelete,
  handleAddBooking,
  handleAddTransaction,
}: any) {
  const { isAdmin } = useContext(UserContext);
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleAddTransaction}>Сдать</MenuItem>
      <MenuItem onClick={handleAddBooking}>Забронировать</MenuItem>
      {isAdmin && <MenuItem onClick={handleEdit}>Редактировать</MenuItem>}
      {isAdmin && <MenuItem onClick={handleDelete} component={Typography} color="secondary">
        Удалить
      </MenuItem>}
    </Menu>
  )
}