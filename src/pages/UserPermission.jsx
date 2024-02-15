import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Button, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import UserPermisson from "../components/user/UserPermission";

export default function UserPermission() {
  const [isUpdate, setUpdate] = useState(false);
  const handleUpdatePermission = () => {
    setUpdate(true);
  };
  console.log(isUpdate);
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
        User Permission
      </Typography>
      <Stack direction="row">
        <Button
          sx={{
            marginLeft: "auto",
            background: theme.primary,
            fontSize: 14,
            textTransform: "capitalize",
          }}
          variant="contained"
          size="small"
          onClick={() => handleUpdatePermission()}
          disabled={isUpdate}
        >
          Update Permission
        </Button>
      </Stack>
      <Stack gap={5} sx={{ marginTop: "20px" }}>
        <UserPermisson isUpdate={isUpdate} />
      </Stack>
      {isUpdate && (
        <Stack direction="row" spacing={2} justifyContent={"flex-end"} mt={4}>
          <Button
            sx={{
              color: "red",
              borderBottom: "solid 1px red",
              padding: "5px 25px",
            }}
            onClick={() => {
              setUpdate(false);
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "whitesmoke",
              backgroundColor: "#2D3748",
              padding: "5px 25px",
              borderRadius: "8px",
              fontWeight: "600",

              "&:hover": {
                backgroundColor: "#2D3748",
                opacity: "0.5",
              },
            }}
          >
            Save
          </Button>
        </Stack>
      )}
    </AppContainer>
  );
}
