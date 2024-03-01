import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ITEM_HEIGHT = 48;

export default function PopupMenu() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [openPopover, setOpenPopover] = useState(false);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const OpenClickPopover=() =>{
    setOpenPopover(!openPopover);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
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
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem
              >
                <ListItemIcon>
                  <CreateOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Edit User</Typography>
              </MenuItem>
              <div style={{ display: 'flex' }}>
      <div>
        <MenuItem onClick={OpenClickPopover}>
          <ListItemIcon>
            <PermIdentityIcon fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ paddingRight: 5 }} variant="inherit">Change role</Typography>
          <ListItemIcon>
            <ArrowForwardIosIcon fontSize="small"/>
          </ListItemIcon>
          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            style={{ marginTop: '45px',marginLeft:'-205px' }}
          >
            {/* Nội dung của menu */}
            <MenuItem onClick={handleClosePopover}>Supper Admin</MenuItem>
            <MenuItem onClick={handleClosePopover}>Class Admin</MenuItem>
            <MenuItem onClick={handleClosePopover}>Trainer</MenuItem>
          </Popover>
        </MenuItem>
      </div>
      </div>
              <MenuItem onClick={toggleVisibility}>
                <Typography variant="inherit">{isVisible ? (
                  <><ListItemIcon><VisibilityIcon fontSize='small' /></ListItemIcon> Activate user</>
                ) : (
                  <><ListItemIcon><VisibilityOffIcon fontSize="small" /></ListItemIcon> De-activate user</>
                )}</Typography>
              </MenuItem>
              <MenuItem style={{ color: 'gray' }} onClick={handleClickOpen}>
                <ListItemIcon>
                  <DeleteForeverOutlinedIcon fontSize="small" style={{ color: 'gray' }} />
                </ListItemIcon>
                <Typography variant="inherit">Delete User</Typography>
              </MenuItem>
                  </Menu>
      
    </div>
  );
}