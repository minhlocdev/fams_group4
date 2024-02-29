import { Avatar, Box, Chip, Link, Stack, Typography } from "@mui/material";

import React from "react";

export function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 2,
        background: "#2D3748",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <img
        className="logo"
        style={{ background: "#2D3748", width: 70, height: 40 }}
        src="/img/logo.png"
        alt="logo fpt"
      />
      <Stack
        direction="row"
        sx={{ display: "flex", alignItems: "center", marginRight: 4 }}
        spacing={3}
      >
        <Chip
          avatar={<img src="/img/uniGate.png" alt="unigate" />}
          sx={{ background: "#0B2136", color: "white", padding: 1 }}
          label={"uniGate"}
        />
        {/* user account */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar sx={{ marginRight: 1 }} alt="Username" src="/img/logo.png" />
          <Box sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{ color: "white", fontSize: 10, height: 15 }}
              variant="overline"
              display="block"
            >
              User Name
            </Typography>
            <Link
              sx={{
                color: "white",
                textDecoration: "none",
                height: 15,
                fontSize: 10,
              }}
            >
              {" "}
              Log out
            </Link>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
