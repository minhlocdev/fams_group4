import { Box, Avatar, Typography, Link } from "@mui/material";
import React, { useContext } from "react";

import AuthContext from "../../../utils/authUtil";
function AccountAvatar() {
  const { logout } = useContext(AuthContext);
  return (
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
            cursor: "pointer",
          }}
          onClick={() => logout()}
        >
          {" "}
          Log out
        </Link>
      </Box>
    </Box>
  );
}

export default AccountAvatar;
