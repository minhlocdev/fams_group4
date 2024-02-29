import { Menu, MenuItem } from "@mui/base";
import React from "react";

export default function FilterPopUp({ anchorEl, open, close }) {
  console.log(anchorEl);
  const isOpen = Boolean(anchorEl);
  return (
    <Menu open={isOpen} onClose={close} anchorEl={anchorEl}>
      <MenuItem onClick={close}>Profile</MenuItem>
      <MenuItem onClick={close}>My account</MenuItem>
      <MenuItem onClick={close}>Logout</MenuItem>
    </Menu>
  );
}
