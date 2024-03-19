import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import SyllabusCard from "../Syllabus/SyllabusCards";
import SearchSyllabus from "./SearchSyllabus";
import { getAllSyllabus } from "../../services/Syllabus";
import ClassContext from "../../context/ClassContext";

export default function AddSyllabus({ TraningProgramName, onClickBack }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // fake data
  const day = 0;
  const hours = 0;
  const onDay = "23/7/2022";
  const AccountName = "Warrior Tran";
  const data = {
    id: 121,
    programName: { TraningProgramName },
    createdOn: "21/07/2019",
    createdBy: "Warrior Tran",
    duration: "7",
    status: "Inactive",
  };

  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllProgram = async () => {
    const response = await getAllSyllabus();
    console.log("the response", response);
    setLoading(false);
    if (!response) return;
    if (response) {
      setProgram(response);
      console.log("the program", program);
    }
  };
  useEffect(() => {
    getAllProgram();
  }, []);
  const [SelectedListSyllabus, setSelectedListSyllabus] = useState([]);
  const handleSearch = (syl) => {
    setSelectedListSyllabus((prevSelectedListSyllabus) => [
      ...prevSelectedListSyllabus,
      syl,
    ]);
    const updatedList = program.filter((item) => item.id !== syl.id);
    setProgram(updatedList);
  };

  const [ListSyllabus, setListSyllabus] = useState([
    {
      id: 1,
      title: "Linux",
      status: "Active",
      version: "LIN v2.0",
      duration: "4 day (12 hours)",
      modifiedDate: "23/07/2022",
      modifiedBy: "johny Deep",
    },
    {
      id: 2,
      title: "AWS basic",
      status: "Active",
      version: "AWB v1.0",
      duration: "7 day (21hours)",
      modifiedDate: "23/07/2022",
      modifiedBy: "johny Deep",
    },
    {
      id: 3,
      title: "Linux",
      status: "Active",
      version: "LIN v2.0",
      duration: "4 day (12 hours)",
      modifiedDate: "23/07/2022",
      modifiedBy: "johny Deep",
    },
  ]);

  const handleDeleteSyllabus = (id) => {
    const updatedList = SelectedListSyllabus.filter((item) => item.id !== id);
    setSelectedListSyllabus(updatedList);
    const deletedSyllabus = SelectedListSyllabus.find((item) => item.id === id);
    setProgram((prevProgram) => [...prevProgram, deletedSyllabus]);
  };

  return (
    <>
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
        <Typography sx={{ color: "white", pt: 1, pb: 1 }} variant="h6">
          Training program
        </Typography>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography sx={{ color: "white", pt: 1, pb: 1 }} variant="h4">
              {TraningProgramName}
            </Typography>

            {data.status === "Active" ? (
              <Chip
                sx={{
                  background: "#2D3748",
                  color: "white",
                  borderColor: "white",
                }}
                label={data.status}
                variant="outlined"
              />
            ) : data.status === "Inactive" ? (
              <Chip
                sx={{
                  background: "#B9B9B9",
                  color: "white",
                  borderColor: "white",
                }}
                label={data.status}
                variant="outlined"
              />
            ) : data.status === "Draft" ? (
              <Chip
                sx={{
                  background: "#285D9A",
                  color: "white",
                  borderColor: "white",
                }}
                label={data.status}
                variant="outlined"
              />
            ) : null}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mr: 2 }}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "white" }}
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
                  <SnippetFolderOutlinedIcon sx={{ color: "#285D9A" }} />
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
                  <VisibilityOffOutlinedIcon sx={{ color: "#285D9A" }} />
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
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "calc(100% + 21px)",
          paddingTop: 0.5,
          paddingBottom: 0.5,
          paddingLeft: 4,
          marginLeft: -2.5,
          marginTop: -0.3,
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {day === 0 ? "..." : `${day}`} day ({hours === 0 ? "..." : `${hours}`}{" "}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ fontStyle: "italic" }}
          >
            hours
          </Typography>
          )
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Modified on {onDay} by{" "}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {AccountName}{" "}
          </Typography>
        </Typography>
      </Box>
      <hr></hr>
      <Box
        sx={{
          width: "calc(100% + 21px)",
          paddingTop: 0.5,
          paddingBottom: 0.5,
          paddingLeft: 4,
          marginLeft: -2.5,
          marginTop: -0.3,
        }}
      >
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="subtitle1"
          gutterBottom
        >
          Content
        </Typography>
        <Box sx={{ pt: 1, pb: 2 }}>
          {SelectedListSyllabus?.map((Syllabus) => (
            <SyllabusCard
              key={Syllabus.id}
              data={Syllabus}
              onDelete={handleDeleteSyllabus}
            />
          ))}
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{ height: "32px", alignItems: "center" }}
        >
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="subtitle2"
            gutterBottom
          >
            Select syllabus
          </Typography>
          <SearchSyllabus
            program={program}
            loading={loading}
            handleSearch={handleSearch}
          />
        </Stack>
      </Box>

      <Stack
        direction="row"
        sx={{
          width: "calc(100% + 21px)",
          paddingTop: 0.5,
          paddingBottom: 0.5,
          paddingLeft: 4,
          marginLeft: -2.5,
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          sx={{ maxHeight: 27, background: "#2D3748" }}
          onClick={onClickBack}
        >
          Back
        </Button>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "flex-end", marginRight: 5 }}
        >
          <Button
            variant="text"
            sx={{
              color: "#E74A3B",
              textDecoration: "underline",
              maxHeight: 27,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ maxHeight: 27, background: "#2D3748" }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
