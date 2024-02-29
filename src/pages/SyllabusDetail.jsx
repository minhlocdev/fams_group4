import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import SyllabusTab from "../components/Syllabus/syllabusTab";
import OutlineTabContent from "../components/Syllabus/OutlineTabContent";
import { Box, Typography, Divider, Menu, MenuItem, ListItemIcon, ListItemText, Chip } from "@mui/material";
import { ThreeDotIcon, CreateIcon } from '../assets/icon'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import General from "../components/Syllabus/General";
import Other from "../components/Syllabus/Other";
export default function SyllabusDetail() {
  const [activeTab, setActiveTab] = useState(1);
  const [status, setStatus] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleStatus = () => {
    setStatus(!status);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <General />;
      case 1:
        return <OutlineTabContent />;
      case 2:
        return <Other />;
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      <Box>
        <Box sx={{ paddingLeft: '10px' }}>
          <Typography variant="h4" sx={{ color: '#2D3748' }}>
            Syllabus
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3" sx={{ color: '#2D3748' }}>C# Programing Language <Chip label={status ? 'Active' : 'Inactive'} sx={{ backgroundColor: '#2D3748', color: 'whitesmoke', fontWeight: 'bold' }} /></Typography>
            <Typography onClick={handleClick} ><ThreeDotIcon /></Typography>
            <Menu anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                '& .MuiMenu-paper': {
                  borderRadius: '10px',
                }
              }}
            >
              <MenuItem autoFocus='false'>
                <ListItemText>Manage</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText>Edit Syllabus</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopyIcon sx={{ color: "#2D3748" }} />
                </ListItemIcon>
                <ListItemText>Duplicate Syllabus</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleStatus}>
                <ListItemIcon>
                  <VisibilityOffIcon sx={{ color: "#2D3748" }} />
                </ListItemIcon>
                <ListItemText>De-activate Syllabus</ListItemText>
              </MenuItem>
              <MenuItem sx={{ color: 'grey' }}>
                <ListItemIcon>
                  <DeleteForeverIcon sx={{ color: 'grey' }} />
                </ListItemIcon>
                <ListItemText>Delete Syllabus</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h6" sx={{ color: '#2D3748' }}>
            NPL v4.0
          </Typography>
        </Box>
        <Divider sx={{ borderWidth: '2px', borderColor: '#2D3748', }} />
        <Box sx={{ paddingLeft: '10px' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Typography variant="h4"> 8 </Typography> days (68 hours)
          </Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
            Modified on 14/02/2024 by  <Typography sx={{ fontWeight: 'bolder' }}> Warrior Tran </Typography>
          </Typography>
          <SyllabusTab activeTab={activeTab} handleTabClicks={handleTabClick} />
          {renderTabContent()}
        </Box>
      </Box>

    </AppContainer>
  );
}
