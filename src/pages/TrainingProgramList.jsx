import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { InputBoxSearch } from "../components/shared/InputBox/InputBox";
import { BasicFilterbtn } from "../components/shared/filterButton";
import PublishIcon from "@mui/icons-material/Publish";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SortIcon from "@mui/icons-material/Sort";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  HandleSortTPID,
  handleSortTPName,
  handleSorTPCreatedOn,
  handleSortTPCreatedBy,
  HandleSortTPDuration,
  handleSortTPStatus,
} from "../utils/util";
import ImportTrainingProgram from "../components/TraningProgramList/ImportTrainingProgram";
import TrainningProgramTable from "../components/TraningProgramList/TrainningProgramTable";
import Paging from "../components/shared/Paging/Paging";
import { Link } from "react-router-dom";

const heightNav = 32;

export default function TrainingProgramList() {
  // cai này đang bỏ data ảo nha
  const [datas, setDatas] = useState([
    {
      id: 121,
      programName: "C# basic program",
      createdOn: "21/07/2019",
      createdBy: "Warrior Tran",
      duration: "7",
      status: "Active",
    },
    {
      id: 122,
      programName: "Java advanced program",
      createdOn: "15/09/2020",
      createdBy: "John Doe",
      duration: "14",
      status: "Inactive",
    },
    {
      id: 123,
      programName: "Python for beginners",
      createdOn: "10/03/2021",
      createdBy: "Jane Smith",
      duration: "30",
      status: "Draft",
    },
    {
      id: 124,
      programName: "JavaScript fundamentals",
      createdOn: "05/12/2022",
      createdBy: "Alex Johnson",
      duration: "21",
      status: "Active",
    },
    {
      id: 125,
      programName: "HTML and CSS basics",
      createdOn: "18/06/2023",
      createdBy: "Emily Brown",
      duration: "10",
      status: "Inactive",
    },
    {
      id: 126,
      programName: "Data Structures and Algorithms",
      createdOn: "02/09/2023",
      createdBy: "Michael Davis",
      duration: "30",
      status: "Draft",
    },
    {
      id: 127,
      programName: "Python advanced program",
      createdOn: "10/01/2024",
      createdBy: "Sarah Johnson",
      duration: "14",
      status: "Active",
    },
    {
      id: 128,
      programName: "Web Development Bootcamp",
      createdOn: "22/04/2024",
      createdBy: "David Wilson",
      duration: "60",
      status: "Inactive",
    },
    {
      id: 129,
      programName: "Machine Learning for Beginners",
      createdOn: "08/07/2024",
      createdBy: "Sophia Lee",
      duration: "30",
      status: "Draft",
    },
    {
      id: 130,
      programName: "React.js Fundamentals",
      createdOn: "19/10/2024",
      createdBy: "Daniel Smith",
      duration: "14",
      status: "Active",
    },
  ]);

  const [importFormOpen, setimportFormOpen] = useState(false);
  const handleOpenImportForm = () => {
    setimportFormOpen(true);
  };
  const handleCloseImportForm = () => {
    setimportFormOpen(false);
  };

  return (
    <AppContainer>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "calc(100% + 21px)",
            background: "#2D3748",
            paddingTop: 0.5,
            paddingBottom: 0.5,
            paddingLeft: 4,
            marginLeft: -2.5,
            marginTop: -0.3,
          }}
        >
          <Typography sx={{ color: "white" }} variant="h6">
            Training program
          </Typography>
        </Box>

        {/* action right here ex:fillter add import */}
        <Grid
          container
          spacing={2}
          sx={{
            height: heightNav,
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={8}>
            <Stack direction="row" spacing={2} sx={{ height: heightNav }}>
              <InputBoxSearch></InputBoxSearch>
              <BasicFilterbtn></BasicFilterbtn>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                height: heightNav,
                justifyContent: "center",
                paddingLeft: 9,
              }}
            >
              {/* open import pop-up */}
              <Button
                sx={{
                  background: "#D45B13",
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
                  }}
                  variant="contained"
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add new
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>

        {/* traning program table */}
        <TrainningProgramTable data={datas}></TrainningProgramTable>
      </Box>
    </AppContainer>
  );
}
