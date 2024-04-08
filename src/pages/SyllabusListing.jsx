import React, { useState } from "react";
import { Typography, Stack, Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SyllabusTable from "../components/Syllabus/SyllabusList/SyllabusTable";
import { Link } from "react-router-dom";
import { SyllabusFilter } from "../components/Syllabus/SyllabusList/SyllabusFilter";
import SyllabusWrapper from "../context/SyllabusWrapper";
import SearchSyllabus from "../components/Syllabus/SyllabusList/SearchSyllabus";
import ImportSyllabus from "../components/Syllabus/SyllabusList/ImportSyllabus";

export default function SyllabusListing() {
  const [importFormOpen, setimportFormOpen] = useState(false);
  const handleOpenImportForm = () => {
    setimportFormOpen(true);
  };
  const handleCloseImportForm = () => {
    setimportFormOpen(false);
  };

  return (
    <SyllabusWrapper>
      <Typography sx={{ color: "#2D3748" }} variant="h4">
        Syllabus
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems={"center"}
        gap={1}
        sx={{ marginTop: 3 }}
      >
        <Stack
          gap={2}
          direction={{ xs: "column", sm: "row" }}
          display="flex"
          flexWrap="wrap"
        >
          <SearchSyllabus />
          <SyllabusFilter />
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          display="flex"
          flexWrap="wrap"
        >
          <Button
            sx={{
              backgroundColor: "orangered",
              marginTop: { xs: 2, sm: 0 },
              marginLeft: { xs: 0, sm: "auto" },
              marginRight: { xs: "auto", sm: 0 },
              borderRadius: 2,
            }}
            variant="contained"
            size="small"
            onClick={handleOpenImportForm}
            startIcon={<PublishIcon />}
          >
            Import
          </Button>
          <ImportSyllabus
            isOpen={importFormOpen}
            handleClose={handleCloseImportForm}
          />
          <Link to="/syllabus/create">
            <Button
              sx={{
                marginTop: { xs: 2, sm: 0 },
                marginLeft: { xs: 0, sm: 2 },
                marginRight: { xs: "auto", sm: 0 },
                background: "#2D3748",
                borderRadius: 2,
              }}
              variant="contained"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Syllabus
            </Button>
          </Link>
        </Stack>
      </Stack>
      <SyllabusTable />
    </SyllabusWrapper>
  );
}
