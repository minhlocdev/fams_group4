import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
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
import SyllabusCard from "../Syllabus/Detail/SyllabusCards";
import SearchSyllabus from "./SearchSyllabus";
import { getAllSyllabus } from "../../services/Syllabus";
import ClassContext from "../../context/ClassContext";
import dayjs from "dayjs";
import {
  useGetAllSyllabusQuery,
  useGetSyllabusByIdQuery,
} from "../../services/queries/syllabusQuery";
import AuthContext from "../../utils/authUtil";
import { usePostTrainingMutation } from "../../services/queries/trainingQuery";
import { QUERY_PROGRAM_KEY } from "../../constants/query";
import ToastEmitter from "../shared/lib/ToastEmitter";
import queryClient from "../../services/queries/queryClient";
import { useNavigate } from "react-router-dom";

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
  const { loginUser } = useContext(AuthContext);
  const AccountName = "Warrior Tran";
  const [newTrainingProgram, setNewTrainingProgram] = useState({
    name: TraningProgramName,
    userId: loginUser.id,
    userId: loginUser.id,
    startTime: new Date().toISOString(),
    duration: 0, //là durationByDay
    topicCode: "string",
    status: 0,
    createdBy: loginUser.name,
    classIds: [],
    syllabusDTOs: [],
  });
  const handleChange = (field, value) => {
    setNewTrainingProgram({ ...newTrainingProgram, [field]: value });
  };
  const handleCancle = () => {
    setNewTrainingProgram({
      name: TraningProgramName,
      userId: loginUser.id,
      startTime: new Date().toISOString(),
      duration: 0, //là durationByDay
      topicCode: "string",
      status: 0,
      createdBy: loginUser.name,
      classIds: [],
      syllabusDTOs: [],
    });
    setSelectedListSyllabus([]);
    const updatedData = data.list.filter(
      (item) => item.publishStatus !== 0 && item.publishStatus !== -1
    );
    setProgram(updatedData);
  };
  const [program, setProgram] = useState([]);
  const [SelectedListSyllabus, setSelectedListSyllabus] = useState([]);
  const { data, isLoading, isSuccess } = useGetAllSyllabusQuery();
  useEffect(() => {
    if (isSuccess) {
      const updatedData = data.list.filter(
        (item) => item.publishStatus !== 0 && item.publishStatus !== -1
      );
      setProgram(updatedData);
    }
  }, [data, isSuccess]);

  const [syllabusDTOs, setSyllabusDTOs] = useState([]);

  useEffect(() => {
    handleChange("syllabusDTOs", syllabusDTOs);
  }, [syllabusDTOs]);

  const handleSearch = (syl) => {
    setSelectedListSyllabus((prevSelectedListSyllabus) => [
      ...prevSelectedListSyllabus,
      syl,
    ]);
    setSyllabusDTOs((preSyllabusDTOs) => [
      ...preSyllabusDTOs,
      { syllabusId: syl.id, sequence: preSyllabusDTOs.length + 1 },
    ]);
    const updatedList = program.filter((item) => item.id !== syl.id);
    setProgram(updatedList);
    handleChange("duration", newTrainingProgram.duration + syl.durationByDay); //tính tổng ngày
  };

  const handleDeleteSyllabus = (id) => {
    const updatedSyllabusDTOs = syllabusDTOs.map((syllabus) => {
      if (syllabus.syllabusId === id) {
        const index = syllabusDTOs.findIndex((s) => s.syllabusId === id);
        syllabus.sequence -= 1;
        for (let i = index + 1; i < syllabusDTOs.length; i++) {
          syllabusDTOs[i].sequence -= 1;
        }
      }
      return syllabus;
    });

    const filteredSyllabusDTOs = updatedSyllabusDTOs.filter(
      (item) => item.syllabusId !== id
    );
    setSyllabusDTOs(filteredSyllabusDTOs);

    const updatedList = SelectedListSyllabus.filter((item) => item.id !== id);
    setSelectedListSyllabus(updatedList);

    const deletedSyllabus = SelectedListSyllabus.find((item) => item.id === id);
    setProgram((prevProgram) => [...prevProgram, deletedSyllabus]);
    handleChange(
      "duration",
      newTrainingProgram.duration - deletedSyllabus.durationByDay
    ); //tính tổng ngày
  };
  const navigate = useNavigate();
  const { mutate: postProgram, isSuccess: isSuccessPost } =
    usePostTrainingMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    postProgram(newTrainingProgram, {
      onSuccess: (res) => {
        console.log("res", res.data);
        navigate(`/training/detail/${res.data.trainingProgramCode}`);
      },
      onError: () => {
        ToastEmitter.error("Add failed!!");
      },
    });
  };

  return (
    <Box>
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
              {newTrainingProgram.name}
            </Typography>
            {newTrainingProgram?.status === 1 ? (
              <Chip
                sx={{
                  background: "#2D3748",
                  color: "white",
                  borderColor: "white",
                }}
                label="Active"
                variant="outlined"
              />
            ) : newTrainingProgram?.status === 0 ? (
              <Chip
                sx={{
                  background: "#B9B9B9",
                  color: "white",
                  borderColor: "white",
                }}
                label="Inactive"
                variant="outlined"
              />
            ) : (
              <Chip
                sx={{
                  background: "#285D9A",
                  color: "white",
                  borderColor: "white",
                }}
                label="Draft"
                variant="outlined"
              />
            )}
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
              sx={{
                "& .MuiMenu-paper": {
                  borderRadius: "10px",
                },
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
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
          {newTrainingProgram?.duration === 0
            ? "..."
            : `${newTrainingProgram?.duration}`}{" "}
          day
          {/* ({totalHours === 0 ? '...' : `${totalHours}`}{' '}
          <Typography component="span" variant="subtitle1" sx={{ fontStyle: 'italic' }}>
            hours
          </Typography>
          ) */}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Modified on {dayjs(newTrainingProgram.startTime).format("DD/MM/YYYY")}{" "}
          by{" "}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {newTrainingProgram.createdBy}{" "}
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
        <Box sx={{ pt: 1, pb: 2, ml: -2 }}>
          {SelectedListSyllabus?.map((Syllabus) => (
            <SyllabusCard
              key={Syllabus.syllabusCode}
              SyllabusID={Syllabus.id}
              SyllabusName={Syllabus.name}
              SyllabusCode={Syllabus.syllabusCode}
              onDelete={handleDeleteSyllabus}
            />
          ))}
        </Box>
        <Grid container sx={{ height: "32px", alignItems: "center" }}>
          <Grid item xs={12} xl={1.2}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="subtitle2"
              gutterBottom
            >
              Select syllabus
            </Typography>
          </Grid>
          <Grid item xs={12} xl={10}>
            <SearchSyllabus
              program={program}
              loading={isLoading}
              handleSearch={handleSearch}
            />
          </Grid>
        </Grid>
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
          sx={{ justifyContent: "flex-end", marginRight: 2.5 }}
        >
          <Button
            variant="text"
            sx={{
              color: "#E74A3B",
              textDecoration: "underline",
              maxHeight: 27,
            }}
            onClick={handleCancle}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ maxHeight: 27, background: "#2D3748" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
