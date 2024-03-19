import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import { Link } from "react-router-dom";
export default function General() {
  const [data, setDatas] = useState({
    Level: "All Levels",
    AttendeeNumber: 20,
    outputStandard: ["H4SD", "ABCD", "1234", "5678"],
    TechnicalRequirement:
      "Trainees PCs need to have the following software installed & run without any issues:\n• Microsoft SQL Server 2005 Express\n• Microsoft Visual Studio 2017\n• Microsoft Office 2007 (Visio, Word, PowerPoint)",
    CourseObjective:
      "This topic is to introduce C# programming language knowledge; adapt trainees with skills, lessons and practices which is specifically used in the Fsoft projects. In details, after completing the topic, trainees will:\n- Understand basic concepts of high-level programming languages (keyword, statement, operator, control-of-flow)\n- Understand and distinguish two concepts: class (Class) and object (Object)\n- Understand and apply object-oriented programming knowledge to resolve simple problems (Inheritance, Encapsulation, Abstraction, Polymorphism)\n- Work with some of the existing data structures in C# (List, ArrayList, HashTable, Dictionary)\n- Know how to control program errors (use try ... catch..finally, throw, throws)\n- Be able to work with concurrency and multi-thread in C#\n- Be able to work with common classes in ADO.net: SqlConnection, SqlCommand, SqlParameter, SqlDataAdapter, SqlDataReader\n- Be able to manipulate SQL data from Window Form Application via 4 basic commands: Add, Update, Delete, Select\n- Know how to design UI screen in Window Form Application\n- Know how to use appropriate controls for each field/data type: Textbox, Label, Combobox, Radio, DateTimePicker, NumericUpDown, RichTextBox",
  });
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Grid
        container
        spacing={4}
        direction={{ xs: "column", md: "row", lg: "row" }}
      >
        <Grid
          item
          xs={4}
          md={4}
          sx={{ width: { xs: "85%", md: "100%", lg: "100%" } }}
        >
          <Card variant="outlined">
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: {
                    xs: "5px 5px 15px 5px",
                    sm: "16px 16px 24px 16px",
                  },
                },
              }}
            >
              <Stack>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                    >
                      <StarBorderIcon />
                      Level
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                    >
                      <PeopleAltOutlinedIcon />
                      Attendee number
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                    >
                      <GppGoodOutlinedIcon />
                      Output standard
                    </Stack>
                  </Grid>
                  <Grid item xs={7}>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                    >
                      {data.Level}
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                    >
                      {data.AttendeeNumber}
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        fontSize: 14,
                        mt: 2,
                        paddingLeft: "0px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          "& .MuiGrid-item": {
                            paddingLeft: "0px",
                          },
                        }}
                      >
                        {data.outputStandard?.map((standard, index) => (
                          <Box
                            sx={{ paddingRight: { xs: "1px", sm: "5px" } }}
                            key={index}
                          >
                            <Chip
                              sx={{
                                background: "#2D3748",
                                color: "white",
                                width: "75px",
                                height: "28px",
                                mt: 1,
                              }}
                              label={standard.trim()}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} md={8} sx={{ width: { xs: "85%", lg: "100%" } }}>
          <Card variant="outlined">
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: {
                    xs: "5px 5px 15px 5px",
                    sm: "16px 16px 24px 16px",
                  },
                },
              }}
            >
              <Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                >
                  <SettingsOutlinedIcon />
                  <span>Technical Requirement(s)</span>
                </Stack>
                <Stack spacing={1.5} sx={{ mt: 1.5, ml: 1 }}>
                  {data.TechnicalRequirement.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Stack sx={{ width: { xs: "85%", lg: "100%" } }}>
        <Stack spacing={1} direction="row">
          <FilterCenterFocusIcon />
          <span>Course objectives</span>
        </Stack>
        <Stack spacing={1.5} sx={{ mt: 1.5, ml: 1 }}>
          {data.CourseObjective.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
