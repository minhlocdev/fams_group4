import React, { useState } from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import theme from "../assets/theme";
import UserPermissionTable from "../components/UserManagement/UserPermissionTable";
import AcceptUpdate from "../components/UserManagement/AcceptUpdate";

export default function UserPermission() {
  const [isUpdate, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSave, setSave] = useState(false);

  const [permissionData, setPermissionData] = React.useState([
    {
      permissionId: "AD",
      roleName: "Class Admin",
      syllabus: 5,
      trainingProgram: 5,
      class: 5,
      learningMaterial: 5,
      userManagement: 1,
    },
    {
      permissionId: "SA",
      roleName: "Super Admin",
      syllabus: 5,
      trainingProgram: 5,
      class: 5,
      learningMaterial: 5,
      userManagement: 5,
    },
    {
      permissionId: "TR",
      roleName: "Trainer",
      syllabus: 2,
      trainingProgram: 2,
      class: 2,
      learningMaterial: 2,
      userManagement: 1,
    },
  ]);

  const handleUpdatePermission = () => {
    setUpdate(true);
  };
  const handleSave = () => {
    //lay data
    console.log(permissionData);
    setSave(false);
    setUpdate(false);
  };

  const handleCancel = () => {
    setSave(false);
  };
  const setPermissionType = (roleName, { field, type }) => {
    const updatedPermissionData = permissionData.map((data) =>
      data.roleName === roleName ? { ...data, [field]: type } : data
    );

    setPermissionData(updatedPermissionData);
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
      {!loading ? (
        <Box mt={2}>
          <UserPermissionTable
            isUpdate={isUpdate}
            permissionData={permissionData}
            setPermissionType={setPermissionType}
          />
        </Box>
      ) : (
        <Skeleton
          variant="rectangular"
          height={220}
          sx={{ marginTop: "20px" }}
        />
      )}

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
