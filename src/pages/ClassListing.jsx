import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import { BasicFilterClassListbtn } from "../components/Class/ClassList/filterButtonClassList";
import { AddCircleOutline } from "@mui/icons-material";
import ListofClass from "../components/Class/ClassList/ListofClass";
import { Link } from "react-router-dom";
import SearchClass from "../components/Class/ClassList/SearchClass";
import ClassWrapper from "../context/ClassWrapper";

export default function ClassListing() {
  return (
    <ClassWrapper>
      <Typography
        variant={"h4"}
        sx={{
          wordSpacing: "5px",
          letterSpacing: "5px",
          color: "#FFFFFF",
          padding: "10px 0",
          bgcolor: theme.primary,
          marginBottom: "30px",
          paddingLeft: "30px",
        }}
      >
        Training Class
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        display="flex"
        flexWrap="wrap"
      >
        <Stack
          gap={3}
          direction={{ xs: "column", sm: "row" }}
          display="flex"
          flexWrap="wrap"
        >
          <SearchClass />
          <BasicFilterClassListbtn />
        </Stack>

        <Button
          sx={{
            marginTop: { xs: 2, sm: 0 },
            marginLeft: { xs: 0, sm: "auto" },
            marginRight: { xs: "auto", sm: 0 },
            background: theme.primary,
            fontSize: 14,
            textTransform: "capitalize",
          }}
          variant="contained"
          size="small"
          startIcon={<AddCircleOutline />}
        >
          {" "}
          <Link to="/class/create" style={{ color: "white" }}>
            Add new
          </Link>
        </Button>
      </Stack>
      <Stack gap={5} sx={{ marginTop: "20px" }}>
        <ListofClass />
      </Stack>
    </ClassWrapper>
  );
}
