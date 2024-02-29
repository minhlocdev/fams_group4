import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
export default function TimePickerViews() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        views={["hours", "minutes"]}
        format="hh:mm"
        ampm={false}
        TextFieldComponent={(props) => (
          <TextField
            {...props}
            sx={{
              "& label": {
                color: "var(--Un-modified, #8B8B8B)",

                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              },
            }}
          />
        )}
        sx={{
          display: "flex",
          alignContent: "center",
          borderRadius: "0.5px solid var(--Un-modified, #8B8B8B)",
          background: "#FFF",

          "& .MuiInputBase-root": {
            padding: "0",
            width: "80px",
          },
          "& .MuiSvgIcon-root": {
            display: "none",
          },
          "& .MuiInputAdornment-root .MuiButtonBase-root ": {
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            borderRadius: "0px",
          },
          "& .MuiOutlinedInput-input": {
            textAlign: "center",
            padding: "5px",
          },
        }}
      />
    </LocalizationProvider>
  );
}
