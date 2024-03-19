import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { InfoTooltip } from "../../shared/lib/CustomMUI";
import UpdateUser from "../UpdateUser";
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  usePutUserMutation,
} from "../../../services/queries/userQuery";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_USER_KEY } from "../../../constants/query";
import ToastEmitter from "../../shared/lib/ToastEmitter";

export default function PopupMenu({ item }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [id, setId] = useState(null);
  const { data, isSuccess } = useGetUserByIdQuery(id);
  const [update, isUpdate] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUpdate = () => {
    isUpdate(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOpenModal = () => {
    setOpen(true);
  };
  const handleUpdate = () => {
    setId(item.id);
    isUpdate(true);
  };

  const updateUser = usePutUserMutation();
  const handleChangeRole = (role) => {
    const { id, name, email, dateOfBirth, phone, gender, status } = item;
    updateUser.mutate(
      {
        id,
        name,
        email,
        dateOfBirth,
        phone,
        gender,
        status,
        permissionId: role,
      },
      {
        onSuccess: () => {
          ToastEmitter.success("Change role successfully!!!");
          queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
        },
      }
    );
  };
  const deleteUser = useDeleteUserMutation();
  const handleDeleteUser = () => {
    deleteUser.mutate(item.id, {
      onSuccess: () => {
        ToastEmitter.success("Delete user successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
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
        <MenuItem onClick={handleUpdate}>
          <ListItemIcon>
            <CreateOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Edit User</Typography>
        </MenuItem>
        <InfoTooltip
          title={
            <>
              <MenuItem onClick={() => handleChangeRole("Super Admin")}>
                Super Admin
              </MenuItem>
              <MenuItem onClick={() => handleChangeRole("Class Admin")}>
                Class Admin
              </MenuItem>
              <MenuItem onClick={() => handleChangeRole("Trainer")}>
                Trainer
              </MenuItem>
            </>
          }
        >
          <MenuItem>
            {" "}
            <ListItemIcon>
              <PermIdentityIcon fontSize="small" />
            </ListItemIcon>
            <Typography sx={{ paddingRight: 5 }} variant="inherit">
              Change role
            </Typography>
            <ListItemIcon sx={{ marginLeft: "auto" }}>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem>
        </InfoTooltip>
        <MenuItem
          onClick={() => {
            toggleVisibility();
            handleClose();
          }}
        >
          <Typography variant="inherit">
            {isVisible ? (
              <>
                <ListItemIcon>
                  <VisibilityIcon fontSize="small" />
                </ListItemIcon>{" "}
                Activate user
              </>
            ) : (
              <>
                <ListItemIcon>
                  <VisibilityOffIcon fontSize="small" />
                </ListItemIcon>{" "}
                De-activate user
              </>
            )}
          </Typography>
        </MenuItem>
        <MenuItem
          style={{ color: "gray" }}
          onClick={() => {
            handleClickOpenModal();
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteForeverOutlinedIcon
              fontSize="small"
              style={{ color: "gray" }}
            />
          </ListItemIcon>
          <Typography variant="inherit">Delete User</Typography>
        </MenuItem>
      </Menu>
      {isSuccess && (
        <UpdateUser
          isOpen={update}
          handleClose={handleCloseUpdate}
          item={data}
        />
      )}
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
              {"Delete user"}
            </Typography>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Do you really want to delete {item.name}? This user cannot be
            restored.
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
              onClick={() => handleDeleteUser()}
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
