import { CheckBoxOutlined } from "@mui/icons-material";
import {
  Button,
  List,
  Menu,
  ListItem,
  ListItemButton,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import ClassContext from "../../../context/ClassContext";
import dayjs from "dayjs";
import { QuantityInput } from "../../shared/lib/CustomMUI";
import { memo } from "react";
const options = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function TimeFrameOptions(props) {
  const { startDate } = props;
  const { setInitialDays } = useContext(ClassContext);
  const [dayToAdd, setDayToAdd] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checked, setChecked] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleClear = () => {
    setChecked([]);
    setInitialDays([]);
  };
  const autoAddWeekdays = useCallback(
    (selectedOptions) => {
      const dates = [];
      let currentDate = dayjs(startDate).startOf("day");

      const selectedWeekdays = selectedOptions.map((option) =>
        options.indexOf(option)
      );

      if (selectedWeekdays.length === 0) {
        return []; // Return empty array if no weekdays are selected
      }

      let daysAdded = 0;

      while (daysAdded < dayToAdd) {
        if (selectedWeekdays.includes(currentDate.day())) {
          dates.push(currentDate.toDate());
          daysAdded++;
        }
        currentDate = currentDate.add(1, "day");
      }
      return dates;
    },
    [startDate, dayToAdd]
  );
  const handleSave = () => {
    setInitialDays(autoAddWeekdays(checked));
  };
  return (
    <>
      <Button
        sx={{
          color: "#fff",
          border: "1px solid #fff",
          borderRadius: "5px",
          fontSize: "10px",
          padding: "3px 5px",
        }}
        onClick={handleClick}
      >
        Options
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List
          sx={{
            padding: "0",
          }}
        >
          <ListItem>
            <Stack>
              <ListItemText>Number of Days: </ListItemText>
              <QuantityInput value={dayToAdd} onInputChange={setDayToAdd} />
            </Stack>
          </ListItem>
          {options.map((option) => (
            <ListItem key={option} disablePadding>
              <ListItemButton
                role={undefined}
                sx={{ paddingTop: 0, paddingBottom: 0 }}
                onClick={() => handleToggle(option)}
                dense
              >
                <ListItemIcon
                  sx={{
                    minWidth: "35px",
                  }}
                >
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked={checked.indexOf(option) !== -1}
                    checkedIcon={<CheckBoxOutlined />}
                  />
                </ListItemIcon>
                <ListItemText primary={option} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button
          sx={{
            color: "whitesmoke",
            backgroundColor: "#2D3748",
            padding: "5px 10px",
            fontWeight: "600",
            borderRadius: "8px",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#2D3748",
              opacity: "0.5",
            },
          }}
          onClick={() => handleClear()}
        >
          Clear
        </Button>
        <Button
          sx={{
            marginLeft: "5px",
            color: "whitesmoke",
            backgroundColor: "#2D3748",
            padding: "5px 10px",
            fontWeight: "600",
            borderRadius: "8px",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#2D3748",
              opacity: "0.5",
            },
          }}
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </Menu>
    </>
  );
}
export default memo(TimeFrameOptions);
