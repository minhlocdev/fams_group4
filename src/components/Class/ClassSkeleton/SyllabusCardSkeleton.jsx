import { CircularProgress } from "@mui/material";
import React from "react";

export default function SyllabusCardSkeleton() {
  return (
    <span style={{ display: "block", width: "400px", margin: "20px auto" }}>
      <CircularProgress />
    </span>
  );
}
