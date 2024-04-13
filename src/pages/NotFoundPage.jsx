import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";

export default function NotFoundPage() {
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
        <span style={{ color: "rgba(0, 0, 0, 0.3)" }}>404</span>
      </Typography>
      <Typography variant="h5" gutterBottom>
        We are sorry, page not found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Back to Homepage
      </Button>
    </Box>
  );
}
