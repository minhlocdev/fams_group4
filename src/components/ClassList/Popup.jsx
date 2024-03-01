import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Typography } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


const ITEM_HEIGHT = 48;

export default function Popup() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <CreateOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Edit class</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCopyOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Duplicate class</Typography>
                </MenuItem>
                <MenuItem style={{ color: 'gray' }}>
                    <ListItemIcon>
                        <DeleteForeverOutlinedIcon fontSize="small" style={{ color: 'gray' }} />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete class</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}