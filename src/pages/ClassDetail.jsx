import React from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import TimeFrame from "../components/Class/TimeFrame";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import General from "../components/Class/General";
import ClassHeader from "../components/Class/ClassHeader";
import Attendee from "../components/Class/Attendee";
import SyllabusTabOfClass from "../components/Class/SyllabusTabOfClass";
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
      <AppContainer>
        <ClassWrapper>
          <ClassHeader />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={4}>
                <Item>
                  <General />
                </Item>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Item>
                  <TimeFrame />
                </Item>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
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
      </AppContainer>
    </>
  );
}
