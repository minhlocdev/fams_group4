import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import theme from "../../../assets/theme";
import {
  BackHandOutlined,
  BookOutlined,
  EditOutlined,
  MoreHoriz,
  RecordVoiceOverOutlined,
  SettingsInputAntennaRounded,
  SpellcheckOutlined,
} from "@mui/icons-material";
import ClassContext from "../../../context/ClassContext";
import ContentEditable from "../../shared/lib/ContentEditable";
import { useLocation } from "react-router-dom";
import HeaderSkeleton from "../ClassSkeleton/HeaderSkeleton";

export default function ClassCreateHeader() {
  const location = useLocation();
  const isCreate = location.pathname.includes("create");
  const {
    classTitle,
    setClassTitle,
    search,
    classCode,
    setClassCode,
    initialDays,
    classData,
  } = useContext(ClassContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  if (!classData && !isCreate) {
    return <HeaderSkeleton />;
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          variant={"h4"}
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
            <ContentEditable
              value={classTitle}
              onChange={(updatedContent) => {
                setClassTitle(updatedContent);
              }}
              tooltipTitle="Enter class name"
            />
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
          {!isCreate && (
            <>
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
            </>
          )}
        </Stack>
        <ContentEditable
          value={classCode}
          onChange={(updatedContent) => {
            setClassCode(updatedContent);
          }}
          tooltipTitle="Enter class code"
        />
        <div
          style={{
            borderBottom: "1px solid white",
            width: "38%",
            margin: "10px 0",
          }}
        ></div>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant={"span"} sx={{ fontSize: "18px" }}>
            {initialDays.length + 1 || "--"}
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
            {`days (${search?.durationByHour || "--"} hours)`}
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
