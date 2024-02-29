import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import SortIcon from "@mui/icons-material/Sort";
import { InputBoxSearch } from "../components/shared/InputBox/InputBox";
import PublishIcon from "@mui/icons-material/Publish";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ImportTraningProgram } from "../components/TraningProgramList/ImportTraningProgram";
import {
  Grid,
  Box,
  Typography,
  Chip,
  Stack,
  Menu,
  Divider,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemIcon,
  Container,
} from "@mui/material";
const heightNav = 32;

export default function SyllabusListing({data}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [importFormOpen, setimportFormOpen] = useState(false);
  const handleOpenImportForm = () => {
    setimportFormOpen(true);
  };
  const handleCloseImportForm = () => {
    setimportFormOpen(false);
  };

  const [datas, setDatas] = useState((data) => [
    {
      id: 121,
      syllabusName: "C# basic program",
      code: "NPL",
      createdOn: "21/07/2019",
      createdBy: "Warrior Tran",
      duration: "1",
      outputStandard: ["H4SD", "ABCD", "1234", "5678"],
      status: "Active",
    },
    {
      id: 122,
      syllabusName: "Java advanced program",
      code: "CBG",
      createdOn: "15/09/2020",
      createdBy: "John Doe",
      duration: "14",
      outputStandard: ["H4SD"],
      status: "Inactive",
    },
    {
      id: 123,
      syllabusName: "Python for beginners",
      code: "NET",
      createdOn: "10/03/2021",
      createdBy: "Jane Smith",
      duration: "30",
      outputStandard: ["H4SD"],
      status: "Draft",
    },
    {
      id: 124,
      syllabusName: "JavaScript fundamentals",
      code: "PYT",
      createdOn: "05/12/2022",
      createdBy: "Alex Johnson",
      duration: "21",
      outputStandard: ["H4SD"],
      status: "Active",
    },
    {
      id: 125,
      syllabusName: "HTML and CSS basics",
      code: "DOF",
      createdOn: "18/06/2023",
      createdBy: "Emily Brown",
      duration: "10",
      outputStandard: ["H4SD", "ABCD", "1234", "5678"],
      status: "Inactive",
    },
    {
      id: 126,
      syllabusName: "Data Structures and Algorithms",
      code: "AZD",
      createdOn: "02/09/2023",
      createdBy: "Michael Davis",
      duration: "30",
      outputStandard: ["H4SD"],
      status: "Draft",
    },
    {
      id: 127,
      syllabusName: "Python advanced program",
      code: "AWD",
      createdOn: "10/01/2024",
      createdBy: "Sarah Johnson",
      duration: "14",
      outputStandard: ["H4SD"],
      status: "Active",
    },
    {
      id: 128,
      syllabusName: "Web Development Bootcamp",
      code: "FUJL",
      createdOn: "22/04/2024",
      createdBy: "David Wilson",
      duration: "60",
      outputStandard: ["H4SD"],
      status: "Inactive",
    },
    {
      id: 129,
      syllabusName: "Machine Learning for Beginners",
      code: "FULN",
      createdOn: "08/07/2024",
      createdBy: "Sophia Lee",
      duration: "30",
      outputStandard: ["H4SD", "ABC"],
      status: "Draft",
    },
    {
      id: 130,
      syllabusName: "React.js Fundamentals",
      code: "TES",
      createdOn: "19/10/2024",
      createdBy: "Daniel Smith",
      duration: "14",
      outputStandard: ["H4SD", "ABCD", "1234"],
      status: "Active",
    },
  ]);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortTPName = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) =>
        a.syllabusName.localeCompare(b.syllabusName)
      );
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) =>
        b.syllabusName.localeCompare(a.syllabusName)
      );
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const handleSortTPCode = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => a.code.localeCompare(b.code));
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => b.code.localeCompare(a.code));
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const handleSorTPCreatedOn = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => {
        const dateA = new Date(a.createdOn.split("/").reverse().join("-"));
        const dateB = new Date(b.createdOn.split("/").reverse().join("-"));
        return dateA - dateB;
      });
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => {
        const dateA = new Date(a.createdOn.split("/").reverse().join("-"));
        const dateB = new Date(b.createdOn.split("/").reverse().join("-"));
        return dateB - dateA;
      });
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const handleSortTPCreatedBy = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => a.createdBy.localeCompare(b.createdBy));
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => b.createdBy.localeCompare(a.createdBy));
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const HandleSortTPDuration = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => a.duration - b.duration);
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => b.duration - a.duration);
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const handleSortTPOutputStandard = (
    datas,
    sortOrder,
    setSortOrder,
    setDatas
  ) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) =>
        a.outputStandard.localeCompare(b.outputStandard)
      );
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) =>
        b.outputStandard.localeCompare(a.outputStandard)
      );
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const handleSortTPStatus = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => {
        if (a.status === "Active" && b.status === "Active") {
          return 0;
        } else if (a.status === "Active") {
          return -1;
        } else if (b.status === "Active") {
          return 1;
        } else if (a.status === "Inactive" && b.status === "Inactive") {
          return 0;
        } else if (a.status === "Inactive") {
          return -1;
        } else if (b.status === "Inactive") {
          return 1;
        } else if (a.status === "Draft" && b.status === "Draft") {
          return 0;
        } else if (a.status === "Draft") {
          return -1;
        } else if (b.status === "Draft") {
          return 1;
        } else {
          return 0;
        }
      });
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => {
        if (a.status === "Active" && b.status === "Active") {
          return 0;
        } else if (a.status === "Active") {
          return 1;
        } else if (b.status === "Active") {
          return -1;
        } else if (a.status === "Inactive" && b.status === "Inactive") {
          return 0;
        } else if (a.status === "Inactive") {
          return 1;
        } else if (b.status === "Inactive") {
          return -1;
        } else if (a.status === "Draft" && b.status === "Draft") {
          return 0;
        } else if (a.status === "Draft") {
          return 1;
        } else if (b.status === "Draft") {
          return -1;
        } else {
          return 0;
        }
      });
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
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

        {/* action right here ex:filter add import */}
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
              <Box
                component="form"
                sx={{
                  border: "1px solid",
                  borderRadius: "10px",
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <CalendarTodayIcon sx={{ marginLeft: "10px" }} />
                <Typography sx={{ paddingLeft: "10px" }}>
                  Created date
                </Typography>
              </Box>
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
              <ImportTraningProgram
                isOpen={importFormOpen}
                handleClose={handleCloseImportForm}
                key={importFormOpen.toString()}
              />
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

        {/* syllabus table */}
        <TableContainer sx={{ marginTop: 3, borderRadius: 1, width: "100%" }}>
          <Table>
            <TableHead sx={{ background: "#2D3748" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "white", width: "20%", pt: 1, pb: 1 }}
                  align="left"
                  onClick={() =>
                    handleSortTPName(datas, sortOrder, setSortOrder, setDatas)
                  }
                >
                  Syllabus name
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
                  align="left"
                  onClick={() =>
                    handleSortTPCode(datas, sortOrder, setSortOrder, setDatas)
                  }
                >
                  Code<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
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
                  align="left"
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
                  align="left"
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
                  align="left"
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
                    width: "20%",
                    pl: 0,
                    pr: 0,
                    pt: 1,
                    pb: 1,
                  }}
                  align="left"
                  onClick={() =>
                    handleSortTPOutputStandard(
                      datas,
                      sortOrder,
                      setSortOrder,
                      setDatas
                    )
                  }
                >
                  Output Standard<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    width: "10%",
                    pl: 2,
                    pr: 0,
                    pt: 1,
                    pb: 1,
                  }}
                  align="left"
                  onClick={() =>
                    handleSortTPStatus(datas, sortOrder, setSortOrder, setDatas)
                  }
                >
                  Status<SortIcon sx={{ mb: -1, pb: 0.5 }}></SortIcon>
                </TableCell>
                <TableCell
                  sx={{ color: "white", pt: 1, pb: 1 }}
                  align="left"
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
                  <TableCell
                    sx={{ width: "20%", fontWeight: "bold", pt: 0.5, pb: 0.5 }}
                    align="left"
                  >
                    {data.syllabusName}
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                    {data.code}
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                    {data.createdOn}
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                    {data.createdBy}
                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                    {data.duration >= 2
                      ? data.duration + " days"
                      : data.duration + " day"}
                  </TableCell>
                  <TableCell sx={{ width: "20%", p: 0.5 }} align="left">
                    <Box sx={{ display: "flex" }}>
                      {data.outputStandard.slice(0, 3).map((standard, index) => (
                        <Box sx={{ paddingRight: "5px" }} key={index}>
                          <Chip
                            sx={{
                              background: "#2D3748",
                              color: "white",
                              width: "75px",
                              height: "28px",
                            }}
                            label={standard.trim()}
                          />
                        </Box>
                      ))}
                      {data.outputStandard.length > 3 && (
                        <span style={{ cursor: "pointer" }}>
                          <Link to={`/syllabus/detail/${data.id}`}>
                            <MoreHorizIcon></MoreHorizIcon>
                          </Link>
                        </span>
                      )}
                    </Box>

                  </TableCell>
                  <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                    {data.status === "Active" ? (
                      <Chip
                        sx={{
                          background: "#2D3748",
                          color: "white",
                          width: "75px",
                          height: "28px",
                        }}
                        label={data.status}
                      />
                    ) : data.status === "Inactive" ? (
                      <Chip
                        sx={{
                          background: "#B9B9B9",
                          color: "white",
                          width: "75px",
                          height: "28px",
                        }}
                        label={data.status}
                      />
                    ) : data.status === "Draft" ? (
                      <Chip
                        sx={{
                          background: "#285D9A",
                          color: "white",
                          width: "75px",
                          height: "28px",
                        }}
                        label={data.status}
                      />
                    ) : null}
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }} align="left">
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
                      sx={{
                        ".css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper":
                        {
                          boxShadow:
                            "0px 0px 0px -3px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 9px 1px rgba(0,0,0,0.12)",
                        },
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
                          <AddCircleOutlineIcon sx={{ color: "#285D9A" }} />
                        </ListItemIcon>
                        Add training program
                      </MenuItem>
                      <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
                        <ListItemIcon>
                          <CreateOutlinedIcon sx={{ color: "#285D9A" }} />
                        </ListItemIcon>
                        Edit syllabus
                      </MenuItem>
                      <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
                        <ListItemIcon>
                          <ContentCopyOutlinedIcon sx={{ color: "#285D9A" }} />
                        </ListItemIcon>
                        Duplicate syllabus
                      </MenuItem>
                      <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
                        <ListItemIcon>
                          <DeleteForeverOutlinedIcon
                            sx={{ color: "#285D9A" }}
                          />
                        </ListItemIcon>
                        Delete syllabus
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
