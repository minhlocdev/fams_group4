import React, { useContext } from "react";
import TrainingDayPicker from "./TrainingDayPicker";
import DayTable from "./DayTable";
import { Box } from "@mui/material";
import { CalendarContext } from "../../../context/CalendarContext";

export default function DayCalendar() {
  const { selectedDay, setSelectedDay } = useContext(CalendarContext);
  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "flex-end",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <TrainingDayPicker value={selectedDay} handleValue={setSelectedDay} />
      </Box>
      <DayTable />
    </Box>
  );
}
