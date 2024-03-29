import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  useDeleteClassMutation,
  useDuplicateClassMutation,
  useGetClassByIdQuery,
  usePutClassMutation,
} from "../../services/queries/classQuery";
import queryClient from "../../services/queries/queryClient";
import { QUERY_CLASS_KEY } from "../../constants/query";
import ToastEmitter from "../shared/lib/ToastEmitter";

export default function Popup({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const { data, isSuccess } = useGetClassByIdQuery(id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const notification = {
    success: function ({ message }) {
      console.log(message);
    },
    error: function ({ message, description }) {
      console.error(message, description);
    },
  };

  const deleteClass = useDeleteClassMutation();
  const handleDeleteClass = () => {
    deleteClass.mutate(item.id, {
      onSuccess: () => {
        ToastEmitter.success("Delete class successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
      },
    });
  };

  const duplicateClass = useDuplicateClassMutation();
  const handleDuplicateClass = () => {
    duplicateClass.mutate(item.id, {
      onSuccess: () => {
        ToastEmitter.success("Duplicate Class successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
      },
    });
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
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickOpenModal}>
          <ListItemIcon>
            <CreateOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Edit class</Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon onClick={handleDuplicateClass}>
            <ContentCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Duplicate class</Typography>
        </MenuItem>

        <MenuItem style={{ color: "gray" }} onClick={handleClickOpenModal}>
          <ListItemIcon>
            <DeleteForeverOutlinedIcon
              fontSize="small"
              style={{ color: "gray" }}
            />
          </ListItemIcon>
          <Typography variant="inherit">Delete class </Typography>
        </MenuItem>
      </Menu>

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
              {"Delete Class"}
            </Typography>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Do you really want to delete{" "}
            {item && item.classNames ? item.classNames : "this class"}? This
            class cannot be restored.
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
              onClick={() => handleDeleteClass()}
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
