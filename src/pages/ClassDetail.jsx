import React from "react";
import TimeFrame from "../components/Class/Detail/TimeFrame";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import General from "../components/Class/Detail/General";
import ClassHeader from "../components/Class/Detail/ClassHeader";
import Attendee from "../components/Class/Detail/Attendee";
import SyllabusTabOfClass from "../components/Class/Detail/SyllabusTabOfClass";
import ClassWrapper from "../context/ClassWrapper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "unset",
  boxShadow: "unset",
}));
export default function ClassDetail() {
  return (
    <>
      <ClassWrapper>
        <ClassHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              sx={{
                transition: "max-width 0.5s ease",
              }}
            >
              <Item>
                <General />
              </Item>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              lg={6}
              sx={{
                transition: "max-width 0.5s ease",
              }}
            >
              <Item>
                <TimeFrame />
              </Item>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={4}
              sx={{
                transition: "max-width 0.5s ease",
              }}
            >
              <Item>
                <Attendee />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <SyllabusTabOfClass />
            </Grid>
          </Grid>
        </Box>
      </ClassWrapper>
    </>
  );
}
