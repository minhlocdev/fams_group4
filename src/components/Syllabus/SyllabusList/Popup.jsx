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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  useDeleteSyllabusMutation,
  useDuplicateSyllabusMutation,
} from "../../../services/queries/syllabusQuery";
import ToastEmitter from "../../shared/lib/ToastEmitter";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_SYLLABUS_KEY } from "../../../constants/query";

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

        <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
          <ListItemIcon>
            <AddCircleOutlineOutlinedIcon sx={{ color: "#285D9A" }} />
          </ListItemIcon>
          Add training program
        </MenuItem>
        <MenuItem sx={{ color: "#2C5282" }} onClick={handleClose}>
          <ListItemIcon>
            <CreateOutlinedIcon sx={{ color: "#285D9A" }} />
          </ListItemIcon>
          Edit syllabus
        </MenuItem>
        <MenuItem sx={{ color: "#2C5282" }} onClick={handleDuplicateSyllabus}>
          <ListItemIcon>
            <ContentCopyOutlinedIcon sx={{ color: "#285D9A" }} />
          </ListItemIcon>
          Duplicate syllabus
        </MenuItem>
        <MenuItem
          sx={{ color: "#2C5282" }}
          onClick={() => {
            handleClickOpenModal();
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteForeverOutlinedIcon sx={{ color: "#285D9A" }} />
          </ListItemIcon>
          Delete syllabus
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
