import React from "react";
import dayjs from "dayjs";
import TrainingWeekPicker from "./TrainingWeekPicker";
import {
  calendarTime,
  trainingContent,
  weekTrainingContent,
} from "../../constants/TrainingCalendar";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Collapse,
  Divider,
  Stack,
} from "@mui/material";

const WeekTable = ({ type, value }) => {
  const [expandedOutline, setExpandedOutline] = React.useState([true]);

  const handleExpandOutlineClick = (section) => {
    const newExpandedOutline = [...expandedOutline];
    newExpandedOutline[section] = !newExpandedOutline[section];
    setExpandedOutline(newExpandedOutline);
  };

  const displayedSessions = new Set();

  const getWeekDates = (value) => {
    const startOfWeek = dayjs(value).startOf("week");
    const endOfWeek = dayjs(value).endOf("week");
    return { startOfWeek, endOfWeek };
  };

  const handleDisplayType = (sessionTime) => {
    const [hour, minute] = sessionTime.split(":").map(Number);

    if (
      (type === "morning" && hour >= 8 && hour <= 12) ||
      (type === "noon" && hour >= 13 && hour <= 17) ||
      (type === "night" && hour >= 18 && hour <= 22)
    ) {
      return true;
    }

    return false;
  };

  //   console.log(
  //     type === "morning" &&
  //       ((Number("11") >= 8 && Number("11") < 12) ||
  //         (Number("11") === 12 && Number("00") === 0))
  //   );
  return (
    <Box sx={{ width: "100%", paddingBottom: "20px" }}>
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
        expand={expandedOutline[0]} // Sử dụng giá trị tương ứng trong mảng expandedOutline
        onClick={() => handleExpandOutlineClick(0)} // Truyền vào chỉ số của phần tử calendar
        aria-expanded={expandedOutline[0]} // Sử dụng giá trị tương ứng trong mảng expandedOutline
        aria-label="show more"
      >
        <Grid item>
          <Typography>{type}</Typography>
        </Grid>
      </Grid>
      <Collapse in={expandedOutline[0]} timeout="auto" unmountOnExit>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">SUN</TableCell>
                <TableCell align="center">MON</TableCell>
                <TableCell align="center">TUE</TableCell>
                <TableCell align="center">WEB</TableCell>
                <TableCell align="center">THU</TableCell>
                <TableCell align="center">FRI</TableCell>
                <TableCell align="center">SAT</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow sx={{ backgroundColor: "#DFDEDE" }}>
                {Array.from({ length: 7 }, (_, index) => {
                  const day = dayjs(getWeekDates(value).startOfWeek).add(
                    index,
                    "day"
                  );

                  return (
                    <TableCell
                      key={day.format("D")}
                      align="center"
                      size="small"
                    >
                      {day.format("D")}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                {Array.from({ length: 7 }, (_, index) => {
                  const day = dayjs(getWeekDates(value).startOfWeek).add(
                    index,
                    "day"
                  );

                  return (
                    <TableCell
                      key={day.format("DD/MM/YYYY")}
                      align="center"
                      size="small"
                    >
                      <Stack
                        sx={{
                          width: "fit-content",
                          maxWidth: "200px",
                          margin: "0 auto",
                          borderRadius: "5px",
                          color: "white",
                          alignItems: "flex-start",
                        }}
                        spacing={1}
                      >
                        {trainingContent.map((session) => {
                          if (
                            session.date === day.format("DD/MM/YYYY") &&
                            handleDisplayType(session.time) &&
                            !displayedSessions.has(session.id)
                          ) {
                            // Add session id to the set of displayed sessions
                            displayedSessions.add(session.id);

                            return (
                              <Typography
                                key={session.id}
                                variant="body"
                                sx={{
                                  backgroundColor: session.color,
                                  textWrap: "wrap",
                                  wordWrap: "break-word",
                                  wordBreak: "break-all",
                                  padding: "10px 10px",
                                  borderRadius: "10px",
                                }}
                              >
                                {session.class}
                              </Typography>
                            );
                          }
                          return null;
                        })}
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
};

export default WeekTable;
