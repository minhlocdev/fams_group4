import React, { useContext } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../../../utils/authUtil";

function AccountAvatar() {
  const { logout, loginUser } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {loginUser && (
        <Link to={`/user/profile/${loginUser.id}`}>
          <Avatar
            sx={{ marginRight: 1 }}
            alt="Username"
            src={loginUser.avatarUrl}
          />
        </Link>
      )}
      <Box sx={{ justifyContent: "space-between" }}>
        {loginUser && (
          <Typography
            sx={{ color: "white", fontSize: 10, height: 20 }}
            variant="overline"
            display="block"
          >
            {loginUser.name}
          </Typography>
        )}
        {loginUser && (
          <Typography
            onClick={handleLogout}
            sx={{
              color: "white",
              textDecoration: "none",
              height: 15,
              fontSize: 10,
              cursor: "pointer",
            }}
          >
            Log out
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AccountAvatar;
