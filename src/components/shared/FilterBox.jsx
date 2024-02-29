import React, { useState } from "react";
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
import LimitTags from "./InputBox/InputBox";
import DateRangePicker from "./calendar/DateRangePicker";
import { CheckBoxOutlined } from "@mui/icons-material";
const checkboxData = [
  { "Class time": ["Morning", "Noon", "Night", "Online"] },
  { Status: ["Planning", "Openning", "Closed"] },
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
export default function FilterBox() {
  const [checked, setChecked] = React.useState([]);
  const [trainer, setTrainer] = React.useState("");
  const handleChangeTrainer = (event) => {
    setTrainer(event.target.value);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagsChange = (tags) => {
    setSelectedTags(tags);
  };
  const handleClear = () => {
    setChecked([]);
    setSelectedTags([]);
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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h8">Class Location</Typography>
          <LimitTags
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h8">Class time frame</Typography>
          <DateRangePicker />
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
                            checkedIcon={<CheckBoxOutlined/>}
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
                value={trainer}
                label="Select"
                onChange={handleChangeTrainer}
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
                value={trainer}
                label="Select"
                onChange={handleChangeTrainer}
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
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
