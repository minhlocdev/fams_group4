import {
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DateRangePicker from "../../shared/calendar/DateRangePicker";
import { CheckBoxOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { parse } from "date-fns";
import { UserContext } from "../../../context/UserContext";
const checkboxData = [
  { "Permission Type": ["Super Admin", "Class Admin", "Trainer"] },
  { Gender: ["Male", "Female"] },
];
export default function FilterUserMenu() {
  const { checked, setChecked, handleChangePage } = useContext(UserContext);
  const [selected, setSelected] = useState({
    "Permission Type":
      checked.roleName !== "" ? checked.roleName.split(", ") : [],
    Gender: checked.roleName !== "" ? checked.gender.split(", ") : [],
    dateRange: !(checked.dobFro === "" || checked.dobTo === "") && {
      from: parse(checked.dobFro, "MM/dd/yyyy", new Date()),
      to: parse(checked.dobTo, "MM/dd/yyyy", new Date()),
    },
  });
  const handleClear = () => {
    setSelected({
      "Permission Type": [],
      Gender: [],
      dateRange: null,
    });
    setChecked({
      roleName: "",
      gender: "",
      dobFro: "",
      dobTo: "",
    });
  };

  const handleToggle = (name, value) => {
    const currentIndex = selected[name].indexOf(value);
    const newChecked = { ...selected };

    if (currentIndex === -1) {
      newChecked[name] = [...newChecked[name], value];
    } else {
      newChecked[name] = newChecked[name].filter((item) => item !== value);
    }
    setSelected(newChecked);
  };
  const handleDateRange = (range) => {
    setSelected({
      ...selected,
      dateRange: range,
    });
  };
  const handleSetChecked = (event) => {
    setChecked({
      roleName: selected["Permission Type"].join(", "),
      gender: selected["Gender"].join(", "),
      dobFro: selected.dateRange
        ? dayjs(selected["dateRange"].from).format("MM/DD/YYYY")
        : "",
      dobTo: selected.dateRange
        ? dayjs(selected["dateRange"].to).format("MM/DD/YYYY")
        : "",
    });
    handleChangePage(event, 0);
  };
  return (
    <>
      <Typography variant="h8">Date Of Birth Range</Typography>
      <DateRangePicker
        range={selected.dateRange}
        handleChange={handleDateRange}
      />
      <Grid container>
        {checkboxData.map((category, index) => (
          <Grid item xs={6} key={index}>
            {Object.entries(category).map(([categoryName, options]) => (
              <Stack key={categoryName} direction="row" spacing={1}>
                <Typography variant="h8" py={1}>
                  {categoryName}
                </Typography>
                <List
                  sx={{
                    padding: "0",
                  }}
                >
                  {options.map((option) => (
                    <ListItem key={option} disablePadding>
                      <ListItemButton
                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                        onClick={() => handleToggle(categoryName, option)}
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
                            checked={selected[categoryName].includes(option)}
                            checkedIcon={<CheckBoxOutlined />}
                          />
                        </ListItemIcon>
                        <ListItemText primary={option} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            ))}
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
        <Button
          sx={{
            color: "whitesmoke",
            backgroundColor: "#2D3748",
            padding: "5px 25px",
            fontWeight: "600",
            borderRadius: "8px",
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
            color: "whitesmoke",
            backgroundColor: "#2D3748",
            padding: "5px 25px",
            borderRadius: "8px",
            fontWeight: "600",

            "&:hover": {
              backgroundColor: "#2D3748",
              opacity: "0.5",
            },
          }}
          onClick={handleSetChecked}
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
