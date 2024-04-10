import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";
export default function ErrorFallback({ resetErrorBoundary }) {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1" component="h1">
        <span style={{ color: "rgba(255, 0, 0, 0.7)" }}>500</span>
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" paragraph>
        We apologize, but something unexpected happened. Please try again later.
      </Typography>
      <Button color="info" onClick={() => resetErrorBoundary()}>
        Try Again
      </Button>
      <Button component={Link} to="/" variant="contained" color="primary">
        Back to Homepage
      </Button>
    </Container>
  );
}
