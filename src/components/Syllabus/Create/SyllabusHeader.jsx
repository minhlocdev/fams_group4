import { Grid, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import { SyllabusContext } from "../../../context/SyllabusContext";

export default function SyllabusHeader() {
  const { activeTab } = useContext(SyllabusContext);
  return (
    // <Grid
    //   container
    //   // direction="row"
    //   sx={{
    //     width: "100%",
    //     padding: "20px",
    //     borderBottom: "1px solid",
    //     ".MuiBox-root": {
    //       marginTop: "5px",
    //     },
    //   }}
    // >
    <>
      <Grid item xs={12} md={3} lg={2}>
        <Typography
          variant={"h4"}
          sx={{
            wordSpacing: "5px",
            letterSpacing: "5px",
            color: "primary",
            padding: "10px 0",
          }}
        >
          Syllabus
        </Typography>
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <ProgressBar index={activeTab} />
      </Grid>
    </>
    // </Grid>
  );
}
