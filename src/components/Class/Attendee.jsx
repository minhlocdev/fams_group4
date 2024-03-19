import React, { useContext } from "react";

import "react-day-picker/dist/style.css";
import theme from "../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { Grid, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { StarBorderOutlined } from "@mui/icons-material";
import { ExpandMore, QuantityInput } from "../shared/lib/CustomMUI";
export default function Attendee() {
  const location = useLocation();

  const mode = location.pathname.includes("detail"); //true=detail false=create/edit

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
          <StarBorderOutlined fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            Attendee
          </Typography>
          <Typography variant="span" fontWeight={"light"} fontSize={"14px"}>
            Fresher
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
              <Typography variant="h4">10</Typography>
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
              <Typography variant="h4">10</Typography>
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
              <Typography variant="h4">10</Typography>
            </Stack>
          </Grid>{" "}
        </Grid>
      </Collapse>
    </>
  );
}
