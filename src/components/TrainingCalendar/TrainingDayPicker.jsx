import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { dayStyles } from "./Calendar.style";
export default function TrainingDayPicker({ value, handleValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={handleValue}
        showDaysOutsideCurrentMonth
        sx={dayStyles}
        views={["day"]}
      />
    </LocalizationProvider>
  );
}
