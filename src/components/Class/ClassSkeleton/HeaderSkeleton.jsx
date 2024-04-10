import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import theme from "../../../assets/theme";

export default function HeaderSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        background: theme.primary,
        padding: "10px 20px",
        color: "#fff",
      }}
    >
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
      <Skeleton
        variant="rectangular"
        height={40}
        width={450}
        sx={{ marginBottom: 1 }}
      />
      <Skeleton variant="rectangular" height={40} width={300} />
      <div
        style={{
          borderBottom: "1px solid white",
          width: "38%",
          margin: "10px 0",
        }}
      ></div>
      <Skeleton variant="rectangular" height={30} width={280} />
    </Box>
  );
}
