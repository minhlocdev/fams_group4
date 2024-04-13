import React, { useState } from "react";
import { Box, Button, Grid, InputBase, Typography } from "@mui/material";

export default function NewTrainingProgram({
  newProgramName,
  clickCreate,
  oldProgramName,
}) {
  const [programName, setProgramName] = useState(oldProgramName || "");
  const handleInputChange = (event) => {
    setProgramName(event.target.value);
    newProgramName(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          width: "calc(100% + 21px)",
          background: "#2D3748",
          paddingTop: 0.5,
          paddingBottom: 0.5,
          paddingLeft: 4,
          marginLeft: -2.5,
          marginTop: -0.3,
        }}
      >
        <Typography sx={{ color: "white" }} variant="h6">
          New Training program
        </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" sx={{ mt: 3 }}>
        <Grid item xs={12} xl={1.3}>
          <Typography variant="subtitle1">Program name</Typography>
        </Grid>
        <Grid item xs={9} xl={4}>
          <Box
            component="form"
            sx={{
              border: "1px solid",
              borderRadius: "10px",
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ "aria-label": "search" }}
              value={programName}
              onChange={handleInputChange}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{ background: "#2D3748" }}
            variant="contained"
            size="small"
            onClick={clickCreate}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
