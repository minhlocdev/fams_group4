import React, { useContext } from "react";
import { Grid } from "@mui/material";
import SyllabusWrapper from "../context/SyllabusWrapper";
import { SyllabusContext } from "../context/SyllabusContext";
import SyllabusTabContent from "../components/Syllabus/Create/SyllabusTabContent";
import SyllabusHeader from "../components/Syllabus/Create/SyllabusHeader";
import SyllabusButtons from "../components/Syllabus/Create/SyllabusButtons";
import SyllabusName from "../components/Syllabus/Create/SyllabusName";
import CodeVersion from "../components/Syllabus/Create/CodeVersion";

export default function SyllabusCreate() {
  const { activeTab } = useContext(SyllabusContext);

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
          sm={12}
          sx={{
            alignItems: "center",
            marginBottom: "20px",
            "& h6": { display: "flex", alignItems: "center", gap: "15px" },
          }}
        >
          <SyllabusName />
          <CodeVersion />
        </Grid>
        {/* <Grid container item xs={12}> */}
        <SyllabusTabContent />
        {/* </Grid> */}
        <Grid container item xs={12} sm={12} spacing={2}>
          <SyllabusButtons />
        </Grid>
      </form>
    </SyllabusWrapper>
  );
}
