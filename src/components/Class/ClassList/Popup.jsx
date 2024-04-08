import React, { useState } from "react";
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
} from "../../../services/queries/classQuery";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_CLASS_KEY } from "../../../constants/query";
import ToastEmitter from "../../shared/lib/ToastEmitter";
import { useNavigate } from "react-router-dom";
import SessionStorageUtil from "../../../utils/SessionStorageUtil";

export default function Popup({ item }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const { data, isSuccess } = useGetClassByIdQuery(id);
  if (isSuccess) {
    SessionStorageUtil.setItem(QUERY_CLASS_KEY, data);
    navigate(`/class/edit/${item.id}`);
  }
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
  const deleteClass = useDeleteClassMutation();
  const handleDeleteClass = () => {
    deleteClass.mutate(item.id, {
      onSuccess: () => {
        ToastEmitter.update(
          "Delete class successfully!!",
          "loading",
          "success"
        );
        queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
        handleCloseModal();
        handleClose();
      },
      onError: (e) => {
        ToastEmitter.update(
          "Delete class failed!! " + e.response.data,
          "loading",
          "error"
        );
        handleCloseModal();
        handleClose();
      },
    });
  };
  if (deleteClass.isPending) {
    ToastEmitter.loading("...Loading", "loading");
  }

  const duplicateClass = useDuplicateClassMutation();
  const handleDuplicateClass = () => {
    duplicateClass.mutate(item.id, {
      onSuccess: () => {
        ToastEmitter.update(
          "Duplicate Class successfully!!!",
          "loading",
          "success"
        );
        queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
      },
      onError: (e) => {
        ToastEmitter.update(
          "Duplicate Class failed!! " + e.response.data,
          "loading",
          "error"
        );
      },
    });
  };
  if (duplicateClass.isPending) {
    ToastEmitter.loading("...Loading", "loading");
  }
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
        <MenuItem onClick={() => setId(item.id)}>
          <ListItemIcon>
            <CreateOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Edit class</Typography>
        </MenuItem>

        <MenuItem onClick={() => handleDuplicateClass()}>
          <ListItemIcon>
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
