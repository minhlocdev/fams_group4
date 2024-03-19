import React from "react";
import TrainingDayPicker from "./TrainingDayPicker";
import dayjs from "dayjs";
import DayTable from "./DayTable";
import { Box } from "@mui/material";

export default function DayCalendar() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  return (
    <Box sx={{ width: "100%", marginTop: "100px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "flex-end",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <TrainingDayPicker value={selectedDate} handleValue={setSelectedDate} />
      </Box>
      <DayTable selectedDate={selectedDate} />
    </Box>
  );
}
