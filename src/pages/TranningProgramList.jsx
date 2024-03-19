import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
import ImportTrainingProgram from "../components/TraningProgramList/ImportTraningProgram";

const heightNav = 32;

// cái này là ví dụ thoi nha

export default function TranningProgramList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const [sortOrder, setSortOrder] = useState("asc");
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
            </Stack>
          </Grid>
        </Grid>

        {/* traning program table */}
        <TableContainer sx={{ marginTop: 3, borderRadius: 1, width: "100%" }}>
          <Table>
            <TableHead sx={{ background: "#2D3748" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "white", width: "7%", pt: 1, pb: 1 }}
                  onClick={() =>
                    HandleSortTPID(datas, sortOrder, setSortOrder, setDatas)
                  }
                >
                  {" "}
                  ID<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>{" "}
                </TableCell>
                <TableCell
                  sx={{ color: "white", width: "39%", pt: 1, pb: 1 }}
                  align="left"
                  onClick={() =>
                    handleSortTPName(datas, sortOrder, setSortOrder, setDatas)
                  }
                >
                  Program name
                  <SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    width: "10%",
                    pl: 0,
                    pr: 0,
                    pt: 1,
                    pb: 1,
                  }}
                  align="center"
                  onClick={() =>
                    handleSorTPCreatedOn(
                      datas,
                      sortOrder,
                      setSortOrder,
                      setDatas
                    )
                  }
                >
                  Created on<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    width: "10%",
                    pl: 0,
                    pr: 0,
                    pt: 1,
                    pb: 1,
                  }}
                  align="center"
                  onClick={() =>
                    handleSortTPCreatedBy(
                      datas,
                      sortOrder,
                      setSortOrder,
                      setDatas
                    )
                  }
                >
                  Created by<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    width: "10%",
                    pl: 0,
                    pr: 0,
                    pt: 1,
                    pb: 1,
                  }}
                  align="center"
                  onClick={() =>
                    HandleSortTPDuration(
                      datas,
                      sortOrder,
                      setSortOrder,
                      setDatas
                    )
                  }
                >
                  Duration<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    width: "10%",
                    pl: 0,
                    pr: 0,
                    pt: 1,
                    pb: 1,
                  }}
                  align="center"
                  onClick={() =>
                    handleSortTPStatus(datas, sortOrder, setSortOrder, setDatas)
                  }
                >
                  Status<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                </TableCell>
                <TableCell
                  sx={{ color: "white", pt: 1, pb: 1 }}
                  align="center"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    maxHeight: "30px",
                  }}
                >
                  <TableCell sx={{ width: "7%", pt: 0.5, pb: 0.5 }}>
                    {" "}
                    {data.id}
                  </TableCell>
                  <TableCell
                    sx={{ width: "39%", fontWeight: "bold", pt: 0.5, pb: 0.5 }}
                    align="left"
                  >
                    {data.programName}
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="center">
                    {data.createdOn}
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="center">
                    {data.createdBy}
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="center">
                    {data.duration} days
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="center">
                    {data.status === "Active" ? (
                      <Chip
                        sx={{ background: "#2D3748", color: "white" }}
                        label={data.status}
                      />
                    ) : data.status === "Inactive" ? (
                      <Chip
                        sx={{ background: "#B9B9B9", color: "white" }}
                        label={data.status}
                      />
                    ) : data.status === "Draft" ? (
                      <Chip
                        sx={{ background: "#285D9A", color: "white" }}
                        label={data.status}
                      />
                    ) : null}
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }} align="center">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreHorizIcon></MoreHorizIcon>
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "#2A4365",
                          fontWeight: "bold",
                          ml: 2,
                        }}
                      >
                        Manage
                      </Typography>
                      <Divider
                        sx={{ background: "#ACACAC" }}
                        variant="middle"
                        component="li"
                      />

                      <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
                        <ListItemIcon>
                          <SnippetFolderOutlinedIcon
                            sx={{ color: "#285D9A" }}
                          />
                        </ListItemIcon>
                        Training material
                      </MenuItem>
                      <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
                        <ListItemIcon>
                          <CreateOutlinedIcon sx={{ color: "#285D9A" }} />
                        </ListItemIcon>
                        Edit program
                      </MenuItem>
                      <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
                        <ListItemIcon>
                          <ContentCopyOutlinedIcon sx={{ color: "#285D9A" }} />
                        </ListItemIcon>
                        Duplicate program
                      </MenuItem>
                      <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
                        <ListItemIcon>
                          <VisibilityOffOutlinedIcon
                            sx={{ color: "#285D9A" }}
                          />
                        </ListItemIcon>
                        De-activate program
                      </MenuItem>
                      <MenuItem sx={{ color: "#8B8B8B" }} onClick={handleClose}>
                        <ListItemIcon>
                          <DeleteForeverOutlinedIcon />
                        </ListItemIcon>
                        Delete program
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AppContainer>
  );
}
