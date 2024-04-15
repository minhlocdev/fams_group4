import React from "react";
import { Typography, Container } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export default function TrainigNotFound() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "red" }}>
        <ReportProblemIcon></ReportProblemIcon>
        Training Program Not Found
      </Typography>
    </Container>
  );
}
