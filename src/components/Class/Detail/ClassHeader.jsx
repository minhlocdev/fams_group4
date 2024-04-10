import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
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
import HeaderSkeleton from "../ClassSkeleton/HeaderSkeleton";
import theme from "../../../assets/theme";

export default function ClassHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { classData, isError } = useContext(ClassContext);
  if (!isError) {
    return <HeaderSkeleton />;
  }
  const { className, classCode, status, durationByDay, durationByHour } =
    classData || {};
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
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Class
        </Typography>
        {!isError && (
          <>
            <Stack
              sx={{
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant={"h4"}
                sx={{
                  wordSpacing: { md: "5px" },
                  letterSpacing: { md: "5px" },
                  fontWeight: { md: "600" },
                }}
              >
                {className}
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
                {status}
              </Typography>
              <IconButton
                size="large"
                color="inherit"
                children={<MoreHoriz />}
                sx={{ marginLeft: { md: "auto" } }}
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
                  <Link
                    href={`/class/edit/${classData.id}`}
                    sx={{ alignItems: "center" }}
                  >
                    <EditOutlined />
                    Edit
                  </Link>
                </MenuItem>
              </Menu>
            </Stack>
            <Typography
              variant={"h6"}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              {classCode}
            </Typography>
            <Box
              sx={{
                borderBottom: "1px solid white",
                width: { xs: "100%", lg: "38%" },
                margin: "10px 0",
              }}
            ></Box>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              sx={{ flexWrap: "wrap" }}
            >
              <Typography variant={"span"} sx={{ fontSize: "18px" }}>
                {durationByDay}
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
                {`days (${durationByHour} hours)`}
              </Typography>
              <BookOutlined />
              <RecordVoiceOverOutlined />
              <SpellcheckOutlined />
              <SettingsInputAntennaRounded />
              <BackHandOutlined />
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
