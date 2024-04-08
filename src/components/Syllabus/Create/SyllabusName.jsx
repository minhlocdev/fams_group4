import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { SyllabusContext } from "../../../context/SyllabusContext";
import TextField from "@mui/material/TextField";

export default function SyllabusName() {
  const { general, setGeneral, error, handleFieldValidation } =
    useContext(SyllabusContext);

  const handleSyllabusName = (e) => {
    setGeneral(() => ({
      ...general,
      syllabusName: e.target.value,
    }));
    handleFieldValidation(e.target.name, e.target.value);
  };

  return (
    <Grid
      item
      xs={12}
      gap="5px"
      sx={{
        height: "80px",
        display: "flex",
        alignItems: "center",
      }}
      sm={7}
      lg={6}
      md={6}
    >
      <Typography
        variant={"h6"}
        fontWeight="bold"
        sx={{
          maxWidth: {
            sm: "55%",
            xs: "35%",
            md: "40%",
            lg: "30%",
          },
        }}
      >
        Syllabus Name*
      </Typography>
      <TextField
        required
        name="syllabusName"
        type="text"
        sx={{
          borderRadius: "6px",
          minHeight: "36px",
          maxWidth: {
            xs: "100%",
            sm: "50%",
            md: "100%",
            lg: "100%",
          },
        }}
        variant="outlined"
        value={general.syllabusName}
        helperText={
          error.syllabusName && "Syllabus Name is required"
          // ? general.syllabusName.length > 60
          //   ? "Syllabus Name should not exceed 60 characters"
          //   : "Syllabus Name is required"
          // : ""
        }
        onChange={handleSyllabusName}
        error={error.syllabusName}
      />
    </Grid>
  );
}
