import { Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";

import Menu from "@mui/material/Menu";
import FilterBoxClassList from "./FilterBoxClassList";

export function BasicFilterClassListbtn() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{
          background: "#2D3748",
          fontSize: 14,
        }}
        variant="contained"
        size="small"
        startIcon={<FilterListIcon />}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Filter
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".css-6hp17o-MuiList-root-MuiMenu-list": {
            padding: "10px 20px",
          },
        }}
      >
        <FilterBoxClassList />
      </Menu>
    </div>
  );
}
