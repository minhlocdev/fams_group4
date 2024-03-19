import React, { useEffect, useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import UserPermissionTable from "../components/UserManagement/UserPermissionTable";
import AcceptUpdate from "../components/UserManagement/AcceptUpdate";
import {
  useGetUserPermission,
  usePutPermissionMutation,
} from "../services/queries/userQuery";
import queryClient from "../services/queries/queryClient";
import { QUERY_PERMISSISON_KEY } from "../constants/query";
import ToastEmitter from "../components/shared/lib/ToastEmitter";

export default function UserPermission() {
  const [isUpdate, setUpdate] = useState(false);
  const [isSave, setSave] = useState(false);

  const { data, isLoading, isSuccess } = useGetUserPermission();
  const [permissionData, setPermissionData] = React.useState([]);
  useEffect(() => {
    if (isSuccess) setPermissionData(data.objects);
  }, [data, isSuccess]);
  const setPermissionType = (roleName, { field, type }) => {
    const updatedPermissionData = permissionData.map((data) =>
      data.roleName === roleName ? { ...data, [field]: type } : data
    );
    setPermissionData(updatedPermissionData);
  };
  const updatePermission = usePutPermissionMutation();
  const handleSave = () => {
    console.log("SAve ne");
    setSave(false);
    setUpdate(false);
    updatePermission.mutate(permissionData, {
      onSuccess: () => {
        ToastEmitter.success("Update permission successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_PERMISSISON_KEY] });
      },
    });
  };
  const handleUpdatePermission = () => {
    setUpdate(true);
  };
  const handleCancel = () => {
    setSave(false);
  };

  return (
    <AppContainer>
      {isSave && <AcceptUpdate onSave={handleSave} onCancel={handleCancel} />}
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
      <Box mt={2}>
        <UserPermissionTable
          isUpdate={isUpdate}
          iSave={isSave}
          isLoading={isLoading}
          setPermissionType={setPermissionType}
          permissionData={permissionData}
        />
      </Box>

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
            onClick={() => setSave(true)}
          >
            Save
          </Button>
        </Stack>
      )}
    </AppContainer>
  );
}
