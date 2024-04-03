import React, { useContext, useState } from "react";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { CheckBoxOutlined } from "@mui/icons-material";
import DateRangePicker from "../../shared/calendar/DateRangePicker";
import LimitTags from "../../shared/InputBox/InputBox";
import { format, parse } from "date-fns";
import ClassContext from "../../../context/ClassContext";
const checkboxData = [
  { "Class time": ["Morning", "Noon", "Night", "Online"] },
  { Status: ["Planning", "Opening", "Closed"] },
  {
    Attendee: [
      "Intern",
      "Fresher",
      "Online fee-fresher",
      "Offline fee-fresher",
    ],
  },
];
const TrainerData = [
  { name: "John Doe", code: "JD" },
  { name: "Jane Smith", code: "JS" },
  { name: "Bob Johnson", code: "BJ" },
  { name: "Alice Williams", code: "AW" },
  { name: "Michael Brown", code: "MB" },
  { name: "Emily Davis", code: "ED" },
  { name: "David Miller", code: "DM" },
  { name: "Olivia Wilson", code: "OW" },
  { name: "Daniel Taylor", code: "DT" },
];
export default function FilterBoxClassList() {
  const { checked, setChecked, handleChangePage } = useContext(ClassContext);
  const [selected, setSelected] = React.useState({
    locations: checked.locations !== "" ? checked.locations.split(", ") : [],
    dateRange: !(checked.startDate === "" || checked.endDate === "") && {
      from: parse(checked.startDate, "MM/dd/yyyy", new Date()),
      to: parse(checked.endDate, "MM/dd/yyyy", new Date()),
    },
    "Class time":
      checked.typeClassTime !== "" ? checked.typeClassTime.split(", ") : [],
    Status: checked.status !== "" ? checked.status.split(", ") : [],
    Attendee: checked.attendees !== "" ? checked.attendees.split(", ") : [],
    FSU: checked.FSU,
    trainerId: checked.trainerId,
  });
  const handleClear = () => {
    setSelected({
      locations: [],
      dateRange: null,
      "Class time": [],
      Status: [],
      Attendee: [],
      FSU: "",
      trainerId: "",
    });
    setChecked({
      locations: "",
      startDate: "",
      endDate: "",
      status: "",
      typeClassTime: "",
      FSU: "",
      trainerId: "",
      attendees: "",
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
  const handleSelect = (name, value) => {
    setSelected({
      ...selected,
      [name]: value,
    });
  };
  const handleLocation = (value) => {
    setSelected({
      ...selected,
      locations: value,
    });
  };
  const handleSetChecked = (event) => {
    setChecked({
      locations: selected.locations.join(", "),
      startDate: selected.dateRange
        ? format(selected.dateRange.from, "MM/dd/yyyy")
        : "",
      endDate: selected.dateRange
        ? format(selected.dateRange.to, "MM/dd/yyyy")
        : "",
      status: selected.Status.join(", "),
      typeClassTime: selected["Class time"].join(", "),
      FSU: selected.FSU,
      trainerId: selected.trainerId,
      attendees: selected.Attendee.join(", "),
    });
    handleChangePage(event, 0);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Typography variant="h8">Class Location</Typography>
          <LimitTags
            selectedTags={selected.locations}
            onTagsChange={handleLocation}
          />
        </Grid>
        <Grid item xs={5} ml={"auto"}>
          <Typography variant="h8">Class time frame</Typography>
          <DateRangePicker
            range={selected.dateRange}
            handleChange={handleDateRange}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: "30px" }}>
        {checkboxData.map((category, index) => (
          <Grid item xs={4} key={index}>
            {Object.entries(category).map(([categoryName, options]) => (
              <Stack key={categoryName} direction="row" spacing={2}>
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
                        role={undefined}
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

      <Stack direction="row" my={3}>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography variant="h8">FSU</Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected.FSU}
                label="Select"
                onChange={(e) => handleSelect("FSU", e.target.value)}
                sx={{
                  "& .MuiSelect-select": {
                    width: "240px",
                  },
                  "& .MuiSelect-nativeInput": {
                    border: "none",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    boxShadow: "2px 1px 3px rgba(0,0,0,0.3)",
                  },
                }}
              >
                {TrainerData.map((item) => (
                  <MenuItem key={item.code} value={item.name}>
                    {item.code} - {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginLeft: "auto" }}
          alignItems={"center"}
        >
          <Typography variant="h8">Trainer</Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected.trainerId}
                label="Select"
                onChange={(e) => handleSelect("trainerId", e.target.value)}
                sx={{
                  "& .MuiSelect-select": {
                    width: "240px",
                  },
                  "& .MuiSelect-nativeInput": {
                    border: "none",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    boxShadow: "2px 1px 3px rgba(0,0,0,0.3)",
                  },
                }}
              >
                {TrainerData.map((item) => (
                  <MenuItem key={item.code} value={item.name}>
                    {item.code} - {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Stack>
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
