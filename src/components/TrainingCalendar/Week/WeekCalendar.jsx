import React, { useContext } from "react";
import TrainingWeekPicker from "./TrainingWeekPicker";
import WeekTable from "./WeekTable";
import { Box } from "@mui/material";
import { CalendarContext } from "../../../context/CalendarContext";

export default function WeekCalendar() {
  const { selectedDay, setSelectedDay } = useContext(CalendarContext);

  const handleValue = (newValue) => {
    setSelectedDay(newValue);
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "flex-end",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <TrainingWeekPicker value={selectedDay} handleValue={handleValue} />
      </Box>
      <WeekTable type={"morning"} selectedDate={selectedDay} />
      <WeekTable type={"noon"} selectedDate={selectedDay} />
      <WeekTable type={"night"} selectedDate={selectedDay} />
    </Box>
  );
}
