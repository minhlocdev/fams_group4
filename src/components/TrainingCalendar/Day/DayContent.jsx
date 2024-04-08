import React, { useCallback, useContext, useMemo, useState } from "react";
import { Grid, Collapse, Typography, Box } from "@mui/material";
import { CalendarContext } from "../../../context/CalendarContext";
import dayjs from "dayjs";
import ClassContent from "./ClassContent";

export default function DayContent({ calendarTime, label, trainingContent }) {
  const [expanded, setExpanded] = useState(true);
  const { selectedDay } = useContext(CalendarContext);
  const checkTimeType = useCallback(
    (timeRange) => {
      const from = timeRange.split("-")[0];
      return calendarTime.find((i) => i.time === from);
    },
    [calendarTime]
  );

  const checkRightDate = useCallback(
    (date) => {
      return dayjs(selectedDay).isSame(date, "day");
    },
    [selectedDay]
  );

  const memoizedTraining = useMemo(() => {
    let arr = [];
    if (trainingContent) {
      trainingContent.forEach((content) => {
        let timeId = checkTimeType(content.classTime);
        if (timeId && checkRightDate(content.time)) {
          arr.push({ ...content, timeId: timeId.id });
        }
      });
    }
    return arr;
  }, [trainingContent, checkTimeType, checkRightDate]);
  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "#2D3748",
          height: "34px",
          alignItems: "center",
          borderRadius: "10px",
          color: "white",
          paddingLeft: "15px",
        }}
        expand={expanded}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <Grid item>
          <Typography>{label}</Typography>
        </Grid>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {calendarTime.map((calendar) => (
          <Grid
            container
            sx={{ borderBottom: "1px solid #d6d6d6" }}
            alignItems="center"
            key={calendar.id}
          >
            <Grid
              item
              sx={{
                display: "grid",
                placeItems: "center",
              }}
              xs={3}
              sm={2}
              md={2}
              lg={1}
            >
              <Grid sx={{ margin: "10px 0px", width: "90px" }}>
                <Typography sx={{ borderRight: "1px solid #d6d6d6" }}>
                  {calendar.time}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={9}
              sm={10}
              md={10}
              lg={11}
              sx={{
                display: "flex",
                width: "fit-content",
                justifyContent: "flex-start",
                alignContent: "center",
                flexWrap: "wrap",
              }}
            >
              {memoizedTraining
                .filter((tag) => tag.timeId === calendar.id)
                .map((tag) => (
                  <Box
                    sx={{
                      paddingLeft: "10px",
                    }}
                    key={tag.classCode}
                  >
                    <ClassContent expanded={expanded} tag={tag} />
                  </Box>
                ))}
            </Grid>
          </Grid>
        ))}
      </Collapse>
    </>
  );
}
