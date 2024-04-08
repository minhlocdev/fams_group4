import { Box, Chip, Stack } from "@mui/material";

import React, { useContext } from "react";
import MobileSidebar from "./MobileSidebar";
import AccountAvatar from "./AccountAvatar";
import AuthContext from "../../../utils/authUtil";

export function Header() {
  const { loginUser } = useContext(AuthContext);
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
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        {loginUser && <MobileSidebar />}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
          }}
        >
          <img
            className="logo"
            style={{
              background: "#2D3748",
              width: 70,
              height: 40,
            }}
            src="/img/logo.png"
            alt="logo fpt"
          />
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{ display: "flex", alignItems: "center" }}
        spacing={3}
      >
        <Chip
          avatar={<img src="/img/uniGate.png" alt="unigate" />}
          sx={{
            background: "#0B2136",
            color: "white",
            padding: 1,
            display: { xs: "none", lg: "flex" },
          }}
          label={"uniGate"}
        />
        {/* user account */}
        {loginUser && <AccountAvatar />}
      </Stack>
    </Box>
  );
}
