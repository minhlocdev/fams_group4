import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
export default function UnauthorizePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="h1">
        <span style={{ color: "rgba(0, 0, 0, 0.3)" }}>401</span>
      </Typography>
      <Typography variant="h5" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" paragraph>
        You are not authorized to access this page. Please log in with proper
        credentials.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Back to Homepage
      </Button>
    </Box>
  );
}
