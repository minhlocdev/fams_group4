import React, { useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import LimitTagsSyllabus from "./LimitTagsSyllabus";
import DateRangePicker from "../../shared/calendar/DateRangePicker";
export default function SyllabusFilterDetail() {
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagsChange = (tags) => {
    setSelectedTags(tags);
  };
  const handleClear = () => {
    setSelectedTags([]);
  };

  return (
    <>
      <Grid gap={1}>
        <Grid item xs={6}>
          <Typography variant="h8">Output Standard</Typography>
          <LimitTagsSyllabus
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />
        </Grid>
        <Grid item xs={6} marginTop={2}>
          <Typography variant="h8">Created On</Typography>
          <DateRangePicker/>
        </Grid>
      </Grid>
      <Stack marginTop={1} direction="row" gap={2} justifyContent={"flex-end"}>
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
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
