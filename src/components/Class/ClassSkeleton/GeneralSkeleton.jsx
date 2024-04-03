import { CalendarToday } from "@mui/icons-material";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import React from "react";
import theme from "../../../assets/theme";

export default function GeneralSkeleton() {
  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          backgroundColor: theme.primary,
          color: "#fff",
          px: "15px",
          borderRadius: "10px",
          transition: "background-color .3s linear",
          marginBottom: "5px",
          paddingY: "8px",
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <CalendarToday fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            General
          </Typography>
        </Stack>
        <ExpandMoreIcon sx={{ color: "#fff" }} />
      </Stack>
      <Grid
        container
        alignItems={"flex-start"}
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "10px",
          padding: "20px",
          textAlign: { lg: "left", xs: "center" },
          color: "#000",
        }}
      >
        <Skeleton variant="rectangular" width={"100%"} height={400} />
      </Grid>
    </>
  );
}
