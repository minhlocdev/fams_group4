import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UpdateUser from "../UpdateUser";
import {
  useGetUserByIdQuery,
  usePutUserMutation,
} from "../../../services/queries/userQuery";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_USER_KEY } from "../../../constants/query";
import ToastEmitter from "../../shared/lib/ToastEmitter";
import ProtectedButton from "../../shared/protected/ProtectedButton";

export default function PopupMenu({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElRole, setAnchorElRole] = useState(null);
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
  const handleClickRole = (event) => {
    setAnchorElRole(event.currentTarget);
  };

  const handleCloseRole = () => {
    setAnchorElRole(null);
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
        rolename: role,
      },
      {
        onSuccess: () => {
          ToastEmitter.success("Change role successfully!!!");
          queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
        },
      }
    );
  };

  const handleChangeStatus = (status) => {
    const { id, name, email, dateOfBirth, phone, gender, roleName } = item;
    updateUser.mutate(
      {
        id,
        name,
        email,
        dateOfBirth,
        phone,
        gender,
        status,
        rolename: roleName,
      },
      {
        onSuccess: () => {
          ToastEmitter.success(
            status ? "Activate successfully!!!" : "De-activate successfully!!!"
          );
          queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
          handleClose();
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
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ProtectedButton
            onClick={handleUpdate}
            permissionRequired={"edit"}
            pathName={"user"}
          >
            <ListItemIcon children={<CreateOutlinedIcon fontSize="small" />} />
            <Typography variant="inherit">Edit User</Typography>
          </ProtectedButton>
        </MenuItem>
        <MenuItem onClick={handleClickRole}>
          <ListItemIcon children={<PermIdentityIcon fontSize="small" />} />
          <Typography sx={{ paddingRight: 5 }} variant="inherit">
            Change role
          </Typography>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={() => handleChangeStatus(!item.status)}
            permissionRequired={"change status"}
            pathName={"user"}
          >
            {!item.status ? (
              <>
                <ListItemIcon children={<VisibilityIcon fontSize="small" />} />
                Activate user
              </>
            ) : (
              <>
                <ListItemIcon
                  children={<VisibilityOffIcon fontSize="small" />}
                />
                De-activate user
              </>
            )}
          </ProtectedButton>
        </MenuItem>
      </Menu>
      {isSuccess && (
        <UpdateUser
          isOpen={update}
          handleClose={handleCloseUpdate}
          item={data}
        />
      )}
      <Menu
        anchorEl={anchorElRole}
        open={Boolean(anchorElRole)}
        onClose={handleCloseRole}
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
            onClick={() => handleChangeRole("Super Admin")}
            permissionRequired={"change role"}
            pathName={"user"}
          >
            <ListItemIcon children={<PermIdentityIcon fontSize="small" />} />
            Super Admin
          </ProtectedButton>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={() => handleChangeRole("Class Admin")}
            permissionRequired={"change role"}
            pathName={"user"}
          >
            <ListItemIcon children={<PermIdentityIcon fontSize="small" />} />
            Class Admin
          </ProtectedButton>
        </MenuItem>
        <MenuItem>
          <ProtectedButton
            onClick={() => handleChangeRole("Trainer")}
            permissionRequired={"change role"}
            pathName={"user"}
          >
            <ListItemIcon children={<PermIdentityIcon fontSize="small" />} />
            Trainer
          </ProtectedButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
