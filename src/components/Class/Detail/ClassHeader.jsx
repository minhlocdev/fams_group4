import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import {
  BackHandOutlined,
  BookOutlined,
  RecordVoiceOverOutlined,
  SettingsInputAntennaRounded,
  SpellcheckOutlined,
} from "@mui/icons-material";
import ClassContext from "../../../context/ClassContext";
import HeaderSkeleton from "../ClassSkeleton/HeaderSkeleton";
import theme from "../../../assets/theme";
import Popup from "../ClassList/Popup";

export default function ClassHeader() {
  const { classData, isError } = useContext(ClassContext);
  if (!classData) {
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
              <Box sx={{ marginLeft: { md: "auto" } }}>
                <Popup item={classData} style={{ color: "#fff" }} />
              </Box>
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
