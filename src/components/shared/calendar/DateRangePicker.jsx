import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/material";

export default function DateRangePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="row"
        spacing={1}
        alignItems={"center"}
        sx={{ marginTop: "5px" }}
      >
        <span>from</span>
        <DatePicker
          label=""
          sx={{
            width: "180px",
            "& .MuiInputBase-input": {
              padding: "10px",
            },
          }}
        />
        <span>to</span>
        <DatePicker
          label=""
          sx={{
            width: "180px",
            "& .MuiInputBase-input": {
              padding: "10px",
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
