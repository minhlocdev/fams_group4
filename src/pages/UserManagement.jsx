import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import { InputBoxSearch } from "../components/shared/InputBox/InputBox";
import { BasicFilterbtn } from "../components/shared/filterButton";
import { AddCircleOutline } from "@mui/icons-material";
import UserListing from "../components/UserManagement/UserList/UserListing";
import AddUser from "../components/UserManagement/AddUser";

export default function UserManagement() {
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState({});
  const handleFilterClick = (event) => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
    setAnchorEl({
      x: event.currentTarget.offsetTop,
      y: event.currentTarget.offsetLeft,
    });
  };
  const [importFormOpen, setimportFormOpen] = useState(false);
  const handleOpenImportForm = () => {
    setimportFormOpen(true);
  };
  const handleCloseImportForm = () => {
    setimportFormOpen(false);
  };
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
        User Management
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
          <BasicFilterbtn onClick={handleFilterClick} />
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
          onClick={handleOpenImportForm}
        >
          Add User
        </Button>
        <AddUser
          isOpen={importFormOpen}
          handleClose={handleCloseImportForm}
          key={importFormOpen.toString()}
        />
      </Stack>
      <Stack gap={5} sx={{ marginTop: "20px" }}>
        <UserListing />
      </Stack>
    </AppContainer>
  );
}
