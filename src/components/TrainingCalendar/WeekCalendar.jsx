import React from "react";
import AppContainer from "../shared/layout/AppContainer";
import dayjs from "dayjs";
import TrainingWeekPicker from "./TrainingWeekPicker";
import WeekTable from "./WeekTable";
import { Box, Typography } from "@mui/material";

export default function WeekCalendar() {
  const [expandedOutline, setExpandedOutline] = React.useState([
    true,
    true,
    true,
  ]);

  const [value, setValue] = React.useState(dayjs());

  const handleValue = (newValue) => {
    setValue(newValue);
  };

  // console.log(dayjs().format('HH:mm').split(':'))
  return (
    <Box sx={{ marginTop: "100px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "flex-end",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <TrainingWeekPicker value={value} handleValue={handleValue} />
      </Box>
      <WeekTable type={"morning"} value={value} />
      <WeekTable type={"noon"} value={value} />
      <WeekTable type={"night"} value={value} />
    </Box>
  );
}
