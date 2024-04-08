import React, { useContext } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { SyllabusContext } from "../../../context/SyllabusContext";

export default function CodeVersion() {
  const { general, setGeneral, error } = useContext(SyllabusContext);
  const handleSyllabusCode = (e) => {
    setGeneral(() => ({
      ...general,
      syllabusCode: e.target.value,
    }));
  };
  return (
    <>
      <Grid item xs={12} sm={4} lg={3} md={3}>
        <Typography variant={"h6"} fontWeight="bold">
          Code
          <TextField
            // component="span"
            sx={{ maxWidth: { sm: "60%" } }}
            error={error.syllabusCode}
            required
            name="syllabusCode"
            value={general ? general.syllabusCode : ""}
            onChange={handleSyllabusCode}
            helperText={error.syllabusCode ? `required` : ""}
            // sx={TextFieldStyle}
            onKeyDown={(event) => {
              if (
                event?.key === "-" ||
                event?.key === "+" ||
                event?.key === "="
              ) {
                event.preventDefault();
              }
            }}
          >
            {general.syllabusCode}
          </TextField>
        </Typography>
      </Grid>
      <Grid item xs={12} lg={3} md={3}>
        <Typography variant={"h6"} fontWeight="bold">
          Version
          <Typography component="span">
            {general.version ? general.version : 1}
          </Typography>
        </Typography>
      </Grid>
    </>
  );
}
