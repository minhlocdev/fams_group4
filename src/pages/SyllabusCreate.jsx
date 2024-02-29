import React, { useContext, useEffect, useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SyllabusWrapper from "../context/SyllabusWrapper";
import { SyllabusContext } from "../context/SyllabusContext";
import SyllabusTabContent from "../components/Syllabus/Create/SyllabusTabContent";
import SyllabusHeader from "../components/Syllabus/Create/SyllabusHeader";
import SyllabusButtons from "../components/Syllabus/Create/SyllabusButtons";

const text1 = `   Trainees’ PCs need to have following software installed & run without any issues:
• Microsoft SQL Server 2005 Express (in which the trainees can create & manipulate on their own database)
• Microsoft Visual Studio 2017
• Microsoft Office 2007 (Visio, Word, PowerPoint) `;

const line = `• Trainee who actively complete online learning according to MOOC links provided</br>
• At the end of the day, students complete Daily Quiz for 30 minutes</br>
• Trainer/Mentor supports answering questions, guiding exercises 1.5-2.0h/day</br>
• Trainer conducts the workshops</br>
• Trainees complete Assignments and Labs</br>
• Trainees have 1 final test in 4 hours (1 hour theory + 3 hours of practice)`;

export default function SyllabusCreate() {
  const { activeTab, handleFieldValidation } = useContext(SyllabusContext);

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
          <SyllabusHeader />
          <Stack
            direction="row"
            sx={{
              padding: "20px",
              alignItems: "center",
              gap: "100px",
              "& h6": { display: "flex", alignItems: "center", gap: "15px" },
            }}
          >
            <Box
              sx={{
                height: "80px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Typography variant={"h6"} fontWeight="bold">
                Syllabus Name*
              </Typography>
              <TextField
                required
                name="syllabusName"
                type="text"
                sx={{
                  borderRadius: "6px",
                  minHeight: "36px",
                  minWidth: "300px",
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
            </Box>
            <Typography variant={"h6"} fontWeight="bold">
              Code<Typography component="span">NLP</Typography>
            </Typography>
            <Typography variant={"h6"} fontWeight="bold">
              Version<Typography component="span">1.0</Typography>
            </Typography>
          </Stack>
          <SyllabusTabContent />
          <SyllabusButtons />
        </form>
      </AppContainer>
    </SyllabusWrapper>
  );
}
