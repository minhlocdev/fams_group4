import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Box, Button, Modal, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  useDeleteSyllabusMutation,
  useDuplicateSyllabusMutation,
  usePutSyllabusStatus,
} from "../../../services/queries/syllabusQuery";
import ToastEmitter from "../../shared/lib/ToastEmitter";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_SYLLABUS_KEY } from "../../../constants/query";
import ProtectedButton from "../../shared/protected/ProtectedButton";
import { VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Popup({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const deleteSyllabus = useDeleteSyllabusMutation();
  const handleDeleteSyllabus = () => {
    deleteSyllabus.mutate(item.id, {
      onSuccess: () => {
        ToastEmitter.success("Delete Syllabus successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_SYLLABUS_KEY] });
      },
      onError: (error) => {
        ToastEmitter.error(error.response.data);
      },
    });
  };

  const duplicateSyllabus = useDuplicateSyllabusMutation();
  const handleDuplicateSyllabus = () => {
    duplicateSyllabus.mutate(item.id, {
      onSuccess: () => {
        ToastEmitter.success("Duplicate Syllabus successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_SYLLABUS_KEY] });
      },
    });
  };

  const changeSyllabusStatus = usePutSyllabusStatus();
  const handleStatus = () => {
    if (item.publishStatus === 1) {
      changeSyllabusStatus.mutate(
        { id: item.id, status: 0 },
        {
          onSuccess: () => {
            queryClient.resetQueries({
              queryKey: [QUERY_SYLLABUS_KEY],
            });
            ToastEmitter.success("Change status successfully!!!");
          },
          onError: (error) => {
            ToastEmitter.error(error.response.data);
          },
        }
      );
    }
    if (item.publishStatus === 0) {
      changeSyllabusStatus.mutate(
        { id: item.id, status: 1 },
        {
          onSuccess: () => {
            ToastEmitter.success("Change status successfully!!!");
            queryClient.resetQueries({
              queryKey: [QUERY_SYLLABUS_KEY],
            });
          },
          onError: (error) => {
            ToastEmitter.error(error.response.data);
          },
        }
      );
    }
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
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
        <MenuItem>
          <Link to={`/syllabus/edit/${item.id}`}>
            <ListItemIcon>
              <CreateOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Edit syllabus
          </Link>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={handleDuplicateSyllabus}
            permissionRequired={"create"}
            pathName={"syllabus"}
          >
            <ListItemIcon>
              <ContentCopyOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Duplicate syllabus
          </ProtectedButton>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={handleStatus}
            permissionRequired={"change status"}
            pathName={"syllabus"}
          >
            <ListItemIcon>
              <VisibilityOff fontSize="small" />
            </ListItemIcon>
            {item.publishStatus === 1
              ? "De-active syllabus"
              : "Active syllabus"}
          </ProtectedButton>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <ProtectedButton
            onClick={handleClickOpenModal}
            permissionRequired={"delete"}
            pathName={"syllabus"}
          >
            <ListItemIcon>
              <DeleteForeverOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Delete syllabus
          </ProtectedButton>
        </MenuItem>
      </Menu>
      <Modal
        open={open}
        onClose={handleClose}
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
              {"Delete Syllabus"}
            </Typography>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Do you really want to delete {item.syllabusName}? This Syllabus
            cannot be restored.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "auto",
            }}
          >
            <Button
              onClick={handleModalClose}
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
              onClick={() => handleDeleteSyllabus()}
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
