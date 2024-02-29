import React, { useMemo, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import theme from "../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { Stack, TextField } from "@mui/material";
import { CalendarToday, WarningAmber } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ExpandMore } from "../shared/lib/CustomMUI";

export default function CreateTimeFrame() {
  const location = useLocation();
  const mode = location.pathname.includes("detail"); //true=detail false=create/edit
  const initialDays = [];
  const memoizedDays = useMemo(() => {
    return initialDays.map((dateString) => new Date(dateString));
  }, [initialDays]);
  const [days, setDays] = React.useState(memoizedDays);
  const [expanded, setExpanded] = React.useState(true);
  const [startDate, setStartDate] = useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          backgroundColor: !expanded
            ? mode
              ? theme.primary
              : theme.unmodified
            : theme.primary,
          color: "#fff",
          px: "15px",
          borderRadius: "10px",
          transition: "background-color .3s linear",
          marginBottom: "5px",
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <CalendarToday fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            Time Frame
          </Typography>

          <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="span" fontWeight={"light"} fontSize={"14px"}>
              Start date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setDays([]);
                }}
                inputFormat="DD-MM-yyyy"
                views={["year", "month", "day"]}
                disablePast
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
                sx={{
                  backgroundColor: "white",
                  border: "unset",
                  borderRadius: "5px",

                  "& .MuiInputBase-root ": {
                    width: "120px",
                    overflow: "hidden",
                    padding: "0 10px",
                  },
                  "& .MuiInputBase-input ": {
                    padding: "5px 0",
                    fontSize: "12px",
                    "&::placeholder": {
                      fontSize: "12px",
                    },
                  },
                  "& .MuiButtonBase-root": {
                    margin: "0",
                    padding: "0",
                  },
                }}
              />
              {startDate?.valueOf ?? <WarningAmber color="error" />}
            </LocalizationProvider>
          </Stack>
        </Stack>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#fff" }} />
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <DayPicker
          style={{ margin: "0", textAlign: "center" }}
          styles={{
            caption: {
              color: theme.primary,
              marginBottom: "20px",
            },
            head_cell: { color: theme.unmodified },
            months: {
              display: "inline-flex",
              borderRadius: "15px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "10px 20px",
              width: "100%",
              justifyContent: "center",
            },
            month: {
              margin: "0 auto",
            },

            table: {
              // maxWidth: "100%",
              // width: "100%",
            },
            caption_label: {
              borderBottom: ".5px solid #ddd",
              padding: "0  50px 15px",
              textAlign: "center",
              display: "inline-block",
              fontSize: "16px",
            },
            cell: {
              height: "40px",
              fontSize: "13px",
              padding: "5px",
            },
          }}
          mode="multiple"
          selected={days}
          onSelect={setDays}
          modifiersStyles={{
            selected: {
              backgroundColor: theme.primary,
              width: "40px",
              height: "40px",
              fontSize: "13px",
            },
          }}
          numberOfMonths={2}
          fromDate={startDate ? Date.parse(startDate) : Date.now()}
        />
      </Collapse>
    </>
  );
}
