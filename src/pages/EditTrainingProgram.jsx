import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTrainingProgramByIdQuery,
  usePutTrainingMutation,
} from "../services/queries/trainingQuery";
import { useGetAllSyllabusActiveQuery } from "../services/queries/syllabusQuery";
import SyllabusCard from "../components/Syllabus/Detail/SyllabusCards";
import SearchSyllabus from "../components/CreateTraningProgram/SearchSyllabus";
import dayjs from "dayjs";
import ContentEditable from "../components/shared/lib/ContentEditable";
import AuthContext from "../utils/authUtil";
import ToastEmitter from "../components/shared/lib/ToastEmitter";
import { QUERY_PROGRAM_KEY } from "../constants/query";
import queryClient from "../services/queries/queryClient";
import TrainigNotFound from "../components/TrainingProgramDetail/TrainigNotFound";

export default function EditTrainingProgram() {
  const formatDate = (dateString) => {
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Giảm đi 1 vì tháng bắt đầu từ 0
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };
  const { loginUser } = useContext(AuthContext);
  const { code } = useParams();
  useEffect(() => {
    queryClient.resetQueries([QUERY_PROGRAM_KEY, code]);
  }, [code]);

  const {
    data: oldTraining,
    isSuccess: isSucOldTraining,
    isLoading: loadingData,
    isError,
  } = useGetTrainingProgramByIdQuery(code);
  const {
    data: Syllabuses,
    isLoading,
    isSuccess,
  } = useGetAllSyllabusActiveQuery();
  const [program, setProgram] = useState([]);
  const [SelectedListSyllabus, setSelectedListSyllabus] = useState([]);
  const [newTrainingProgram, setNewTrainingProgram] = useState({});
  const handleChange = (field, value) => {
    setNewTrainingProgram({ ...newTrainingProgram, [field]: value });
  };
  const setup = (
    isSuccess,
    isSucOldTraining,
    Syllabuses,
    oldTraining,
    loginUser
  ) => {
    if (
      isSuccess &&
      isSucOldTraining &&
      Syllabuses &&
      oldTraining != null &&
      loginUser
    ) {
      setSelectedListSyllabus(oldTraining?.outline);
      const selectedIds = oldTraining?.outline.map((syl) => syl.id);
      const filteredProgram = Syllabuses.filter(
        (syl) =>
          !selectedIds.includes(syl.id) &&
          syl.publishStatus !== 0 &&
          syl.publishStatus !== -1
      );
      setProgram(filteredProgram);
      setSyllabusDTOs(
        oldTraining?.outline.map((line) => ({
          syllabusId: line.id,
          sequence: line.id,
        }))
      );
      setNewTrainingProgram({
        trainingProgramCode: oldTraining?.trainingProgramCode,
        name: oldTraining?.name,
        userId: loginUser.id,
        startTime: formatDate(oldTraining?.startTime).toISOString(),
        duration: oldTraining?.durationByDay,
        topicCode: oldTraining?.topicCode,
        status: oldTraining?.status,
        trainingProgramSyllabus: [],
      });
    }
  };
  useEffect(() => {
    setup(isSuccess, isSucOldTraining, Syllabuses, oldTraining, loginUser);
    // eslint-disable-next-line
  }, [Syllabuses, isSuccess, oldTraining, isSucOldTraining, loginUser]);

  const [syllabusDTOs, setSyllabusDTOs] = useState([]);
  const [newname, setNewName] = useState();
  useEffect(() => {
    handleChange("trainingProgramSyllabus", syllabusDTOs);
    // eslint-disable-next-line
  }, [syllabusDTOs]);
  useEffect(() => {
    handleChange("name", newname);
    // eslint-disable-next-line
  }, [newname]);
  const handleSearch = (syl) => {
    setSelectedListSyllabus((prevSelectedListSyllabus) => [
      ...prevSelectedListSyllabus,
      syl,
    ]);
    setSyllabusDTOs((preSyllabusDTOs) => [
      ...preSyllabusDTOs,
      { syllabusId: syl.id, sequence: preSyllabusDTOs.length + 1 },
    ]);
    const updatedList = program?.filter((item) => item.id !== syl.id);
    setProgram(updatedList);
    handleChange("duration", newTrainingProgram.duration + syl.durationByDay);
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

    const updatedList = SelectedListSyllabus?.filter((item) => item.id !== id);
    setSelectedListSyllabus(updatedList);

    const deletedSyllabus = SelectedListSyllabus.find((item) => item.id === id);
    setProgram((prevProgram) => [...prevProgram, deletedSyllabus]);
    handleChange(
      "duration",
      newTrainingProgram.duration - deletedSyllabus.durationByDay
    );
  };
  const navigate = useNavigate();
  const { mutate: putProgram } = usePutTrainingMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    putProgram(newTrainingProgram, {
      onSuccess: (res) => {
        ToastEmitter.success("Edit successfully!!!");
        queryClient.invalidateQueries([QUERY_PROGRAM_KEY, { code }]);
        navigate(`/training/detail/${code}`);
      },
      onError: (error) => {
        ToastEmitter.error(
          "Edit training program failed || ",
          error.response?.data
        );
      },
    });
  };
  if (loadingData) {
    return (
      <Box sx={{ width: "100%", pt: 1 }}>
        <LinearProgress />
      </Box>
    );
  }
  if (isError) {
    return <TrainigNotFound />;
  }

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
            {/* <Typography sx={{ color: 'white', pt: 1, pb: 1 }} variant="h4">{newTrainingProgram.name}</Typography> */}
            <Typography
              variant={"h4"}
              sx={{
                color: "white",
                wordSpacing: "5px",
                letterSpacing: "5px",
                fontWeight: "600", // quang bi ngu
              }}
            >
              <ContentEditable
                value={newTrainingProgram?.name}
                onChange={(updatedContent) => {
                  setNewName(updatedContent);
                }}
                tooltipTitle="Enter TrainingProgram name"
              />
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
            ) : newTrainingProgram?.status === -1 ? (
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
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Modified on {dayjs(new Date().toISOString()).format("DD/MM/YYYY")} by{" "}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {loginUser?.name}{" "}
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
          <Grid item xs={12} lg={10}>
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
          <Stack></Stack>
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
      </Stack>
    </Box>
  );
}
