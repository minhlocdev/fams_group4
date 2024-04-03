import React, { useState } from "react";
import DayCalendar from "../components/TrainingCalendar/DayCalendar";
import WeekCalendar from "../components/TrainingCalendar/WeekCalendar";
import { InputBoxSearch } from "../components/shared/InputBox/InputBox";
import { BasicFilterbtn } from "../components/shared/filterButton";
import { Box, Grid, Typography, Stack, Chip } from "@mui/material";

export default function TrainingCalendar() {
  const heightNav = 32;
  const [changeDayWeek, setChangeDayWeek] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const handleFilterClick = (event) => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  const handleChangeDay = () => {
    setChangeDayWeek(false);
  };

  const handleChangeWeek = () => {
    setChangeDayWeek(true);
  };

  return (
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
          <Stack direction="row" spacing={2} sx={{ height: heightNav }}>
            <InputBoxSearch></InputBoxSearch>
            <BasicFilterbtn onClick={handleFilterClick} />{" "}
          </Stack>
        </Grid>
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
              }}
            >
              Week
            </Box>
          </Stack>
        </Grid>
      </Grid>
      {changeDayWeek ? <WeekCalendar /> : <DayCalendar />}
    </Box>
  );
}
