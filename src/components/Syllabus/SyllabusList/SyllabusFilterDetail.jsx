import React, { useContext, useEffect, useState } from "react";
import { Grid, Stack, Typography, Button } from "@mui/material";
import DateRangePicker from "../../shared/calendar/DateRangePicker";
import { format, parse } from "date-fns";
import { SyllabusContext } from "../../../context/SyllabusContext";
import LimitTagsSyllabus from "./LimitTagsSyllabus";
import { useGetObjectiveQuery } from "../../../services/queries/syllabusQuery";
export default function SyllabusFilterDetail() {
  const { checked, setChecked, handleChangePage } = useContext(SyllabusContext);
  const { data, isLoading, isSuccess } = useGetObjectiveQuery();
  const [learningObjecttive, setLearningObjectives] = useState([]);
  useEffect(() => {
    if (data) {
      setLearningObjectives(data.map((item) => item.objectiveCode));
    }
  }, [data, isSuccess]);

  const [selected, setSelected] = React.useState({
    outputStandards: checked.outputStandards
      ? checked.outputStandards.split(", ")
      : [],
    dateRange: !(
      checked.createdDateBegin === "" || checked.createdDateEnd === ""
    ) && {
      from: parse(checked.createdDateBegin, "MM/dd/yyyy", new Date()),
      to: parse(checked.createdDateEnd, "MM/dd/yyyy", new Date()),
    },
  });
  const handleClear = () => {
    setSelected({
      outputStandards: [],
      dateRange: null,
    });
    setChecked({
      outputStandardStrings: "",
      createdDateBegin: "",
      createdDateEnd: "",
    });
  };

  const handleDateRange = (range) => {
    setSelected({
      ...selected,
      dateRange: range,
    });
  };
  const handleLocation = (value) => {
    setSelected({
      ...selected,
      outputStandards: value,
    });
  };
  const handleSetChecked = (event) => {
    const { outputStandards, dateRange } = selected;
    setChecked({
      outputStandardStrings: outputStandards.join(", "),
      createdDateBegin: dateRange ? format(dateRange.from, "MM/dd/yyyy") : "",
      createdDateEnd: dateRange ? format(dateRange.to, "MM/dd/yyyy") : "",
    });
    handleChangePage(event, 0);
  };

  return (
    <>
      <Grid gap={3}>
        <Grid item xs={6}>
          <Typography variant="h8">Output Standards</Typography>
          <LimitTagsSyllabus
            data={learningObjecttive}
            loading={isLoading}
            selectedTags={selected.outputStandards}
            onTagsChange={handleLocation}
          />
        </Grid>
        <Grid item xs={6} m={2}>
          <Typography variant="h8" component="div">
            Created date range
          </Typography>
          <DateRangePicker
            range={selected.dateRange}
            handleChange={handleDateRange}
          />
        </Grid>
      </Grid>
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
