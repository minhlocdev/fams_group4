import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { dayStyles, skeletonStyles } from "../Week/Calendar.style";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { CalendarContext } from "../../../context/CalendarContext";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(dayjs(props.day).format("YYYY-MM-DD")) >= 0;
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "💧" : undefined}
      sx={{ flex: "1 1 0" }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}
export default function TrainingDayPicker({ value, handleValue }) {
  const { trainingContent, isLoading } = React.useContext(CalendarContext);
  const highlightedDays = React.useMemo(() => {
    let result = [];
    if (trainingContent) {
      result = trainingContent.map(
        (content) => dayjs(content.time).format("YYYY-MM-DD") || []
      );
      return result;
    }
  }, [trainingContent]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={handleValue}
        showDaysOutsideCurrentMonth
        sx={dayStyles}
        views={["day"]}
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton sx={skeletonStyles} />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
