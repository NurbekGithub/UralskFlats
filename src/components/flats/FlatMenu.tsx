import { Menu, MenuItem, Typography } from "@material-ui/core";

import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function FlatMenu({
  anchorEl,
  handleClose,
  handleEdit,
  handleDelete,
  handleAddTransaction,
}: any) {
  const isAdmin = useContext(UserContext)[0] === 'aia';
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleAddTransaction}>Сдать</MenuItem>
      {isAdmin && <MenuItem onClick={handleEdit}>Редактировать</MenuItem>}
      {isAdmin && <MenuItem onClick={handleDelete} component={Typography} color="secondary">
        Удалить
      </MenuItem>}
    </Menu>
  )
}