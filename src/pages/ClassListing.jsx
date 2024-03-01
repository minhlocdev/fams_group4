import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import { InputBoxSearch } from "../components/shared/InputBox/InputBox";
import { BasicFilterbtn } from "../components/shared/filterButton";
import { AddCircleOutline } from "@mui/icons-material";
import ListofClass from "../components/ClassList/ListofClass";

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
          color: theme.primary,
          padding: "10px 0",
        }}
      >
        Class
      </Typography>
      <Stack direction="row">
        <Stack gap={3} direction="row" alignItems={"center"}>
          <InputBoxSearch />
          <BasicFilterbtn onClick={handleFilterClick} />{" "}
        </Stack>
        <Button
          sx={{
            marginLeft: "auto",
            background: theme.primary,
            fontSize: 14,
            textTransform: "capitalize",
          }}
          variant="contained"
          size="small"
          startIcon={<AddCircleOutline />}
          onClick={handleAddUser}
        >
          Add New
        </Button>
      </Stack>
      <Stack gap={5} sx={{ marginTop: "20px" }}>
        <ListofClass/>
      </Stack>
    </AppContainer>
  );
}
