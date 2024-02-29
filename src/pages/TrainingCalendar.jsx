import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { InputBoxSearch } from "../components/shared/InputBox/InputBox";
import { BasicFilterbtn } from "../components/shared/filterButton";
import { calendarTime, trainingContent } from "../constants/TrainingCalendar";
import {
  Grid,
  Paper,
  Collapse,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
  styled,
  Box,
  Chip,
} from "@mui/material";

export default function TrainingCalendar() {
  const [expandedOutline, setExpandedOutline] = React.useState([
    true,
    true,
    true,
  ]);

  const [expandedContent, setExpandedContent] = React.useState(
    new Array(calendarTime.length).fill(false)
  );

  const [selectedContent, setSelectedContent] = React.useState(null);

  const handleExpandOutlineClick = (section) => {
    const newExpandedOutline = [...expandedOutline];
    newExpandedOutline[section] = !newExpandedOutline[section];
    setExpandedOutline(newExpandedOutline);
  };

  const handleExpandContentClick = (id) => {
    // const currentExpandedContent = [...expandedContent];
    // currentExpandedContent[index] =
    //   currentExpandedContent[index] === tagNumber ? false : tagNumber;
    // setExpandedContent(currentExpandedContent);
    setSelectedContent((prevId) => (prevId === id ? null : id));
  };

  const tagContent = {
    lineHeight: "18px",
    fontWeight: "500",
    fontSize: "12px",
    flexGrow: "1",
    padding: "0px 10px",
  };

  const collapseTitle = {
    fontSize: "12px",
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "18px",
    whiteSpace: "nowrap",
  };

  const collapseContent = {
    fontSize: "12px",
    overflowX: "auto",
    display: "flex",
    textDecoration: "underline",
    opacity: "0.5",
    textWrap:'wrap',
  };

  const collapseIcon = {
    width: "14px",
    height: "13px",
  };

  return (
    <AppContainer>
      {/* Morning Calendar */}
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
            <Typography>Morning (8:00 - 12:00)</Typography>
          </Grid>
        </Grid>
        <Collapse in={expandedOutline[0]} timeout="auto" unmountOnExit>
          {calendarTime
            .filter((morningCalendar) => morningCalendar.type === "morning")
            .map((morningCalendar, indexCalendar) => (
              <Grid
                container
                sx={{ borderBottom: "1px solid #d6d6d6" }}
                alignItems="center"
                key={morningCalendar.id}
              >
                <Grid
                  item
                  sx={{
                    display: "grid",
                    placeItems: "center",
                  }}
                  xs={12}
                  sm={1}
                >
                  <Grid sx={{ margin: "10px 0px", width: "90px" }}>
                    <Typography sx={{ borderRight: "1px solid #d6d6d6" }}>
                      {morningCalendar.time}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    height: "24px",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    position: "relative",
                  }}
                >
                  {trainingContent
                    .filter(
                      (morningTag) => morningTag.time === morningCalendar.time
                    )
                    .map((morningTag) => (
                      <Box
                        sx={{
                          paddingLeft: "10px",
                          position: "relative",
                        }}
                        key={morningTag.id}
                      >
                        <Box
                          sx={{
                            padding: "5px 0px",
                            display: "flex",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "fit-content",
                            backgroundColor: morningTag.color,
                            borderRadius: "5px",
                            color: "white",
                            alignItems: "center",
                          }}
                          expand={selectedContent === morningTag.id}
                          onClick={() =>
                            handleExpandContentClick(
                              // indexCalendar,
                              // morningTag.id,
                              // "morning"
                              morningTag.id
                            )
                          }
                          aria-expanded={expandedContent[indexCalendar]}
                          aria-label="show more"
                        >
                          <Typography sx={tagContent}>
                            {morningTag.class}
                          </Typography>
                          <Divider
                            sx={{
                              backgroundColor: "white",
                              width: "1px",
                              height: "15px",
                              borderWidth: "1px",
                            }}
                          />
                          <Typography sx={tagContent}>
                            {morningTag.title}
                          </Typography>
                        </Box>
                        {/* Tags collapse here */}
                        <Collapse
                          in={selectedContent === morningTag.id}
                          timeout="auto"
                          unmountOnExit
                          key={morningTag.id}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#8EB1DA",
                              borderRadius: "0px 0px 5px 5px",
                              position: "relative",
                              zIndex: selectedContent ? 1 : 0,
                              opacity: "90%",
                              height: "200px",
                              padding: "10px 10px",
                            }}
                          >
                            <Typography
                              sx={{
                                lineHeight: "18px",
                                fontWeight: "500",
                                fontSize: "12px",
                              }}
                            >
                              {morningTag.duration}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                flexWrap: "wrap",
                              }}
                            >
                              <Box>
                                <Grid container sx={{ alignItems: "center" }}>
                                  <Grid item xs={1}>
                                    <HomeWorkOutlinedIcon sx={collapseIcon} />
                                  </Grid>
                                  <Grid item xs={4} sx={collapseTitle}>
                                    Location
                                  </Grid>
                                  <Grid item xs={7} sx={collapseTitle}>
                                    {morningTag.location}
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box>
                                <Grid container sx={{ alignItems: "flex-start" }}>
                                  <Grid item xs={1}>
                                    <RecordVoiceOverOutlinedIcon
                                      sx={collapseIcon}
                                    />
                                  </Grid>
                                  <Grid item xs={4} sx={collapseTitle}>
                                    Trainer
                                  </Grid>
                                  <Grid item xs={7} sx={collapseContent}>
                                    {morningTag.trainer}
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box>
                                <Grid container sx={{ alignItems: "flex-start" }}>
                                  <Grid item xs={1}>
                                    <StarOutlineIcon sx={collapseIcon} />
                                  </Grid>
                                  <Grid item xs={4} sx={collapseTitle}>
                                    Admin
                                  </Grid>
                                  <Grid item xs={7} sx={collapseContent}>
                                    {morningTag.admin}
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                </Grid>
              </Grid>
            ))}
        </Collapse>
      </Box>

      {/* Noon Calendar */}
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
          expand={expandedOutline[1]} // Sử dụng giá trị tương ứng trong mảng expandedOutline
          onClick={() => handleExpandOutlineClick(1)} // Truyền vào chỉ số của phần tử calendar
          aria-expanded={expandedOutline[1]} // Sử dụng giá trị tương ứng trong mảng expandedOutline
          aria-label="show more"
        >
          <Grid item>
            <Typography>Noon (13:00 - 17:00)</Typography>
          </Grid>
        </Grid>
        <Collapse in={expandedOutline[1]} timeout="auto" unmountOnExit>
          {calendarTime
            .filter((noonCalendar) => noonCalendar.type === "noon")
            .map((noonCalendar, indexCalendar) => (
              <Grid
                container
                sx={{ borderBottom: "1px solid #d6d6d6" }}
                alignItems="center"
                key={noonCalendar.id}
              >
                <Grid
                  item
                  sx={{
                    display: "grid",
                    placeItems: "center",
                  }}
                  xs={12}
                  sm={1}
                >
                  <Grid sx={{ margin: "10px 0px", width: "90px" }}>
                    <Typography sx={{ borderRight: "1px solid #d6d6d6" }}>
                      {noonCalendar.time}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    height: "24px",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    position: "relative",
                  }}
                >
                  {trainingContent
                    .filter((noonTag) => noonTag.time === noonCalendar.time)
                    .map((noonTag) => (
                      <Box
                        sx={{
                          paddingLeft: "10px",
                          position: "relative",
                        }}
                        key={noonTag.id}
                      >
                        <Box
                          sx={{
                            padding: "5px 0px",
                            display: "flex",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "fit-content",
                            backgroundColor: noonTag.color,
                            borderRadius: "5px",
                            color: "white",
                            alignItems: "center",
                          }}
                          expand={selectedContent === noonTag.id}
                          onClick={() =>
                            handleExpandContentClick(
                              // indexCalendar,
                              // noonTag.id,
                              // "noon"
                              noonTag.id
                            )
                          }
                          aria-expanded={expandedContent[indexCalendar]}
                          aria-label="show more"
                        >
                          <Typography sx={tagContent}>
                            {noonTag.class}
                          </Typography>
                          <Divider
                            sx={{
                              backgroundColor: "white",
                              width: "1px",
                              height: "15px",
                              borderWidth: "1px",
                            }}
                          />
                          <Typography sx={tagContent}>
                            {noonTag.title}
                          </Typography>
                        </Box>
                        {/* Tags collapse here */}
                        <Collapse
                          in={selectedContent === noonTag.id}
                          timeout="auto"
                          unmountOnExit
                          key={noonTag.id}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#8EB1DA",
                              borderRadius: "0px 0px 5px 5px",
                              position: "relative",
                              zIndex: selectedContent ? 1 : 0,
                              opacity: "90%",
                              height: "200px",
                              padding: "10px 10px",
                            }}
                          >
                            <Typography
                              sx={{
                                lineHeight: "18px",
                                fontWeight: "500",
                                fontSize: "12px",
                              }}
                            >
                              {noonTag.duration}
                            </Typography>
                            <Box sx={{}}>
                              <Grid container sx={{ alignItems: "flex-start" }}>
                                <Grid item xs={1}>
                                  <HomeWorkOutlinedIcon sx={collapseIcon} />
                                </Grid>
                                <Grid item xs={4} sx={collapseTitle}>
                                  Location
                                </Grid>
                                <Grid item xs={7} sx={collapseTitle}>
                                  {noonTag.location}
                                </Grid>
                              </Grid>
                              <Grid container sx={{ alignItems: "flex-start" }}>
                                <Grid item xs={1}>
                                  <RecordVoiceOverOutlinedIcon
                                    sx={collapseIcon}
                                  />
                                </Grid>
                                <Grid item xs={4} sx={collapseTitle}>
                                  Trainer
                                </Grid>
                                <Grid item xs={7} sx={collapseContent}>
                                  {noonTag.trainer}
                                </Grid>
                              </Grid>
                              <Grid container sx={{ alignItems: "flex-start" }}>
                                <Grid item xs={1}>
                                  <StarOutlineIcon sx={collapseIcon} />
                                </Grid>
                                <Grid item xs={4} sx={collapseTitle}>
                                  Admin
                                </Grid>
                                <Grid item xs={7} sx={collapseContent}>
                                  {noonTag.admin}
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                </Grid>
              </Grid>
            ))}
        </Collapse>
      </Box>

      {/* Night Calendar */}
      <Box sx={{ width: "100%" }}>
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
          expand={expandedOutline[2]} // Sử dụng giá trị tương ứng trong mảng expandedOutline
          onClick={() => handleExpandOutlineClick(2)} // Truyền vào chỉ số của phần tử calendar
          aria-expanded={expandedOutline[2]} // Sử dụng giá trị tương ứng trong mảng expandedOutline
          aria-label="show more"
        >
          <Grid item>
            <Typography>Night (18:00 - 22:00)</Typography>
          </Grid>
        </Grid>
        <Collapse in={expandedOutline[2]} timeout="auto" unmountOnExit>
          {calendarTime
            .filter((nightCalendar) => nightCalendar.type === "night")
            .map((nightCalendar, indexCalendar) => (
              <Grid
                container
                sx={{ borderBottom: "1px solid #d6d6d6" }}
                alignItems="center"
                key={nightCalendar.id}
              >
                <Grid
                  item
                  sx={{
                    display: "grid",
                    placeItems: "center",
                  }}
                  xs={12}
                  sm={1}
                >
                  <Grid sx={{ margin: "10px 0px", width: "90px" }}>
                    <Typography sx={{ borderRight: "1px solid #d6d6d6" }}>
                      {nightCalendar.time}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={11}
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    height: "24px",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    position: "relative",
                  }}
                >
                  {trainingContent
                    .filter((nightTag) => nightTag.time === nightCalendar.time)
                    .map((nightTag) => (
                      <Box
                        sx={{
                          paddingLeft: "10px",
                          position: "relative",
                        }}
                        key={nightTag.id}
                      >
                        <Box
                          sx={{
                            padding: "5px 0px",
                            display: "flex",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "fit-content",
                            backgroundColor: nightTag.color,
                            borderRadius: "5px",
                            color: "white",
                            alignItems: "center",
                          }}
                          expand={selectedContent === nightTag.id}
                          onClick={() =>
                            handleExpandContentClick(
                              // indexCalendar,
                              // nightTag.id,
                              // "morning"
                              nightTag.id
                            )
                          }
                          aria-expanded={expandedContent[indexCalendar]}
                          aria-label="show more"
                        >
                          <Typography sx={tagContent}>
                            {nightTag.class}
                          </Typography>
                          <Divider
                            sx={{
                              backgroundColor: "white",
                              width: "1px",
                              height: "15px",
                              borderWidth: "1px",
                            }}
                          />
                          <Typography sx={tagContent}>
                            {nightTag.title}
                          </Typography>
                        </Box>
                        {/* Tags collapse here */}
                        <Collapse
                          in={selectedContent === nightTag.id}
                          timeout="auto"
                          unmountOnExit
                          key={nightTag.id}
                        >
                          <Box
                            sx={{
                              backgroundColor: "#8EB1DA",
                              borderRadius: "0px 0px 5px 5px",
                              position: "relative",
                              zIndex: selectedContent ? 1 : 0,
                              opacity: "90%",
                              height: "200px",
                              padding: "10px 10px",
                            }}
                          >
                            <Typography
                              sx={{
                                lineHeight: "18px",
                                fontWeight: "500",
                                fontSize: "12px",
                              }}
                            >
                              {nightTag.duration}
                            </Typography>
                            <Box sx={{}}>
                              <Grid container sx={{ alignItems: "flex-start" }}>
                                <Grid item xs={1}>
                                  <HomeWorkOutlinedIcon sx={collapseIcon} />
                                </Grid>
                                <Grid item xs={4} sx={collapseTitle}>
                                  Location
                                </Grid>
                                <Grid item xs={7} sx={collapseTitle}>
                                  {nightTag.location}
                                </Grid>
                              </Grid>
                              <Grid container sx={{ alignItems: "flex-start" }}>
                                <Grid item xs={1}>
                                  <RecordVoiceOverOutlinedIcon
                                    sx={collapseIcon}
                                  />
                                </Grid>
                                <Grid item xs={4} sx={collapseTitle}>
                                  Trainer
                                </Grid>
                                <Grid item xs={7} sx={collapseContent}>
                                  {nightTag.trainer}
                                </Grid>
                              </Grid>
                              <Grid container sx={{ alignItems: "flex-start" }}>
                                <Grid item xs={1}>
                                  <StarOutlineIcon sx={collapseIcon} />
                                </Grid>
                                <Grid item xs={4} sx={collapseTitle}>
                                  Admin
                                </Grid>
                                <Grid item xs={7} sx={collapseContent}>
                                  {nightTag.admin}
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                </Grid>
              </Grid>
            ))}
        </Collapse>
      </Box>
    </AppContainer>
  );
}
