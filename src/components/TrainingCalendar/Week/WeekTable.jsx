import React, { useContext } from "react";
import dayjs from "dayjs";
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
  Stack,
} from "@mui/material";
import { CalendarContext } from "../../../context/CalendarContext";
import theme from "../../../assets/theme";
const attendeeColors = {
  Fresher: theme.pink,
  "Online fee-Fresher": theme.green,
  Intern: theme.primary,
  "Offline fee-Fresher": theme.orange,
};
const WeekTable = ({ type, selectedDate }) => {
  const [expandedOutline, setExpandedOutline] = React.useState(true);
  const { trainingContent } = useContext(CalendarContext);
  const getWeekDates = (value) => {
    const startOfWeek = dayjs(value).startOf("week");
    const endOfWeek = dayjs(value).endOf("week");
    return { startOfWeek, endOfWeek };
  };

  const handleDisplayType = (sessionTime) => {
    let hour = sessionTime.split(":")[0];
    hour = Number.parseInt(hour);
    if (
      (type === "morning" && hour >= 8 && hour <= 12) ||
      (type === "noon" && hour >= 13 && hour <= 17) ||
      (type === "night" && hour >= 18 && hour <= 22)
    ) {
      return true;
    }
    return false;
  };
  const checkRightDate = (time, timeInTable) => {
    return (
      dayjs(time).format("MM/DD/YYYY") ===
      dayjs(timeInTable).format("MM/DD/YYYY")
    );
  };
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
        expand={expandedOutline}
        onClick={() => setExpandedOutline(!expandedOutline)}
        aria-expanded={expandedOutline}
        aria-label="show more"
      >
        <Grid item>
          <Typography>{type}</Typography>
        </Grid>
      </Grid>
      <Collapse in={expandedOutline} timeout="auto" unmountOnExit>
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
                  const dayInWeek = dayjs(
                    getWeekDates(selectedDate).startOfWeek
                  ).add(index, "day");

                  return (
                    <TableCell
                      key={dayInWeek.format("D")}
                      align="center"
                      size="small"
                    >
                      {dayInWeek.format("D")}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                {Array.from({ length: 7 }, (_, index) => {
                  const day = dayjs(getWeekDates(selectedDate).startOfWeek).add(
                    index,
                    "day"
                  );

                  return (
                    <TableCell
                      key={`${day.format("DD/MM/YYYY")}-${type}`}
                      align="center"
                      size="small"
                    >
                      <Stack
                        sx={{
                          width: "fit-content",
                          // maxWidth: "200px",
                          margin: "0 auto",
                          borderRadius: "5px",
                          color: "white",
                          alignItems: "flex-start",
                        }}
                        spacing={1}
                      >
                        {trainingContent.map((session) => {
                          if (
                            checkRightDate(session.time, day) &&
                            handleDisplayType(session.classTime)
                          ) {
                            return (
                              <Box
                                key={session.classCode}
                                sx={{
                                  backgroundColor:
                                    attendeeColors[session.attendee],
                                  textWrap: "wrap",
                                  wordWrap: "break-word",
                                  wordBreak: "break-all",
                                  padding: "10px 5px",
                                  borderRadius: "10px",
                                  maxWidth: "100%",
                                }}
                              >
                                <Typography variant="body" sx={{}}>
                                  {session.className}
                                </Typography>
                                <br></br>
                                <Typography variant="span">
                                  {session.classTime} at {session.location}
                                </Typography>
                                <br></br>
                                <Typography variant="span">
                                  Trainer: {session.trainerName.name}
                                </Typography>
                              </Box>
                            );
                          } else return null;
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
