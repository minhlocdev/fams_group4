import React, { useContext, useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SyllabusWrapper from "../context/SyllabusWrapper";
import { SyllabusContext } from "../context/SyllabusContext";
import SyllabusTabContent from "../components/Syllabus/Create/SyllabusTabContent";
import SyllabusHeader from "../components/Syllabus/Create/SyllabusHeader";
import SyllabusButtons from "../components/Syllabus/Create/SyllabusButtons";

export default function SyllabusCreate() {
  const { activeTab } = useContext(SyllabusContext);

  const [syllabusName, setSyllabusName] = useState("");
  const [NameError, setNameError] = useState(false);

  const handleNameError = (value) => {
    if (value === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const handleSyllabusName = (e) => {
    setSyllabusName(e.target.value);
    handleNameError(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (event) => {
    if (activeTab <= 2) {
      event.preventDefault();
    } else {
      localStorage.removeItem("draftData");

      return alert("Created succesfully");
    }
  };

  return (
    <SyllabusWrapper>
      <AppContainer>
        <form noValidate autoComplete="true" onSubmit={handleSubmit}>
          <Grid
            container
            direction="row"
            sx={{ alignItems: "center", marginBottom: "20px" }}
          >
            <SyllabusHeader />
          </Grid>
          <Grid
            spacing={2}
            container
            direction="row"
            sx={{
              alignItems: "center",
              marginBottom: "20px",
              "& h6": { display: "flex", alignItems: "center", gap: "15px" },
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                height: "80px",
                display: "flex",
                alignItems: "center",
              }}
              lg={6}
              md={6}
            >
              <Typography
                variant={"h6"}
                fontWeight="bold"
                sx={{
                  width: {
                    sm: "25%",
                    xs: "50%",
                    md: "35%",
                    lg: "25%",
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
                  minWidth: {
                    xs: "20px",
                    md: "20px",
                    lg: "10px",
                  },
                }}
                variant="outlined"
                value={syllabusName}
                helperText={
                  NameError
                    ? syllabusName.length > 60
                      ? "Syllabus Name should not exceed 60 characters"
                      : "Syllabus Name is required"
                    : ""
                }
                onChange={handleSyllabusName}
                error={NameError}
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <Typography variant={"h6"} fontWeight="bold">
                Code<Typography component="span">NLP</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <Typography variant={"h6"} fontWeight="bold">
                Version<Typography component="span">1.0</Typography>
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid container item xs={12}> */}
          <SyllabusTabContent />
          {/* </Grid> */}
          <Grid container item xs={12} sm={12} spacing={2}>
            <SyllabusButtons />
          </Grid>
        </form>
      </AppContainer>
    </SyllabusWrapper>
  );
}
