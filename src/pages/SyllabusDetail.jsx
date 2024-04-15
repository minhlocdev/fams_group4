import React from "react";
import {
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import { ThreeDotIcon, CreateIcon } from "../assets/icon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SyllabusWrapper from "../context/SyllabusWrapper";
import SyllabusDetailContent from "../components/Syllabus/Detail/SyllabusDetailContent";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteSyllabusMutation,
  useDuplicateSyllabusMutation,
  useGetSyllabusByIdQuery,
  usePutSyllabusStatus,
} from "../services/queries/syllabusQuery";
import { QUERY_SYLLABUS_KEY } from "../constants/query";
import ToastEmitter from "../components/shared/lib/ToastEmitter";
import queryClient from "../services/queries/queryClient";
import theme from "../assets/theme";
import ProtectedButton from "../components/shared/protected/ProtectedButton";
export default function SyllabusDetail() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { code } = useParams();
  const { data, error, isError } = useGetSyllabusByIdQuery(code);
  const changeSyllabusStatus = usePutSyllabusStatus(Number(code));
  const navigate = useNavigate();
  const duplicateSyllabus = useDuplicateSyllabusMutation();
  const handleDuplicateSyllabus = () => {
    duplicateSyllabus.mutate(code, {
      onSuccess: () => {
        ToastEmitter.success("Duplicate Syllabus successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_SYLLABUS_KEY] });
      },
    });
  };
  const deleteSyllabus = useDeleteSyllabusMutation();
  const handleDeleteSyllabus = () => {
    deleteSyllabus.mutate(code, {
      onSuccess: () => {
        ToastEmitter.success("Delete Syllabus successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_SYLLABUS_KEY] });
        navigate("/syllabus");
      },
    });
  };
  const open = Boolean(anchorEl);
  const handleStatus = () => {
    if (data?.publishStatus === 1) {
      changeSyllabusStatus.mutate(
        { id: code, status: 0 },
        {
          onSuccess: () => {
            queryClient.resetQueries({
              queryKey: [QUERY_SYLLABUS_KEY, "id:" + code],
            });
            ToastEmitter.success("Change status successfully!!!");
          },
          onError: () => {
            ToastEmitter.error("Change Status failed!!");
          },
        }
      );
    }
    if (data?.publishStatus === 0) {
      changeSyllabusStatus.mutate(
        { id: code, status: 1 },
        {
          onSuccess: () => {
            ToastEmitter.success("Change status successfully!!!");
            queryClient.resetQueries({
              queryKey: [QUERY_SYLLABUS_KEY, "id:" + code],
            });
          },
          onError: () => {
            ToastEmitter.error("Change Status failed!!");
          },
        }
      );
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (isError) {
    const errorString = error?.response?.data;
    const startIndex = errorString.indexOf("Message = ") + "Message = ".length;
    const endIndex = errorString.indexOf("}", startIndex);

    // Extract the message
    const message = errorString.substring(startIndex, endIndex).trim();
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "35px",
        }}
      >
        {message}
      </div>
    );
  }
  return (
    <SyllabusWrapper>
      <Box>
        <Box sx={{ paddingLeft: { xs: "0px", lg: "10px" } }} marginTop={10}>
          <Typography variant="h4" fontWeight={600} color={theme.primary}>
            Syllabus
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: { xs: "90%", lg: "100%" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#2D3748",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "5px",
                fontSize: { xs: "40px", lg: "48px" },
              }}
            >
              {data?.syllabusName}{" "}
              <Chip
                label={data?.publishStatus === 1 ? "Active" : "Inactive"}
                sx={{
                  backgroundColor: "#2D3748",
                  color: "whitesmoke",
                  fontWeight: "bold",
                }}
              />
            </Typography>
            <Typography onClick={handleClick}>
              <ThreeDotIcon />
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                "& .MuiMenu-paper": {
                  borderRadius: "10px",
                },
              }}
            >
              <MenuItem autoFocus={false}>
                <ListItemText>Manage</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <Link
                  to={`/syllabus/edit/${code}`}
                  style={{ color: "#545454" }}
                >
                  <ListItemText>Edit Syllabus</ListItemText>
                </Link>
              </MenuItem>
              <MenuItem>
                <ProtectedButton
                  onClick={handleDuplicateSyllabus}
                  permissionRequired={"create"}
                  pathName={"syllabus"}
                >
                  <ListItemIcon>
                    <ContentCopyIcon sx={{ color: "#2D3748" }} />
                  </ListItemIcon>
                  <ListItemText>Duplicate Syllabus</ListItemText>
                </ProtectedButton>
              </MenuItem>
              <MenuItem>
                <ProtectedButton
                  onClick={handleStatus}
                  permissionRequired={"change status"}
                  pathName={"syllabus"}
                >
                  <ListItemIcon>
                    <VisibilityOffIcon sx={{ color: "#2D3748" }} />
                  </ListItemIcon>
                  <ListItemText>
                    {data?.publishStatus === 1
                      ? "De-active syllabus"
                      : "Active syllabus"}
                  </ListItemText>
                </ProtectedButton>
              </MenuItem>
              <MenuItem sx={{ color: "grey" }}>
                <ProtectedButton
                  onClick={() => handleDeleteSyllabus()}
                  permissionRequired={"delete"}
                  pathName={"syllabus"}
                >
                  <ListItemIcon>
                    <DeleteForeverIcon sx={{ color: "grey" }} />
                  </ListItemIcon>
                  <ListItemText>Delete Syllabus</ListItemText>
                </ProtectedButton>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#2D3748",
              fontSize: { xs: "10px", sm: "12px", md: "15px", lg: "20px" },
            }}
          >
            {data?.syllabusCode} Version {data?.version}
          </Typography>
        </Box>
        <Divider sx={{ borderWidth: "2px", borderColor: "#2D3748" }} />
        <Box sx={{ paddingLeft: "10px", paddingTop: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "10px",
              fontSize: { xs: "10px", sm: "12px", md: "15px", lg: "20px" },
            }}
          >
            Modified on {data?.modifiedDate} by {data?.modifiedBy}{" "}
          </Box>
          <SyllabusDetailContent SyllabusID={code} data={data} />
        </Box>
      </Box>
    </SyllabusWrapper>
  );
}
