import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import SyllabusTab from "../components/Syllabus/syllabusTab";
import OutlineTabContent from "../components/Syllabus/OutlineTabContent";
import {
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import { ThreeDotIcon, CreateIcon } from "../assets/icon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import General from "../components/Syllabus/General";
import Other from "../components/Syllabus/Other";
import SyllabusWrapper from "../context/SyllabusWrapper";
import SyllabusDetailContent from "../components/Syllabus/SyllabusDetailContent";
export default function SyllabusDetail() {
  const [status, setStatus] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleStatus = () => {
    setStatus(!status);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SyllabusWrapper>
      <AppContainer>
        <Box>
          <Box sx={{ paddingLeft: { xs: "0px", lg: "10px" } }}>
            <Typography variant="h4" sx={{ color: "#2D3748" }}>
              Syllabus
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: { xs: "90%", lg: "100%" },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#2D3748",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "5px",
                  fontSize: { xs: "40px", lg: "48px" },
                }}
              >
                C# Programing Language{" "}
                <Chip
                  label={status ? "Active" : "Inactive"}
                  sx={{
                    backgroundColor: "#2D3748",
                    color: "whitesmoke",
                    fontWeight: "bold",
                  }}
                />
              </Typography>
              <Typography onClick={handleClick}>
                <ThreeDotIcon />
              </Typography>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  "& .MuiMenu-paper": {
                    borderRadius: "10px",
                  },
                }}
              >
                <MenuItem autoFocus={false}>
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
                <MenuItem sx={{ color: "grey" }}>
                  <ListItemIcon>
                    <DeleteForeverIcon sx={{ color: "grey" }} />
                  </ListItemIcon>
                  <ListItemText>Delete Syllabus</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
            <Typography variant="h6" sx={{ color: "#2D3748" }}>
              NPL v4.0
            </Typography>
          </Box>
          <Divider sx={{ borderWidth: "2px", borderColor: "#2D3748" }} />
          <Box sx={{ paddingLeft: "10px" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <Box sx={{ fontSize: "2.125rem" }}> 8 </Box> days (68 hours)
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "10px",
                fontSize: { xs: "10px", sm: "12px", md: "15px", lg: "20px" },
              }}
            >
              Modified on 14/02/2024 by{" "}
              <Typography sx={{ fontWeight: "bolder" }}>
                {" "}
                Warrior Tran{" "}
              </Typography>
            </Box>
            <SyllabusDetailContent />
          </Box>
        </Box>
      </AppContainer>
    </SyllabusWrapper>
  );
}
