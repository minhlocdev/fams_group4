import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Day } from "../shared/lib/CustomMUI";
import { weekStyles } from "./Calendar.style";
export default function TrainingWeekPicker({ value, handleValue }) {
  const [hoveredDay, setHoveredDay] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={handleValue}
        showDaysOutsideCurrentMonth
        // displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }),
        }}
        sx={weekStyles}
        views={["day"]}
      />
    </LocalizationProvider>
  );
}
