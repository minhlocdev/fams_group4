import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import { SyllabusContext } from "../../../context/SyllabusContext";

export default function SyllabusHeader() {
  const { activeTab } = useContext(SyllabusContext);
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        width: "100%",
        padding: "20px",
        borderBottom: "1px solid",
        ".MuiBox-root": {
          marginTop: "5px",
        },
      }}
    >
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
      <ProgressBar index={activeTab} />
    </Stack>
  );
}
