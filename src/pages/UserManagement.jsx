import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import { AddCircleOutline } from "@mui/icons-material";
import UserListing from "../components/UserManagement/UserList/UserListing";
import AddUser from "../components/UserManagement/AddUser";
import SearchUser from "../components/UserManagement/UserList/SearchUser";
import FilterUserButton from "../components/UserManagement/UserList/FilterUserButton";
import { UserProvider } from "../context/UserContext";
import ProtectedButton from "../components/shared/protected/ProtectedButton";

export default function UserManagement() {
  const [importFormOpen, setimportFormOpen] = useState(false);
  const handleOpenImportForm = () => {
    setimportFormOpen(true);
  };
  const handleCloseImportForm = () => {
    setimportFormOpen(false);
  };
  return (
    <UserProvider>
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
          <SearchUser />
          <FilterUserButton />
        </Stack>
        <ProtectedButton
          onClick={handleOpenImportForm}
          permissionRequired={"create"}
          pathName={"user"}
          style={{
            marginTop: { xs: 2, sm: 0 },
            marginLeft: { xs: 0, sm: "auto" },
            marginRight: { xs: "auto", sm: 0 },
          }}
        >
          <Button
            sx={{
              background: theme.primary,
              fontSize: 14,
              textTransform: "capitalize",
            }}
            variant="contained"
            size="small"
            startIcon={<AddCircleOutline />}
          >
            Add User
          </Button>
        </ProtectedButton>
        <AddUser
          isOpen={importFormOpen}
          handleClose={handleCloseImportForm}
          key={importFormOpen.toString()}
        />
      </Stack>
      <Stack gap={5} sx={{ marginTop: "20px" }}>
        <UserListing />
      </Stack>
    </UserProvider>
  );
}
