import React, { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
const heightNav = 32;

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
      <Stack direction="row" spacing={2} sx={{ height: heightNav, mt: 3 }}>
        <Typography variant="subtitle1">Program name</Typography>
        <Box
          component="form"
          sx={{
            border: "1px solid",
            borderRadius: "10px",
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ "aria-label": "search" }}
            value={programName}
            onChange={handleInputChange}
          />
        </Box>
        <Button
          sx={{
            background: "#2D3748",
          }}
          variant="contained"
          size="small"
          onClick={clickCreate}
        >
          Create
        </Button>
      </Stack>
    </>
  );
}
