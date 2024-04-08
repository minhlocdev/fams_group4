import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InfoTooltip } from "../../shared/lib/CustomMUI";
import UpdateUser from "../UpdateUser";
import {
  useGetUserByIdQuery,
  usePutUserMutation,
} from "../../../services/queries/userQuery";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_USER_KEY } from "../../../constants/query";
import ToastEmitter from "../../shared/lib/ToastEmitter";

export default function PopupMenu({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
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
        <MenuItem onClick={handleUpdate}>
          <ListItemIcon children={<CreateOutlinedIcon fontSize="small" />} />
          <Typography variant="inherit">Edit User</Typography>
        </MenuItem>
        <InfoTooltip
          title={
            <>
              <MenuItem onClick={() => handleChangeRole("Super Admin")}>
                <ListItemIcon
                  children={<PermIdentityIcon fontSize="small" />}
                />
                Super Admin
              </MenuItem>
              <MenuItem onClick={() => handleChangeRole("Class Admin")}>
                <ListItemIcon
                  children={<PermIdentityIcon fontSize="small" />}
                />
                Class Admin
              </MenuItem>
              <MenuItem onClick={() => handleChangeRole("Trainer")}>
                <ListItemIcon
                  children={<PermIdentityIcon fontSize="small" />}
                />
                Trainer
              </MenuItem>
            </>
          }
        >
          <MenuItem>
            <ListItemIcon children={<PermIdentityIcon fontSize="small" />} />
            <Typography sx={{ paddingRight: 5 }} variant="inherit">
              Change role
            </Typography>
            <ListItemIcon children={<ArrowForwardIosIcon fontSize="small" />} />
          </MenuItem>
        </InfoTooltip>
        <MenuItem onClick={() => handleChangeStatus(!item.status)}>
          {!item.status ? (
            <>
              <ListItemIcon children={<VisibilityIcon fontSize="small" />} />
              Activate user
            </>
          ) : (
            <>
              <ListItemIcon children={<VisibilityOffIcon fontSize="small" />} />
              De-activate user
            </>
          )}
        </MenuItem>
      </Menu>
      {isSuccess && (
        <UpdateUser
          isOpen={update}
          handleClose={handleCloseUpdate}
          item={data}
        />
      )}
    </div>
  );
}
