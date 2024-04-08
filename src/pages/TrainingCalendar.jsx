import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { CalendarProvider } from "../context/CalendarContext";
import WeekCalendar from "../components/TrainingCalendar/Week/WeekCalendar";
import DayCalendar from "../components/TrainingCalendar/Day/DayCalendar";

export default function TrainingCalendar() {
  const heightNav = 32;
  const [changeDayWeek, setChangeDayWeek] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);
  useEffect(() => {
    params.set("view", "day");
    setSearchParams(params);
    // eslint-disable-next-line
  }, []);
  const handleChangeDay = () => {
    setChangeDayWeek(false);
    setParams("day");
  };

  const handleChangeWeek = () => {
    setChangeDayWeek(true);
    setParams("week");
  };
  const setParams = (view) => {
    params.set("view", view);
    setSearchParams(params);
  };

  return (
    <CalendarProvider>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "calc(100% + 21px)",
            background: "#2D3748",
            paddingTop: 0.5,
            paddingBottom: 0.5,
            paddingLeft: 4,
            marginLeft: -2.5,
            marginTop: -0.3,
          }}
        >
          <Typography sx={{ color: "white" }} variant="h6">
            Training Calendar
          </Typography>
        </Box>

        {/* action right here ex:filter add import */}
        <Grid
          container
          spacing={2}
          sx={{
            height: heightNav,
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                height: heightNav,
                justifyContent: {
                  sm: "flex-start",
                  md: "flex-start",
                  lg: "flex-start",
                  xs: "center",
                },
              }}
            >
              <Box
                onClick={handleChangeDay}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15px",
                  width: "75px",
                  backgroundColor: changeDayWeek ? "white" : "#2D3748",
                  color: changeDayWeek ? "black" : "white",
                  cursor: "pointer",
                }}
              >
                Day
              </Box>
              <Box
                onClick={handleChangeWeek}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15px",
                  width: "75px",
                  backgroundColor: changeDayWeek ? "#2D3748" : "white",
                  color: changeDayWeek ? "white" : "black",
                  cursor: "pointer",
                }}
              >
                Week
              </Box>
            </Stack>
          </Grid>
        </Grid>
        {changeDayWeek ? <WeekCalendar /> : <DayCalendar />}
      </Box>
    </CalendarProvider>
  );
}
