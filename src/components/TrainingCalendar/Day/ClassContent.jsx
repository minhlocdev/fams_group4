import React, { useContext } from "react";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { collapseIcon, collapseTitle, tagContent } from "./DayCalendar.style";
import { Collapse, Typography, Divider, Box, Stack } from "@mui/material";
import { CalendarContext } from "../../../context/CalendarContext";
import theme from "../../../assets/theme";
const attendeeColors = {
  Fresher: theme.pink,
  "Online fee-Fresher": theme.green,
  Intern: theme.primary,
  "Offline fee-Fresher": theme.orange,
};
export default function ClassContent({ expanded, tag }) {
  const { selectedContent, handleExpandContentClick } =
    useContext(CalendarContext);
  return (
    <>
      <Box
        sx={{
          padding: "5px 0px",
          display: "flex",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "fit-content",
          backgroundColor: attendeeColors[tag.attendee],
          borderRadius: "5px",
          color: "white",
          alignItems: "center",
        }}
        expand={selectedContent === tag.classCode}
        onClick={() => handleExpandContentClick(tag.classCode)}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <Typography sx={tagContent}>{tag.classCode}</Typography>
        <Divider
          sx={{
            backgroundColor: "white",
            width: "1px",
            height: "15px",
            borderWidth: "1px",
          }}
        />
        <Typography sx={tagContent}>{tag.className}</Typography>
      </Box>
      {/* Tags collapse here */}
      <Collapse
        in={selectedContent === tag.classCode}
        timeout="auto"
        unmountOnExit
        key={tag.classCode}
      >
        <Box
          sx={{
            backgroundColor: "#8EB1DA",
            borderRadius: "0px 0px 5px 5px",
            opacity: "90%",
            height: "fit-content",
            padding: "10px 10px",
          }}
        >
          <Typography
            sx={{
              lineHeight: "18px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {`Day ${tag.curentSlot} of ${tag.totalSlot}`}
          </Typography>
          <Stack spacing={2} my={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <StarOutlineIcon sx={collapseIcon} />
              <Typography sx={collapseTitle}>Class Time</Typography>
              <Typography sx={collapseTitle}>{tag.classTime}</Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <HomeWorkOutlinedIcon sx={collapseIcon} />
              <Typography sx={collapseTitle}>Location</Typography>
              <Typography sx={collapseTitle}>{tag.location}</Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <RecordVoiceOverOutlinedIcon sx={collapseIcon} />
              <Typography sx={collapseTitle}>Trainer</Typography>
              <Typography sx={collapseTitle}>{tag.trainerName.name}</Typography>
            </Stack>
          </Stack>
        </Box>
      </Collapse>
    </>
  );
}
