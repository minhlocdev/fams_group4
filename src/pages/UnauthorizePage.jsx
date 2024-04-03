import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";
export default function UnauthorizePage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "50px" }}>
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
    </Container>
  );
}
