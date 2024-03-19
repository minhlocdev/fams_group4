import { Box } from "@mui/material";
import React from "react";

export function Footer() {
  return (
    <Box
      sx={{
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 2,
        background: "#2D3748",
        position: "relative",
      }}
    >
      <div
        style={{
          color: "white",
          padding: "10px 0",
        }}
      >
        Copyright @2022 BA Warrior. All right reserved
      </div>
    </Box>
  );
}
