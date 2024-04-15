import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import { SyllabusContext } from "../../../context/SyllabusContext";
import theme from "../../../assets/theme";

export default function SyllabusHeader() {
  const { activeTab } = useContext(SyllabusContext);
  return (
    <>
      <Grid item xs={12} md={3} lg={2}>
        <Typography variant="h4" fontWeight={600} color={theme.primary}>
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
