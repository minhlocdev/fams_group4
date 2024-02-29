import React, { useContext, useState } from "react";

import "react-day-picker/dist/style.css";
import theme from "../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { FormControl, Grid, MenuItem, Select, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { StarBorderOutlined, WarningAmberOutlined } from "@mui/icons-material";
import { ExpandMore, QuantityInput } from "../shared/lib/CustomMUI";
import ClassContext from "../../context/ClassContext";
export default function CreateAttendee() {
  const location = useLocation();

  const mode = location.pathname.includes("detail"); //true=detail false=create/edit

  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { attendee, handleAttendee } = useContext(ClassContext);
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
          <StarBorderOutlined fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            Attendee
          </Typography>
          <FormControl
            sx={{
              width: "100px",
              backgroundColor: "#fff",
              margin: "5px 5px 5px 10px !important",
              borderRadius: "10px",
            }}
            size="small"
          >
            <Select
              sx={{
                "& .MuiSelect-select": { padding: "5px", fontSize: "14px" },
              }}
              value={attendee.type}
              onChange={(e) => handleAttendee("type", e.target.value)}
            >
              <MenuItem value={"Fresher"}>Fresher</MenuItem>
              <MenuItem value={"Intern"}>Intern</MenuItem>
            </Select>
          </FormControl>
          {attendee.type === "" && <WarningAmberOutlined color="error" />}
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
        <Grid
          container
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            color: "#000",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              backgroundColor: theme.primary,
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              padding: "20px",
            }}
          >
            <Stack spacing={1} sx={{ color: "#fff" }}>
              <Typography variant="p" fontWeight={600}>
                Planned
              </Typography>
              <QuantityInput
                value={attendee.planned}
                onInputChange={(value) => handleAttendee("planned", value)}
              />
            </Stack>
          </Grid>{" "}
          <Grid
            item
            xs={4}
            sx={{
              backgroundColor: "#285D9A",
              padding: "20px",
            }}
          >
            <Stack spacing={1} sx={{ color: "#fff" }}>
              <Typography variant="p" fontWeight={600}>
                Accepted
              </Typography>
              <QuantityInput
                value={attendee.accepted}
                onInputChange={(value) => handleAttendee("accepted", value)}
              />
            </Stack>
          </Grid>{" "}
          <Grid
            item
            xs={4}
            sx={{
              backgroundColor: "#f1f1f1",
              borderTopRightRadius: "10px",
              padding: "20px",
              borderBottomRightRadius: "10px",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="p" fontWeight={600}>
                Actual
              </Typography>
              <QuantityInput
                value={attendee.actual}
                onInputChange={(value) => handleAttendee("actual", value)}
              />
            </Stack>
          </Grid>{" "}
        </Grid>
      </Collapse>
    </>
  );
}
