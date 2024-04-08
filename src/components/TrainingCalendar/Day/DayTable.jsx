import React, { useContext } from "react";
import { calendarTime } from "../../../constants/TrainingCalendar";
import { Box, Stack, LinearProgress } from "@mui/material";

import DayContent from "./DayContent";
import { CalendarContext } from "../../../context/CalendarContext";

const DayTable = () => {
  const timeTypes = ["morning", "noon", "night"];
  const { trainingContent, isloading } = useContext(CalendarContext);
  if (isloading) {
    return <LinearProgress sx={{ height: 10 }} />;
  }
  return (
    <Stack spacing={3}>
      {timeTypes.map((type) => (
        <Box key={type} sx={{ width: "100%" }}>
          <DayContent
            trainingContent={trainingContent}
            calendarTime={calendarTime.filter((cal) => cal.type === type)}
            label={`${type.charAt(0).toUpperCase() + type.slice(1)} (${getLabel(
              type
            )})`}
          />
        </Box>
      ))}
    </Stack>
  );
};

// Helper function to get the label for each time type
const getLabel = (type) => {
  switch (type) {
    case "morning":
      return "08:00 - 12:00";
    case "noon":
      return "13:00 - 17:00";
    case "night":
      return "18:00 - 22:00";
    default:
      return "";
  }
};

export default DayTable;
