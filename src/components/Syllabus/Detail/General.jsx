import { Box, Card, CardContent, Chip, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
export default function General({ datas }) {
  const [data, setData] = useState();
  const AttendeeNumber = 20;
  const Level = "All Levels";
  const [outputStandard, setOutputStandard] = useState();
  const [technicalRequirement, setTechnicalRequirement] = useState();
  const [CourseObjective, setCourseObjective] = useState();
  useEffect(() => {
    setData(datas);
    setOutputStandard(datas?.outpuStandards);
    setTechnicalRequirement(datas?.technicalRequirement);
    setCourseObjective(datas?.courseObjective);
  }, [data, outputStandard, technicalRequirement, CourseObjective, datas]);
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
              <Stack sx={{ padding: "10px 10px 10px 10px" }}>
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
                      {Level}
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                    >
                      {AttendeeNumber}
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
                        {outputStandard?.map((standard, index) => (
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
              <Stack sx={{ padding: "10px 10px 10px 10px" }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center", fontSize: 14, mt: 2 }}
                >
                  <SettingsOutlinedIcon />
                  <span>Technical Requirement(s)</span>
                </Stack>
                <Stack spacing={1.5} sx={{ mt: 1.5, ml: 1 }}>
                  {technicalRequirement
                    ?.replace(/<[^>]+>/g, "")
                    .split("\r\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Stack sx={{ width: { xs: "85%", lg: "100%" }, paddingTop: "10px" }}>
        <Stack spacing={1} direction="row">
          <FilterCenterFocusIcon />
          <span>Course objectives</span>
        </Stack>
        <Stack spacing={1.5} sx={{ mt: 1.5, ml: 1 }}>
          {CourseObjective?.replace(/<[^>]+>/g, "")
            .split("\r\n")
            .filter((line) => line.trim() !== "")
            .map((line, index) => (
              <div key={index}>{line}</div>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
}
