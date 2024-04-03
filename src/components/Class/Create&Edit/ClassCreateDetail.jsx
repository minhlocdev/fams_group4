import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SyllabusTabOfClass from "../Detail/SyllabusTabOfClass";
import CreateGeneral from "./CreateGeneral";
import CreateAttendee from "./CreateAttendee";
import CreateTimeFrame from "./CreateTimeFrame";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "unset",
  boxShadow: "unset",
}));
export default function ClassCreateDetail() {
  return (
    <>
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
              <CreateGeneral />
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
              <CreateTimeFrame />
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
              <CreateAttendee />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <SyllabusTabOfClass />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
