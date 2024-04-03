import * as React from "react";
import { Button, Menu, Stack } from "@mui/material";
import { DayPicker } from "react-day-picker";

import { isSameDay } from "date-fns";
export default function DateRangePicker(props) {
  const { range, handleChange } = props;
  let footer = "Please pick a day.";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (range?.from && range?.to) {
    if (isSameDay(range.from, range.to)) {
      footer = "Choose more days.";
    } else {
      footer = `${range.from.toLocaleDateString()}—${range.to.toLocaleDateString()}.`;
    }
  }
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems={"center"}
      sx={{ marginTop: "5px" }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {footer}
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
          marginTop: "15px",
        }}
      >
        <DayPicker
          mode="range"
          onSelect={handleChange}
          selected={range}
          showOutsideDays
          captionLayout="dropdown-buttons"
          fromYear={1900}
          toYear={2024}
        />
      </Menu>
    </Stack>
  );
}
