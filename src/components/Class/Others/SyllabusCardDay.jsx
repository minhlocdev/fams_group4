import React from "react";
import theme from "../../../assets/theme";
import { Box, Collapse, Paper } from "@mui/material";
import SyllabusCardUnit from "./SyllabusCardUnit";

export default function SyllabusCardDay({ day, syllabusId }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.primary,
          width: "100%",
          color: "#fff",
          padding: "10px 20px",
          margin: "2px 0",
        }}
        onClick={handleExpandClick}
      >
        Day {day.dayNumber}
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Paper elevation={4}>
          {day.trainingUnits.map((unit) => (
            <SyllabusCardUnit
              unit={unit}
              key={unit.unitCode}
              syllabusId={syllabusId}
            />
          ))}
        </Paper>
      </Collapse>
    </>
  );
}
