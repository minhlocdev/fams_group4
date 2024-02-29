import React, { useMemo, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import theme from "../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { Stack } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { ExpandMore } from "../shared/lib/CustomMUI";

export default function TimeFrame() {
  const location = useLocation();
  const mode = location.pathname.includes("detail"); //true=detail false=create/edit
  const initialDays = ["Mar 30 2024", "Mar 27 2024 ", "Mar 20 2024 "];
  const memoizedDays = useMemo(() => {
    return initialDays.map((dateString) => new Date(dateString));
  }, [initialDays]);
  const [days, setDays] = React.useState(initialDays);
  const [expanded, setExpanded] = React.useState(true);
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
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <CalendarToday fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            Time Frame
          </Typography>

          <Typography variant="span" fontWeight={"light"} fontSize={"14px"}>
            21-Apr-22
          </Typography>
          <Typography variant="span" fontWeight={"light"} fontSize={"14px"}>
            to
          </Typography>
          <Typography variant="span" fontWeight={"light"} fontSize={"14px"}>
            24-July-22
          </Typography>
        </Stack>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#fff" }} />
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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

            table: {
              // maxWidth: "100%",
              // width: "100%",
            },
            caption_label: {
              borderBottom: ".5px solid #ddd",
              padding: "0  50px 15px",
              textAlign: "center",
              display: "inline-block",
              fontSize: "16px",
            },
            cell: {
              height: "40px",
              padding: "5px",
              fontSize: "13px",
            },
          }}
          mode="multiple"
          selected={memoizedDays}
          onSelect={setDays}
          modifiersStyles={{
            selected: {
              backgroundColor: theme.primary,

              width: "40px",
              height: "40px",
              fontSize: "13px",
            },
          }}
          numberOfMonths={2}
          // fromDate={Date.now()}
        />
      </Collapse>
    </>
  );
}
