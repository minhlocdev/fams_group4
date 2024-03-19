import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import theme from "../../assets/theme";
import {
  BackHandOutlined,
  BookOutlined,
  EditOutlined,
  MoreHoriz,
  RecordVoiceOverOutlined,
  SettingsInputAntennaRounded,
  SpellcheckOutlined,
} from "@mui/icons-material";
import ClassContext from "../../context/ClassContext";

export default function ClassHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { classTitle } = useContext(ClassContext);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: theme.primary,
          padding: "10px 20px",
          color: "#fff",
        }}
      >
        {" "}
        <Typography
          variant={"h5"}
          sx={{
            wordSpacing: "5px",
            letterSpacing: "5px",
          }}
        >
          Class
        </Typography>
        <Stack direction={"row"} alignItems={"flex-start"}>
          <Typography
            variant={"h4"}
            sx={{
              wordSpacing: "5px",
              letterSpacing: "5px",
              fontWeight: "600",
            }}
          >
            HCM_FR_DevOps_01
          </Typography>
          <Typography
            variant={"span"}
            sx={{
              backgroundColor: theme.unmodified,
              borderRadius: "20px",
              border: "1px solid #fff",
              padding: "3px 10px",
              marginLeft: "5px",
            }}
          >
            Planning
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            children={<MoreHoriz />}
            sx={{ marginLeft: "auto" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          ></IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <EditOutlined />
              Edit
            </MenuItem>
          </Menu>
        </Stack>
        <Typography variant={"h6"} sx={{}}>
          HCM_FR_DevOps_01
        </Typography>
        <div
          style={{
            borderBottom: "1px solid white",
            width: "38%",
            margin: "10px 0",
          }}
        ></div>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant={"span"} sx={{ fontSize: "18px" }}>
            31
          </Typography>
          <Typography
            variant={"span"}
            sx={{
              fontSize: "14px",
              fontWeight: "light",
              borderRight: "1px solid #fff",
              paddingRight: "10px",
            }}
          >
            days (97 hours)
          </Typography>
          <BookOutlined />
          <RecordVoiceOverOutlined />
          <SpellcheckOutlined />
          <SettingsInputAntennaRounded />
          <BackHandOutlined />
        </Stack>
      </Box>
    </>
  );
}
