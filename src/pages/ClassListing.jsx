import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import { InputBoxSearch } from "../components/shared/InputBox/InputBox";
import { BasicFilterClassListbtn } from "../components/ClassList/filterButtonClassList";
import { AddCircleOutline } from "@mui/icons-material";
import ListofClass from "../components/ClassList/ListofClass";
import { Link } from "react-router-dom";

export default function ClassListing() {
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const handleFilterClick = (event) => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
    setAnchorEl({
      x: event.currentTarget.offsetTop,
      y: event.currentTarget.offsetLeft,
    });
  };

  const handleAddUser = () => {};
  return (
    <AppContainer>
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
          <InputBoxSearch />
          <BasicFilterClassListbtn onClick={handleFilterClick} />
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
          onClick={handleAddUser}
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
    </AppContainer>
  );
}
