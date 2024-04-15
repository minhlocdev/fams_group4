import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { BasicFilterProgrambtn } from "../components/TraningProgramList/FilterButtonProgram";
import PublishIcon from "@mui/icons-material/Publish";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImportTrainingProgram from "../components/TraningProgramList/ImportTrainingProgram";
import TrainningProgramTable from "../components/TraningProgramList/TrainningProgramTable";
import { Link } from "react-router-dom";
import { TrainingProgramProvider } from "../context/TrainingProgramContext";
import SearchProgram from "../components/TraningProgramList/SearchProgram";
import theme from "../assets/theme";

export default function TrainingProgramList() {
  const [importFormOpen, setimportFormOpen] = useState(false);
  const handleOpenImportForm = () => {
    setimportFormOpen(true);
  };
  const handleCloseImportForm = () => {
    setimportFormOpen(false);
  };

  return (
    <TrainingProgramProvider>
      <Typography
        variant="h4"
        fontWeight={600}
        marginTop={10}
        color={theme.primary}
      >
        Training program
      </Typography>

      {/* action right here ex:fillter add import */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        display="flex"
        flexWrap="wrap"
        sx={{ marginTop: 3 }}
      >
        <Stack
          gap={3}
          direction={{ xs: "column", sm: "row" }}
          display="flex"
          flexWrap="wrap"
        >
          <SearchProgram />
          <BasicFilterProgrambtn />
        </Stack>

        <Button
          sx={{
            background: "#D45B13",
            marginLeft: { xs: 0, sm: "auto" },
            marginRight: { xs: "auto", sm: 3 },
            marginTop: { xs: 2, sm: 0 },
          }}
          variant="contained"
          size="small"
          onClick={handleOpenImportForm}
          startIcon={<PublishIcon />}
        >
          Import
        </Button>
        <ImportTrainingProgram
          isOpen={importFormOpen}
          handleClose={handleCloseImportForm}
          key={importFormOpen.toString()}
        />
        {/* Move to Create Training program screen */}
        <Link to={"/tranning/create"}>
          <Button
            sx={{
              background: "#2D3748",
              marginLeft: { xs: 0, sm: "auto" },
              marginRight: { xs: "auto", sm: 0 },
              marginTop: { xs: 2, sm: 0 },
              padding: 1,
            }}
            variant="contained"
            size="small"
            startIcon={<AddCircleOutlineIcon />}
          >
            Add new
          </Button>
        </Link>
      </Stack>

      {/* traning program table */}
      <TrainningProgramTable />
    </TrainingProgramProvider>
  );
}
