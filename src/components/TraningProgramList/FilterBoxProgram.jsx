import React, { useState, useContext } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { parse } from "date-fns";
import DateRangePicker from "../shared/calendar/DateRangePicker";
import dayjs from "dayjs";
import { TrainingProgramContext } from "../../context/TrainingProgramContext";

export default function FilterBoxProgram() {
  const { checked, setChecked, handleChangePage } = useContext(TrainingProgramContext);
  const [selected, setSelected] = useState({
    dateRange: !(checked.startDateBegin === "" || checked.startDateEnd === "") && {
      from: parse(checked.startDateBegin, "MM/dd/yyyy", new Date()),
      to: parse(checked.startDateEnd, "MM/dd/yyyy", new Date()),
    },
  });
  const handleClear = () => {
    setSelected({
      dateRange: null,
    });
    setChecked({
      startDateBegin: "",
      startDateEnd: "",
    });
  };

  const handleDateRange = (range) => {
    setSelected({
      ...selected,
      dateRange: range,
    });
  };

  const handleSetChecked = (event) => {
    setChecked({
      startDateBegin: selected.dateRange
        ? dayjs(selected["dateRange"].from).format("MM/DD/YYYY")
        : "",
      startDateEnd: selected.dateRange
        ? dayjs(selected["dateRange"].to).format("MM/DD/YYYY")
        : "",
    });
    handleChangePage(event, 0);
  };

  return (
    <>
      <Typography variant="h8">Created Date</Typography>
      <DateRangePicker
        range={selected.dateRange}
        handleChange={handleDateRange}
      />
      <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
        <Button
          sx={{
            color: "whitesmoke",
            backgroundColor: "#2D3748",
            padding: "5px 25px",
            fontWeight: "600",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#2D3748",
              opacity: "0.5",
            },
          }}
          onClick={() => handleClear()}
        >
          Clear
        </Button>
        <Button
          sx={{
            color: "whitesmoke",
            backgroundColor: "#2D3748",
            padding: "5px 25px",
            borderRadius: "8px",
            fontWeight: "600",

            "&:hover": {
              backgroundColor: "#2D3748",
              opacity: "0.5",
            },
          }}
          onClick={handleSetChecked}
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
