import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Day } from "../../shared/lib/CustomMUI";
import { skeletonStyles, weekStyles } from "./Calendar.style";
import { CalendarContext } from "../../../context/CalendarContext";
import dayjs from "dayjs";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
export default function TrainingWeekPicker({ value, handleValue }) {
  const [hoveredDay, setHoveredDay] = React.useState(null);
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
        // displayWeekNumber
        loading={isLoading}
        slots={{ day: Day }}
        renderLoading={() => <DayCalendarSkeleton sx={skeletonStyles} />}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
            highlightedDays,
          }),
        }}
        sx={weekStyles}
        views={["day"]}
      />
    </LocalizationProvider>
  );
}
