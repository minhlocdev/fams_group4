import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { Stack, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { differenceInMinutes } from "date-fns";
export function TimePickerViews(props) {
  const { value, setValue } = props;
  const matches = useMediaQuery("(min-width:1200px)");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {matches ? (
        <TimePicker
          minutesStep={30}
          minTime={dayjs("2022-04-17T08:00")}
          maxTime={dayjs("2022-04-17T22:00")}
          views={["hours", "minutes"]}
          format="HH:mm"
          ampm={false}
          value={dayjs(value, "HH:mm")}
          onChange={(newValue) => setValue(newValue)}
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
      ) : (
        <MobileTimePicker
          value={dayjs(value, "HH:mm")}
          onChange={(newValue) => setValue(dayjs(newValue, "HH:mm"))}
          minutesStep={30}
          minTime={dayjs("2022-04-17T08:00")}
          maxTime={dayjs("2022-04-17T22:00")}
          views={["hours", "minutes"]}
          format="HH:mm"
          ampm={false}
        />
      )}
    </LocalizationProvider>
  );
}

export const TimeToTime = ({ classTime, setTimeRange }) => {
  const [timeFro, setTimeFro] = React.useState("");
  const [timeTo, setTimeTo] = React.useState("");
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    if (classTime !== "") {
      const [from, to] = classTime.split("-");
      setTimeFro(dayjs(from, "HH:mm"));
      setTimeTo(dayjs(to, "HH:mm"));
    }
  }, [classTime]);
  React.useEffect(() => {
    if (timeFro && timeTo && timeFro !== "" && timeTo !== "") {
      //differenceInMinutes(later time,earlier  time)
      const diff = differenceInMinutes(
        dayjs(timeTo, "HH:mm").toString(),
        dayjs(timeFro, "HH:mm").toString()
      );
      if (diff <= 120 && diff >= 90) {
        setTimeRange(
          `${dayjs(timeFro, "HH:mm").format("HH:mm")}-${dayjs(
            timeTo,
            "HH:mm"
          ).format("HH:mm")}`
        );
      }
    }
  }, [timeFro, timeTo, setTimeRange]);
  return (
    <Tooltip
      arrow
      open={open}
      onClose={() => setOpen(false)}
      title="Class must at least 90 minutes and not exceed 120 minutes"
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Typography variant="span">from</Typography>
        <TimePickerViews
          value={dayjs(timeFro, "HH:mm")}
          setValue={setTimeFro}
        />
        <Typography variant="span">to</Typography>
        <TimePickerViews value={dayjs(timeTo, "HH:mm")} setValue={setTimeTo} />
      </Stack>
    </Tooltip>
  );
};
