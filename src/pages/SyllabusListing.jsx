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
import ProtectedButton from "../components/shared/protected/ProtectedButton";

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
        sx={{ marginTop: 3, justifyContent: "space-between" }}
      >
        <Stack
          gap={3}
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
          <ProtectedButton
            onClick={handleOpenImportForm}
            permissionRequired={"create"}
            pathName={"syllabus"}
          >
            <Button
              sx={{
                backgroundColor: "orangered",
                marginLeft: { xs: 0, sm: "auto" },
                marginRight: { xs: "auto", sm: 3 },
                marginTop: { xs: 2, sm: 0 },
                borderRadius: 2,
              }}
              variant="contained"
              size="small"
              startIcon={<PublishIcon />}
            >
              Import
            </Button>
          </ProtectedButton>
          <ImportSyllabus
            isOpen={importFormOpen}
            handleClose={handleCloseImportForm}
          />
          <Link to="/syllabus/create">
            <Button
              sx={{
                marginLeft: { xs: 0, sm: "auto" },
                marginRight: { xs: "auto", sm: 0 },
                marginTop: { xs: 2, sm: 0 },
                padding: 1,
                background: "#2D3748",
                // borderRadius: 2,
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
