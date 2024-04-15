import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import TimeAllocation from "../../shared/TimeAllocation";
import { useTheme } from "@emotion/react";
import quill from "../../../assets/scss/quill.css";
import ReactQuill from "react-quill";
export default function Other({ datas, SyllabusID, timeallocation }) {
  const [assessmentScheme, setAssessmentScheme] = useState();
  const [trainingPrinciples, setTrainingPrinciples] = useState();
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    setAssessmentScheme(datas?.assessmentScheme);
    setTrainingPrinciples(datas?.trainingPrinciples);
  }, [datas]);

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Grid
        container
        spacing={{ xs: 4, sm: 1, md: 1.5, lg: 4 }}
        sx={{ mb: 2, width: { xs: "100%", lg: "100%" } }}
        direction={{ xs: "column", md: "row", lg: "row" }}
      >
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          sx={{ width: { xs: "90%", md: "50%", lg: "50%" } }}
        >
          <Card>
            <Stack
              sx={{
                backgroundColor: "#2D3748",
                pt: 1,
                pb: 0.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="white">
                Time allocation
              </Typography>
            </Stack>
            <CardContent>
              <Box
                sx={{
                  height: {
                    xs: "409px",
                    sm: "230px",
                    md: "285px",
                    lg: "230px",
                  },
                  margin: "35px 0px 20px 0px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isXS ? (
                  <TimeAllocation
                    SyllabusID={SyllabusID}
                    timeallocation={timeallocation}
                  />
                ) : (
                  <TimeAllocation
                    control
                    SyllabusID={SyllabusID}
                    timeallocation={timeallocation}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{ width: { xs: "90%", md: "50%", lg: "100%" } }}
        >
          <Card>
            <Stack
              sx={{
                backgroundColor: "#2D3748",
                pt: 1,
                pb: 0.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="white">
                Assessment scheme
              </Typography>
            </Stack>
            <CardContent sx={{ justifyContent: "center", display: "flex" }}>
              <Card
                variant="outlined"
                sx={{
                  border: 2,
                  borderColor: "#8B8B8B",
                  height: "30%",
                  width: { xs: "90%", md: "50%", lg: "90%" },
                }}
              >
                <CardContent
                  sx={{
                    ml: 2,
                    "&.MuiCardContent-root": {
                      padding: {
                        xs: "8px 0px 8px 16%",
                        sm: "16px 16px 24px 16px",
                        md: "16px 16px 24px 0px",
                      },
                    },
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: "column",
                        lg: "row",
                      },
                      gap: { xs: "30px", lg: "10px" },
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <span>Quiz</span>
                      <Typography
                        variant="body1"
                        sx={{ fontStyle: "italic" }}
                        gutterBottom
                      >
                        {assessmentScheme?.quiz}%
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mr: 10, width: { xs: "50%", md: "50%" } }}
                    >
                      <span>Assignment</span>
                      <Typography
                        variant="body1"
                        sx={{ fontStyle: "italic" }}
                        gutterBottom
                      >
                        {assessmentScheme?.assignment}%
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                    <span>Final</span>
                    <Typography
                      variant="body1"
                      sx={{ fontStyle: "italic" }}
                      gutterBottom
                    >
                      {assessmentScheme?.final}%
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </CardContent>
            <CardContent
              sx={{
                justifyContent: "center",
                display: "flex",
                pt: 1,
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  border: 2,
                  borderColor: "#8B8B8B",
                  height: "30%",
                  width: { xs: "90%", md: "50%", lg: "90%" },
                }}
                className="CEO"
              >
                <CardContent
                  sx={{
                    ml: 2,
                    "&.MuiCardContent-root": {
                      padding: {
                        xs: "8px 0px 8px 18%",
                        sm: "16px 16px 24px 16px",
                        md: "16px 16px 24px 0px",
                      },
                    },
                  }}
                >
                  Passing criteria
                  <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                    <span>GPA*</span>
                    <Typography
                      variant="body1"
                      sx={{ fontStyle: "italic" }}
                      gutterBottom
                    >
                      {assessmentScheme?.passing}%
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={11.7} md={11.7} lg={11.2}>
          <Stack>
            <Card
              sx={{ width: { xs: "91%", sm: "95%", lg: "100%" } }}
              className="Cleny"
            >
              <Stack
                sx={{
                  backgroundColor: "#2D3748",
                  pt: 1,
                  pb: 0.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color="white">
                  Training delivery principle
                </Typography>
              </Stack>

              <CardContent
                sx={{
                  "&.MuiCardContent-root": {
                    padding: {
                      xs: "8px 0px 8px 5%",
                      sm: "16px 16px 24px 16px",
                      md: "16px 16px 24px 0px",
                      lg: "16px 16px 24px 16px",
                    },
                  },
                }}
              >
                <Stack spacing={3} sx={{ width: { xs: "90%", lg: "100%" } }}>
                  <Grid
                    container
                    spacing={{ xs: 1, md: 3, lg: 4 }}
                    sx={{
                      display: { xs: "flex" },
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Grid item xs={2}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <GppGoodOutlinedIcon />
                      </Stack>
                    </Grid>
                    <Grid item xs={10}>
                      <Stack spacing={1.5} sx={{ mt: -1.5, ml: 1 }}>
                        <ReactQuill
                          value={trainingPrinciples}
                          theme="bubble"
                          style={quill}
                          readOnly
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
