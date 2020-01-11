import { Menu, MenuItem, Typography } from "@material-ui/core";

import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function TransactionMenu({
  anchorEl,
  handleClose,
  handleDelete,
}: any) {
  const { isAdmin } = useContext(UserContext);
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {isAdmin && <MenuItem onClick={handleDelete} component={Typography} color="secondary">
        Удалить
      </MenuItem>}
    </Menu>
  )
}