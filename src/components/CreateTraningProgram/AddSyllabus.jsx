import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SyllabusCard from "../Syllabus/Detail/SyllabusCards";
import SearchSyllabus from "./SearchSyllabus";
import dayjs from "dayjs";
import { useGetAllSyllabusActiveQuery } from "../../services/queries/syllabusQuery";
import AuthContext from "../../utils/authUtil";
import { usePostTrainingMutation } from "../../services/queries/trainingQuery";
import ToastEmitter from "../shared/lib/ToastEmitter";
import { useNavigate } from "react-router-dom";
import theme from "../../assets/theme";
import { TrainingStatus } from "../../constants/PublishStatusEnum";
const statusColors = {
  Active: theme.primary,
  Inactive: "#B9B9B9",
  Draft: "#285D9A",
};

export default function AddSyllabus({ TraningProgramName, onClickBack }) {
  const { loginUser } = useContext(AuthContext);
  const [newTrainingProgram, setNewTrainingProgram] = useState({
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
  const handleChange = (field, value) => {
    setNewTrainingProgram({ ...newTrainingProgram, [field]: value });
  };
  const [program, setProgram] = useState([]);
  const [SelectedListSyllabus, setSelectedListSyllabus] = useState([]);
  const { data, isLoading, isSuccess } = useGetAllSyllabusActiveQuery();
  useEffect(() => {
    setProgram(data);
  }, [data, isSuccess]);

  const [syllabusDTOs, setSyllabusDTOs] = useState([]);

  useEffect(() => {
    handleChange("syllabusDTOs", syllabusDTOs); // eslint-disable-next-line
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
  const { mutate: postProgram } = usePostTrainingMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    postProgram(newTrainingProgram, {
      onSuccess: (res) => {
        ToastEmitter.success("Create trianing program successfully!!");
        navigate(`/training/detail/${res.data.trainingProgramCode}`);
      },
      onError: () => {
        ToastEmitter.error("Create new training program failed!!");
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
        }}
      >
        <Typography
          variant={"h4"}
          sx={{
            wordSpacing: "5px",
            letterSpacing: "5px",
            color: "#fff",
          }}
        >
          Training program
        </Typography>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography
              sx={{ color: "white", pt: 1, pb: 1, fontWeight: { md: 600 } }}
              variant="h4"
            >
              {newTrainingProgram.name}
            </Typography>
            <Chip
              variant="outlined"
              label={TrainingStatus[newTrainingProgram?.status]}
              sx={{
                background:
                  statusColors[TrainingStatus[newTrainingProgram?.status]],
                color: "white",
              }}
            />
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
            component={Link}
            href="/training"
            sx={{
              color: "red",
              textDecoration: "underline",
              fontWeight: "bold",
              padding: "5px 0px 5px 15px",
            }}
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
