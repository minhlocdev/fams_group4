import React, { useEffect, useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  LinearProgress,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ErrorIcon from "@mui/icons-material/Error";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import SyllabusDay from "../components/TrainingProgramDetail/SyllabusDay";
import {
  useDeleteProgramMutation,
  useGetTrainingProgramByIdQuery,
  usePostDuplicateTrainingMutation,
  usePutTrainingStatusMutation,
} from "../services/queries/trainingQuery";
import { Link, useNavigate, useParams } from "react-router-dom";
import SyllabusWrapper from "../context/SyllabusWrapper";
import ToastEmitter from "../components/shared/lib/ToastEmitter";
import { QUERY_PROGRAM_KEY } from "../constants/query";
import queryClient from "../services/queries/queryClient";
import SyllabusCard from "../components/Syllabus/Detail/SyllabusCards";

export default function TrainingProgramDetail() {
  const { code } = useParams();

  const [openSyllabusId, setOpenSyllabusId] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const { data, isLoading, isSuccess, isError } =
    useGetTrainingProgramByIdQuery(code);
  const [status, setStatus] = useState();
  useEffect(() => {
    setStatus(data?.status);
  }, [data]);
  const { mutate: putProgramStatus, isSuccess: isSuccessPut } =
    usePutTrainingStatusMutation(code);
  const { mutate: postDuplicateMutation, isSuccess: isSuccessPost } =
    usePostDuplicateTrainingMutation();
  const { mutate: deleteProgramMutation, isSuccess: isSuccessDelete } =
    useDeleteProgramMutation();
  const navigate = useNavigate();
  const handleChangeStatus = () => {
    const sta = status === 0 ? 1 : 0;
    putProgramStatus(
      { id: code, status: sta },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_PROGRAM_KEY, code],
          });
          ToastEmitter.success("Change Status successfully!!!");
        },
        onError: () => {
          ToastEmitter.error(" Change Status failed!! ");
        },
      }
    );
    handleCloseMenu();
  };
  const handleDuplicate = (e) => {
    e.preventDefault();
    postDuplicateMutation(code, {
      onSuccess: (res) => {
        ToastEmitter.success("Duplicate successfully!!!");
        navigate(`/training/detail/${res.data.trainingProgramCode}`);
      },
      onError: () => {
        ToastEmitter.error("Duplicate failed!!");
      },
    });
    handleCloseMenu();
  };
  const handleDelete = (e) => {
    deleteProgramMutation(code, {
      onSuccess: () => {
        ToastEmitter.success("Delete successfully!!!");
        queryClient.invalidateQueries([QUERY_PROGRAM_KEY]);
        navigate(`/training/list`);
      },
      onError: () => {
        ToastEmitter.error("Delete failed!!");
      },
    });
  };
  if (isLoading) {
    return (
      <Box sx={{ width: "100%", pt: 1 }}>
        <LinearProgress />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorIcon></ErrorIcon>
        ERROR CAN NOT FIND DATA
      </Box>
    );
  }

  return (
    <SyllabusWrapper>
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
              {data?.name}
            </Typography>
            {data?.status === 1 ? (
              <Chip
                sx={{
                  background: "#2D3748",
                  color: "white",
                  borderColor: "white",
                }}
                label="Active"
                variant="outlined"
              />
            ) : data?.status === 0 ? (
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
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
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

              <MenuItem sx={{ color: "#2C5282" }} onClick={handleCloseMenu}>
                <Link to={`/training/edit/${code}`}>
                  <ListItemIcon>
                    <CreateOutlinedIcon sx={{ color: "#285D9A" }} />
                  </ListItemIcon>
                  Edit program
                </Link>
              </MenuItem>
              <MenuItem sx={{ color: "#2C5282" }} onClick={handleDuplicate}>
                <ListItemIcon>
                  <ContentCopyOutlinedIcon sx={{ color: "#285D9A" }} />
                </ListItemIcon>
                Duplicate program
              </MenuItem>
              <MenuItem sx={{ color: "#2C5282" }} onClick={handleChangeStatus}>
                {data?.status ? (
                  <>
                    <ListItemIcon>
                      <VisibilityOffOutlinedIcon sx={{ color: "#285D9A" }} />
                    </ListItemIcon>
                    De-activate program
                  </>
                ) : (
                  <>
                    <ListItemIcon>
                      <VisibilityIcon sx={{ color: "#285D9A" }} />
                    </ListItemIcon>
                    Activate program
                  </>
                )}
              </MenuItem>
              <MenuItem sx={{ color: "#8B8B8B" }} onClick={handleDelete}>
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
          {data?.durationByDay === 0 ? "..." : `${data?.durationByDay}`} day (
          {data?.durationByHour === 0 ? "..." : `${data?.durationByHour}`}{" "}
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
          Modified on {data?.createdDate} by{" "}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {data?.createdBy}{" "}
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
          {data?.outline?.map((Syllabus) => (
            <SyllabusCard
              key={Syllabus.id}
              SyllabusID={Syllabus.id}
              onClick={() =>
                setOpenSyllabusId((prevId) =>
                  prevId === Syllabus.id ? null : Syllabus.id
                )
              }
            >
              <Collapse
                in={openSyllabusId === Syllabus.id}
                timeout="auto"
                unmountOnExit
                sx={{ ml: -1.5 }}
              >
                <SyllabusDay outlineID={Syllabus.id} />
              </Collapse>
            </SyllabusCard>
          ))}
        </Box>
      </Box>
    </SyllabusWrapper>
  );
}
