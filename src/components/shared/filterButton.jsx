import { Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";

import Menu from "@mui/material/Menu";
import FilterBox from "./FilterBox";
export function BasicFilterbtn() {
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
        <FilterBox />
      </Menu>
    </div>
  );
}

export function DoubleFilterbtn() {
  return (
    <Button
      sx={{
        background: "#2D3748",
        fontSize: 14,
      }}
      variant="contained"
      size="small"
      startIcon={<FilterListIcon />}
      endIcon={<FilterListIcon />}
    >
      Filter
    </Button>
  );
}

export function IconFilterbtn() {
  return (
    <Button
      sx={{
        background: "#2D3748",
        fontSize: 14,

        paddingLeft: 2,
        paddingRight: 2,
      }}
      variant="contained"
      size="small"
    >
      <FilterListIcon />
    </Button>
  );
}

export function NoneIconFilterbtn() {
  return (
    <Button
      sx={{
        background: "#2D3748",
        fontSize: 14,

        paddingLeft: 2,
        paddingRight: 2,
      }}
      variant="contained"
      size="small"
    >
      Filter
    </Button>
  );
}

export function LageFilterbtn() {
  return (
    <Button
      sx={{
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 2,
        paddingBottom: 2,
        background: "#2D3748",
        boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        borderRadius: 2,
        fontSize: 14,
      }}
      variant="contained"
      size="large"
    >
      Filter
    </Button>
  );
}

export function GrayFilterbtn() {
  return (
    <Button
      sx={{
        background: "#474747",
        fontSize: 14,
        paddingLeft: 2,
        paddingRight: 2,
      }}
      variant="contained"
      size="small"
    >
      Filter
    </Button>
  );
}

export function LinkFilterbtn() {
  return (
    <Button
      sx={{
        color: "#E74A3B",
        fontSize: 14,
        paddingLeft: 2,
        paddingRight: 2,
        textDecoration: "underline",
      }}
      size="small"
    >
      Filter
    </Button>
  );
}
