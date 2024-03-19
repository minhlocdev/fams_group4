import React, { useContext, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import theme from "../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { Button, Stack } from "@mui/material";
import { CalendarToday, WarningAmber } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ExpandMore, InfoTooltip } from "../shared/lib/CustomMUI";
import dayjs from "dayjs";
import { Box } from "@mui/system";
import TimeFrameOptions from "./TimeFrameOptions";
import ClassContext from "../../context/ClassContext";
import ToastEmitter from "../shared/lib/ToastEmitter";

export default function CreateTimeFrame() {
  const location = useLocation();
  const mode = location.pathname.includes("detail"); //true=detail false=create/edit
  const { initialDays, search, setInitialDays } = useContext(ClassContext);
  const [expanded, setExpanded] = React.useState(true);
  const [startDate, setStartDate] = useState(dayjs());

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSetDays = (date) => {
    if (search) {
      if (date.length <= search.duration) {
        setInitialDays(date);
      } else
        ToastEmitter.warning(
          "Teaching initialDays should not surpass training program duration. "
        );
    } else ToastEmitter.warning("Choose training program first");
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

                  setInitialDays([]);
                }}
                inputFormat="DD-MM-yyyy"
                views={["year", "month", "day"]}
                disablePast
                slotProps={{ textField: { helperText: "" } }}
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
              {(!startDate.valueOf ||
                initialDays.length === 0 ||
                initialDays.length > search?.duration ||
                !search) && (
                <InfoTooltip
                  title={<Typography variant="span">Choose dates</Typography>}
                >
                  <WarningAmber color="error" />
                </InfoTooltip>
              )}
              <Button
                sx={{
                  color: "#fff",
                  border: "1px solid #fff",
                  borderRadius: "5px",
                  fontSize: "10px",
                  padding: "3px 5px",
                }}
                onClick={() => {
                  setInitialDays([]);
                }}
              >
                Reset
              </Button>
              <TimeFrameOptions startDate={startDate} />
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
        <Box sx={{ display: { xs: "block", md: "none" } }}>
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
            }}
            mode="multiple"
            selected={initialDays}
            onSelect={handleSetDays}
            modifiersStyles={{
              selected: {
                backgroundColor: theme.primary,
                width: "40px",
                height: "40px",
                fontSize: "13px",
              },
            }}
            numberOfMonths={1}
            fromDate={startDate ? Date.parse(startDate) : Date.now()}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
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
            }}
            mode="multiple"
            selected={initialDays}
            onSelect={handleSetDays}
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
        </Box>
      </Collapse>
    </>
  );
}
