import React, { useContext, useMemo } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import theme from "../../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { Stack, Box } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { ExpandMore } from "../../shared/lib/CustomMUI";
import ClassContext from "../../../context/ClassContext";
import dayjs from "dayjs";
import TimeFrameSkeleton from "../ClassSkeleton/TimeFrameSkeleton";

export default function TimeFrame() {
  const location = useLocation();
  const mode = location.pathname.includes("detail"); //true=detail false=create/edit
  const { classData } = useContext(ClassContext);
  const memoizedDays = useMemo(() => {
    return classData?.calendarStudy.map(
      (dateString) =>
        new Date(dayjs(dateString, "MM/DD/YYYY").format("MMM DD YYYY"))
    );
  }, [classData]);
  const [expanded, setExpanded] = React.useState(true);
  if (!classData) {
    return <TimeFrameSkeleton />;
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          backgroundColor: !expanded
            ? mode
              ? theme.primary
              : theme.unmodified
            : theme.primary,
          color: "#fff",
          px: "15px",
          borderRadius: "10px",
          transition: "background-color .3s linear",
          marginBottom: "5px",
        }}
        onClick={handleExpandClick}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <CalendarToday fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            Time Frame
          </Typography>

          <Typography variant="span" fontWeight={"light"} fontSize={"14px"}>
            {`${classData.startDate} to
            ${classData.endDate}`}
          </Typography>
        </Stack>
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#fff" }} />
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <DayPicker
            style={{ margin: "0", textAlign: "center" }}
            styles={{
              caption: {
                color: theme.primary,
                marginBottom: "20px",
              },
              head_cell: { color: theme.unmodified },
              months: {
                display: "inline-flex",
                borderRadius: "15px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "10px 20px",
                width: "100%",
                justifyContent: "center",
              },
              month: {
                margin: "0 auto",
              },
              caption_label: {
                borderBottom: ".5px solid #ddd",
                padding: "0  50px 15px",
                textAlign: "center",
                display: "inline-block",
                fontSize: "16px",
              },
              cell: {
                height: { lg: "40px" },
                padding: { lg: "5px" },
                fontSize: { lg: "13px" },
              },
            }}
            mode="multiple"
            selected={memoizedDays}
            modifiersStyles={{
              selected: {
                backgroundColor: theme.primary,
                width: "40px",
                height: "40px",
                fontSize: "13px",
              },
            }}
            numberOfMonths={2}
          />
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <DayPicker
            style={{ margin: "0", textAlign: "center" }}
            styles={{
              caption: {
                color: theme.primary,
                marginBottom: "20px",
              },
              head_cell: { color: theme.unmodified },
              months: {
                display: "inline-flex",
                borderRadius: "15px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "10px 20px",
                width: "100%",
                justifyContent: "center",
              },
              month: {
                margin: "0 auto",
              },
              caption_label: {
                borderBottom: ".5px solid #ddd",
                padding: "0  50px 15px",
                textAlign: "center",
                display: "inline-block",
                fontSize: "16px",
              },
              cell: {
                height: { lg: "40px" },
                padding: { lg: "5px" },
                fontSize: { lg: "13px" },
              },
            }}
            mode="multiple"
            selected={memoizedDays}
            modifiersStyles={{
              selected: {
                backgroundColor: theme.primary,
                width: "40px",
                height: "40px",
                fontSize: "13px",
              },
            }}
            numberOfMonths={1}
          />
        </Box>
      </Collapse>
    </>
  );
}
