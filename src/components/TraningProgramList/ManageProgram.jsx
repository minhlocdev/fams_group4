import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Typography, Divider, Box } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import queryClient from "../../services/queries/queryClient";
import { QUERY_PROGRAM_KEY } from "../../constants/query";
import ToastEmitter from "../shared/lib/ToastEmitter";
import {
  useDeleteProgramMutation,
  usePostDuplicateTrainingMutation,
  usePutTrainingStatusMutation,
} from "../../services/queries/trainingQuery";
import { Link } from "react-router-dom";
import ProtectedButton from "../shared/protected/ProtectedButton";

export default function ManageProgram({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(item.status === 1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClickopen = () => {
    setOpen(true);
  };

  const { mutate: putProgramStatus } = usePutTrainingStatusMutation(item.id);
  const { mutate: postDuplicateMutation } = usePostDuplicateTrainingMutation();
  const { mutate: deleteProgramMutation } = useDeleteProgramMutation();
  const handleDeleteProgram = () => {
    deleteProgramMutation(item.trainingProgramCode, {
      onSuccess: () => {
        ToastEmitter.success("Delete Program successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_PROGRAM_KEY] });
      },
      onError: (error) => {
        ToastEmitter.error(error.response.data);
      },
    });
  };

  const handleDuplicateProgram = () => {
    postDuplicateMutation(item.trainingProgramCode, {
      onSuccess: () => {
        ToastEmitter.success("Duplicate Program successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_PROGRAM_KEY] });
      },
      onError: (error) => {
        ToastEmitter.error(error.response.data);
      },
    });
  };
  const handleChangeStatus = () => {
    const sta = item.status === 1 ? -1 : 1;
    putProgramStatus(
      { id: item.trainingProgramCode, status: sta },
      {
        onSuccess: () => {
          setIsVisible(!isVisible);
          ToastEmitter.success("Change status successfully!!!");
          queryClient.invalidateQueries({ queryKey: [QUERY_PROGRAM_KEY] });
        },
        onError: (error) => {
          ToastEmitter.error(error.response.data);
        },
      }
    );
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id="menu-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box>
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
          <Link to={`/training/edit/${item.trainingProgramCode}`}>
            <MenuItem sx={{ color: "#2C5282" }}>
              <ListItemIcon>
                <CreateOutlinedIcon sx={{ color: "#285D9A" }} />
              </ListItemIcon>
              Edit program
            </MenuItem>
          </Link>

          <MenuItem sx={{ color: "#2C5282" }}>
            <ProtectedButton
              onClick={() => handleDuplicateProgram()}
              permissionRequired={"create"}
              pathName={"training"}
            >
              <ListItemIcon>
                <ContentCopyOutlinedIcon sx={{ color: "#285D9A" }} />
              </ListItemIcon>
              Duplicate program
            </ProtectedButton>
          </MenuItem>

          <MenuItem>
            <Typography variant="inherit">
              <ProtectedButton
                onClick={handleChangeStatus}
                permissionRequired={"change status"}
                pathName={"training"}
              >
                {!isVisible ? (
                  <>
                    <ListItemIcon>
                      <VisibilityIcon fontSize="small" />
                    </ListItemIcon>{" "}
                    Activate Program
                  </>
                ) : (
                  <>
                    <ListItemIcon>
                      <VisibilityOffIcon fontSize="small" />
                    </ListItemIcon>{" "}
                    De-activate Program
                  </>
                )}
              </ProtectedButton>
            </Typography>
          </MenuItem>

          <MenuItem>
            <ProtectedButton
              onClick={handleClickopen}
              permissionRequired={"delete"}
              pathName={"training"}
            >
              <ListItemIcon>
                <DeleteForeverOutlinedIcon
                  fontSize="small"
                  style={{ color: "gray" }}
                />
              </ListItemIcon>
              <Typography variant="inherit">Delete Program</Typography>
            </ProtectedButton>
          </MenuItem>
        </Box>
      </Popover>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <WarningAmberOutlinedIcon
              style={{ color: "red", marginRight: "8px" }}
            />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              {"Delete Program"}
            </Typography>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Do you really want to delete{" "}
            {item && item.programName ? item.programName : "this program"}? This
            program cannot be restored.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "auto",
            }}
          >
            <Button
              onClick={handleCloseModal}
              color="secondary"
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
                mt: 2,
                marginRight: "10px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteProgram()}
              style={{
                backgroundColor: "#2D3748",
                color: "#fff",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
