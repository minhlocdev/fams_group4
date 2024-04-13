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
  useChangeStatusClassMutation,
  useDeleteClassMutation,
  useDuplicateClassMutation,
  useGetClassByIdQuery,
} from "../../../services/queries/classQuery";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_CLASS_KEY } from "../../../constants/query";
import ToastEmitter from "../../shared/lib/ToastEmitter";
import { useNavigate } from "react-router-dom";
import SessionStorageUtil from "../../../utils/SessionStorageUtil";
import ProtectedButton from "../../shared/protected/ProtectedButton";
import {
  CheckCircleOutline,
  HelpOutline,
  PauseCircleFilledOutlined,
  PendingOutlined,
} from "@mui/icons-material";
export default function Popup({ item, style }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElStatus, setAnchorElStatus] = React.useState(null);
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
  const handleClickStatus = (event) => {
    setAnchorElStatus(event.currentTarget);
  };

  const handleCloseStatus = () => {
    setAnchorElStatus(null);
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
  const duplicateClass = useDuplicateClassMutation();
  const handleDuplicateClass = () => {
    duplicateClass.mutate(item.id, {
      onSuccess: (res) => {
        ToastEmitter.update(
          "Duplicate Class successfully!!!",
          "loading",
          "success"
        );
        queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
        navigate(`/class/detail/${res.data.id}`);
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

  const changeStatus = useChangeStatusClassMutation();
  const handleChangeStatus = (status) => {
    changeStatus.mutate(
      { id: item.id, status: status },
      {
        onSuccess: () => {
          ToastEmitter.update(
            "Change status successfully!!!",
            "loading",
            "success"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
          setAnchorEl(null);
        },
        onError: (e) => {
          ToastEmitter.update("Change status failed!!", "loading", "error");
        },
      }
    );
  };
  if (
    duplicateClass.isPending ||
    deleteClass.isPending ||
    changeStatus.isPending
  ) {
    ToastEmitter.loading("...Loading", "loading");
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={style}
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
        {/* Protected change status class  */}
        <MenuItem onClick={handleClickStatus}>
          <ListItemIcon children={<HelpOutline fontSize="small" />} />
          <Typography variant="inherit">Change status</Typography>
        </MenuItem>
        {/* Protected duplicate class  */}
        <MenuItem>
          <ProtectedButton
            onClick={handleDuplicateClass}
            permissionRequired={"create"}
            pathName={"class"}
          >
            <ListItemIcon>
              <ContentCopyOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Duplicate class</Typography>
          </ProtectedButton>
        </MenuItem>
        {/* Protected delete class */}
        <MenuItem>
          <ProtectedButton
            onClick={handleClickOpenModal}
            permissionRequired={"delete"}
            pathName={"class"}
          >
            <ListItemIcon>
              <DeleteForeverOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Delete class </Typography>
          </ProtectedButton>
        </MenuItem>
      </Menu>
      {/* Menu change status */}
      <Menu
        anchorEl={anchorElStatus}
        open={Boolean(anchorElStatus)}
        onClose={handleCloseStatus}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <ProtectedButton
            onClick={() => handleChangeStatus("opening")}
            permissionRequired={"change status"}
            pathName={"class"}
          >
            <ListItemIcon children={<CheckCircleOutline fontSize="small" />} />
            Opening
          </ProtectedButton>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={() => handleChangeStatus("planning")}
            permissionRequired={"change status"}
            pathName={"class"}
          >
            <ListItemIcon
              children={<PauseCircleFilledOutlined fontSize="small" />}
            />
            Planning
          </ProtectedButton>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={() => handleChangeStatus("scheduled")}
            permissionRequired={"change status"}
            pathName={"class"}
          >
            <ListItemIcon children={<PendingOutlined fontSize="small" />} />
            Scheduling
          </ProtectedButton>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={() => handleChangeStatus("completed")}
            permissionRequired={"change status"}
            pathName={"class"}
          >
            <ListItemIcon children={<CheckCircleOutline fontSize="small" />} />
            Complete
          </ProtectedButton>
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
