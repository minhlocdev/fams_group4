import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import theme from "../../../assets/theme";
import {
  BackHandOutlined,
  BookOutlined,
  RecordVoiceOverOutlined,
  SettingsInputAntennaRounded,
  SpellcheckOutlined,
} from "@mui/icons-material";
import ClassContext from "../../../context/ClassContext";
import ContentEditable from "../../shared/lib/ContentEditable";
import { useLocation } from "react-router-dom";
import HeaderSkeleton from "../ClassSkeleton/HeaderSkeleton";
import { PublishStatusEnum } from "../../../constants/PublishStatusEnum";

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
    status,
  } = useContext(ClassContext);
  if (!classData && !isCreate) {
    return <HeaderSkeleton />;
  }
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
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Class
        </Typography>
        <Stack
          spacing={1}
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
              fontSize: "12px",
            }}
          >
            {status}
          </Typography>
        </Stack>
        <Box sx={{ marginTop: { xs: "10px", md: "0" } }}>
          <ContentEditable
            value={classCode}
            onChange={(updatedContent) => {
              setClassCode(updatedContent);
            }}
            tooltipTitle="Enter class code"
          />
        </Box>
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
